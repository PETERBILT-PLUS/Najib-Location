import { FaNewspaper } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";



function AdminDashboard() {
    const [loading, setLoading] = useState<boolean>(true);
    const [dashboard, setDashboard] = useState<{ cars: number, reservations: number }>({ cars: 0, reservations: 0 });
    const SERVER: string = import.meta.env.VITE_SERVER as string;
    const token: string | null = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const getAdminDashboard = async () => {
            try {
                if (!token) {
                    toast.warning("Token Pas Trouvé");
                    navigate("/");
                }
                const response: AxiosResponse<{ success: boolean, cars: number, newReservations: number }> = await axios.get(`${SERVER}/admin/get-dashboard`, { params: { token: token } });
                if (response.data.success) {
                    setDashboard({ cars: response.data.cars, reservations: response.data.newReservations });
                }
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    toast.warning(error.message);
                    console.error(error);
                } else {
                    toast.error(error.message);
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        };

        getAdminDashboard();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen flex flex-row justify-center items-center">
                <Spinner size="xl" />
            </main>
        );
    }

    return (
        <main className="min-h-screen py-24 grid grid-cols-12 gap-5">
            <div onClick={() => navigate("/admin/reservations")} className="cursor-pointer h-96 bg-green-500 col-span-12 lg:col-span-6 rounded-2xl shadow-2xl flex flex-col justify-start items-center py-16">
                <h1 className="text-white text-2xl lg:text-3xl">Réservations</h1>
                <br />
                <br />
                <h2 className="text-xl lg:text-2xl text-white text-center">
                    {dashboard.reservations === 0
                        ? "Aucune Nouvelle Réservation"
                        : `${dashboard.reservations === undefined ? 0 : dashboard.reservations} Nouvelle${dashboard.reservations > 1 ? "s" : ""} Réservation${dashboard.reservations > 1 ? "s" : ""}`}
                </h2>
                <br />
                <br />
                <FaNewspaper size={60} color="#fefefe" />
            </div>

            <div onClick={() => navigate("/admin/cars")} className="cursor-pointer h-96 bg-yellow-500 col-span-12 lg:col-span-6 rounded-2xl shadow-2xl flex flex-col justify-start items-center py-16">
                <h1 className="text-white text-2xl lg:text-3xl">Véhicules</h1>
                <br />
                <br />
                <h2 className="text-xl lg:text-2xl text-white">{dashboard.cars > 1 ? `${dashboard.cars} Voitures` : `${dashboard.cars} Voiture`}</h2>
                <br />
                <br />
                <FaCar size={60} color="#fefefe" />
            </div>
        </main>
    );
}

export default AdminDashboard;