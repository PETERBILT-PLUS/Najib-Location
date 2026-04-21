import { Spinner } from "flowbite-react";
import { type ILoadingReservation } from "../../Pages/AdminReservations/AdminReservations";
import { differenceInDays } from "date-fns";


interface ReservationCardProps {
    reservationId: string;
    carImage: string;
    startDate: string;
    endDate: string;
    name: string;
    phoneNumber: string;
    status: string;
    userGmail: string;
    acceptLoading: ILoadingReservation;
    rejectLoading: ILoadingReservation;
    carId: any;
    handleAcceptReservation: (reservationId: string) => void;
    handleRejectReservation: (reservationId: string) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
    reservationId,
    carImage,
    startDate,
    endDate,
    name,
    phoneNumber,
    status,
    userGmail,
    rejectLoading,
    acceptLoading,
    carId,
    handleAcceptReservation,
    handleRejectReservation
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 bg-white max-w-4xl mx-auto p-0 shadow-2xl rounded-2xl overflow-hidden">
            {/* Left Column - Car Image */}
            <div className="overflow-hidden w-full h-60 md:h-auto flex justify-center items-center bg-gray-100">
                <img
                    src={carImage}
                    alt="Car"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Right Columns */}
            <div className="order-2 md:order-1 p-6 space-y-4">
                {/* User Info */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800 pb-4">{name}</h2>
                    <p className="text-gray-600"><strong>Email:</strong> {userGmail}</p>
                    <p className="text-gray-600"><strong>Phone:</strong> {phoneNumber}</p>
                    <p className="text-gray-600"><strong>Status:</strong> {status}</p>
                </div>

                {/* Date Info */}
                <div className="space-y-2">
                    <p className="text-gray-600"><strong>Date Départ:</strong> {new Date(startDate).toLocaleDateString()}</p>
                    <p className="text-gray-600"><strong>Date Arrivé:</strong> {new Date(endDate).toLocaleDateString()}</p>

                    <div className="pt-2 flex flex-row justify-start items-center gap-5">
                        <button
                            onClick={() => handleRejectReservation(reservationId)}
                            type="button"
                            className="border px-4 py-2 rounded-md text-red-500 hover:bg-red-700 hover:text-white cursor-pointer transition"
                        >
                            {rejectLoading._id == reservationId ? (
                                <Spinner size="md" />
                            ) : ("Refusé")}
                        </button>

                        <button
                            onClick={() => handleAcceptReservation(reservationId)}
                            type="button"
                            className="border px-4 py-2 rounded-md text-green-500 hover:bg-green-700 hover:text-white cursor-pointer transition"
                        >
                            {acceptLoading._id == reservationId ? (
                                <Spinner size="md" />
                            ) : ("Accepté")}
                        </button>
                    </div>
                </div>
            </div>

            <div className="order-1 md:order-2 flex flex-col justify-start items-start p-6">
                <h3 className="text-gray-800 text-xl pb-4">Voiture: {carId.carName}</h3>
                <h3 className="text-gray-600 text-md pb-3">Marque: {carId.carMarque}</h3>
                <h3 className="text-gray-600 text-md pb-3">Etat: {carId.carState}</h3>
                <h3 className="text-gray-600 text-md pb-3">Prix/jour: {carId.pricePerDay} DH</h3>
                <h3 className="text-gray-600 text-md pb-3">Total jours: {differenceInDays(new Date(endDate.toString()), new Date(startDate.toString()))} {differenceInDays(new Date(endDate.toString()), new Date(startDate.toString())) > 1 ? "Jours" : "Jour"}</h3>
                <h3 className="text-gray-600 text-md pb-3">Prix Total: {differenceInDays(new Date(endDate.toString()), new Date(startDate.toString())) * carId.pricePerDay} DH</h3>
            </div>
        </div>
    );
};

export default ReservationCard;