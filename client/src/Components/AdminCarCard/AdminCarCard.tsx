import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

interface AdminCarCardProps {
    carId: string;
    carName: string;
    carFuel: string;
    carMarque: string;
    carKm: number;
    carPlaces: number;
    carType: string;
    carImage: string;
    pricePerDay: string;
    carState: string;
    onDelete: (carId: string) => void; // 🆕 Add this line
}

function AdminCarCard({
    carId,
    carName,
    carFuel,
    carMarque,
    carKm,
    carPlaces,
    carType,
    carImage,
    pricePerDay,
    carState,
    onDelete,
}: AdminCarCardProps) {
    const navigate = useNavigate();

    return (
        <Card className="shadow-2xl">
            <div className="w-full overflow-hidden">
                <img src={carImage} alt="Voiture Image" className="object-cover w-full h-48" />
            </div>

            <div className="pb-5 px-3 pt-2">
                <h5 className="text-xl font-bold text-gray-900 pb-5" style={{ color: "var(--blue)" }}>
                    {carMarque} – {carName}
                </h5>

                <ul className="text-gray-700 text-sm space-y-1">
                    <li>Type : {carType}</li>
                    <li>État : {carState}</li>
                    <li>Carburant : {carFuel}</li>
                    <li>Kilométrage : {carKm.toLocaleString()} km</li>
                    <li>Places : {carPlaces}</li>
                    <li>Prix / jour : {pricePerDay} DH</li>
                </ul>

                <div className="flex flex-row justify-start items-center gap-1 md:gap-5 lg:gap-8 mt-4">
                    <button
                        type="button"
                        onClick={() => onDelete(carId)}
                        className="text-white py-4 px-6 bg-red-600 rounded-md font-semibold cursor-pointer"
                    >
                        Supprimer
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/admin/update-car/${carId}`)}
                        className="text-white py-4 px-6 bg-blue-600 rounded-md font-semibold cursor-pointer"
                    >
                        Modifier
                    </button>
                </div>
            </div>
        </Card>
    );
}

export default AdminCarCard;
