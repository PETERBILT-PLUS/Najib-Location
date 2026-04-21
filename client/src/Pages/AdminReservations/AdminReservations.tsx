import { useEffect, useState } from "react";
import ReservationComponent from "../../Components/ReservationComponent/ReservationComponent.tsx"
import axios, { type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

export interface ILoadingReservation {
    loading: boolean;
    _id: string;
}

function AdminReservations() {
    const SERVER: string = import.meta.env.VITE_SERVER as string;
    const token: string | null = localStorage.getItem("token");
    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [acceptLoading, setAcceptLoading] = useState<ILoadingReservation>({ loading: false, _id: "" });
    const [rejectLoading, setRejectLoading] = useState<ILoadingReservation>({ loading: false, _id: "" });

    useEffect(() => {
        const getAdminReservations = async () => {
            try {
                const response: AxiosResponse<{ success: boolean, message?: string, reservations: any[] }> = await axios.get(`${SERVER}/admin/get-reservations`, { params: { token: token } });
                if (response.data.success) {
                    console.log(response.data);

                    setReservations((prev: any) => [...prev, ...response.data.reservations]);
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

        getAdminReservations();
    }, []);

    const handleAcceptReservation = async (reservationId: string) => {
        try {
            setAcceptLoading({ loading: true, _id: reservationId });
            const response: AxiosResponse<{ success: boolean, message?: string }> = await axios.post(`${SERVER}/admin/accept-reservation`, { token: token, reservationId: reservationId });
            if (response.data.success) {
                toast.success(response.data.message);
                setReservations((prev) => prev.map((elem: any) => elem._id == reservationId ? { ...elem, status: "Accepté" } : elem));
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
            setAcceptLoading({ loading: false, _id: "" });
        }
    };

    const handleRejectReservation = async (reservationId: string) => {
        try {
            setRejectLoading({ loading: true, _id: reservationId });
            const response: AxiosResponse<{ success: boolean, message?: string }> = await axios.post(`${SERVER}/admin/reject-reservation`, { token: token, reservationId: reservationId });
            if (response.data.success) {
                toast.success(response.data.message);
                setReservations((prev) => prev.map((elem: any) => elem._id == reservationId ? { ...elem, status: "Refusé" } : elem));
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
            setRejectLoading({ loading: false, _id: "" });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full flex flex-row justify-center items-center">
                <Spinner size="xl" />
            </div>
        );
    }

    return (
        <main className="min-h-screen py-12">
            <h1 className="text-2xl lg:text-3xl text-center text-gray-600 pb-12">Réservations</h1>

            <div className="grid grid-cols-1 gap-6">
                {reservations.length ? (
                    reservations.map((elem: any, index: number) => {
                        return (
                            <ReservationComponent carId={elem.carId} acceptLoading={acceptLoading} rejectLoading={rejectLoading} reservationId={elem._id} handleAcceptReservation={handleAcceptReservation} handleRejectReservation={handleRejectReservation} key={index} carImage={elem.carId.carImages[0]} startDate={elem.startDate} endDate={elem.endDate} name={elem.name} phoneNumber={elem.phoneNumber} status={elem.status} userGmail={elem.userGmail} />
                        );
                    })
                ) : (
                    <h3 className="text-center text-gray-500 text-xl lg:text-2xl">Aucune Réservation Trouvé</h3>
                )}
            </div>
        </main>
    );
}

export default AdminReservations;