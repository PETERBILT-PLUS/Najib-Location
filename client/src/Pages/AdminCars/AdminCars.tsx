import axios, { type AxiosResponse } from "axios";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminCarCard from "../../Components/AdminCarCard/AdminCarCard";


function AdminCars() {
    const [loading, setLoading] = useState<boolean>(true);
    const [cars, setCars] = useState<any[]>([]);
    const SERVER: string = import.meta.env.VITE_SERVER as string;
    const token: string | null = localStorage.getItem("token");

    useEffect(() => {
        const getAdminCars = async () => {
            try {
                const response: AxiosResponse<{ success: boolean, message?: string, cars: any[] }> = await axios.get(`${SERVER}/admin/get-cars`, { params: { token: token } });
                if (response.data.success) {
                    setCars(response.data.cars);
                }
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    toast.warning(error.response?.data.message);
                    console.error(error);
                } else {
                    toast.error(error.message);
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        };

        getAdminCars();
    }, []);

    const handleDeleteCar = async (carId: string) => {
        try {
            const response: AxiosResponse<{ success: boolean, message?: string }> = await axios.delete(`${SERVER}/admin/delete-car/${carId}`, { params: { token: token } });
            if (response.data.success) {
                toast.success(response.data.message);
                setCars((prev) => prev.filter((elem:any) => elem._id != carId));
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                toast.warning(error.response?.data.message);
                console.error(error);
            } else {
                toast.error(error?.message);
                console.error(error);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-row justify-center items-center">
                <Spinner size="xl" />
            </div>
        );
    }

    return (
        <main className="min-h-screen py-14">
            <h1 className="text-2xl lg:text-3xl text-center text-gray-600 pb-16">Mes Véhicules</h1>

            {cars.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 rounded-2xl overflow-hidden">
                    {cars.map((elem: any, index: number) => {
                        return (
                            <AdminCarCard
                                key={index}
                                carId={elem._id}
                                carName={elem.carName}
                                carFuel={elem.carFuel}
                                carKm={elem.carKm}
                                carMarque={elem.carMarque}
                                carPlaces={elem.carPlaces}
                                carType={elem.carType}
                                carState={elem.carState}
                                pricePerDay={elem.pricePerDay}
                                carImage={elem.carImages[0]}
                                onDelete={handleDeleteCar}
                            />
                        );
                    })}
                </div>
            ) : (
                <p className="text-gray-500 text-center">Aucun Véhicule Trouvé</p>
            )}
        </main>
    );
}

export default AdminCars;