import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { useParams } from "react-router-dom"
import "swiper/swiper-bundle.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios, { type AxiosResponse } from "axios";
import { Spinner } from "flowbite-react";

// Install modules (required in v9)
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

/*const carImages = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1603898037225-dabd32c7b5e4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1618424189363-4b332416881d?auto=format&fit=crop&w=800&q=80",
];*/

function GetSingleCar() {
    const params = useParams();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [car, setCar] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [formLoading, setFormLoading] = useState<boolean>(false);
    const [form, setForm] = useState<{
        carId: string | undefined,
        startDate: string | number | readonly string[] | undefined,
        endDate: string | number | readonly string[] | undefined,
        name: string,
        phoneNumber: string,
        userGmail: string,
    }>({
        carId: params.carId,
        startDate: "",
        endDate: "",
        name: "",
        phoneNumber: "",
        userGmail: "",
    });
    const SERVER: string = import.meta.env.VITE_SERVER as string;

    useEffect(() => {
        const getSingleCar = async () => {
            try {
                const carId = params.carId;
                if (!carId) toast.warning("Voiture Id n'est pas définé");
                const response: AxiosResponse<{ success: boolean, car: any }> = await axios.get(`${SERVER}/user/get-single-car/${carId}`);
                if (response.data.success) {
                    console.log(response.data);
                    setCar(response.data.car);
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

        getSingleCar();
    }, []);

    useEffect(() => {
        const getUserState = () => {
            if (window.innerWidth < 950) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            };
        }

        getUserState();

        window.addEventListener("resize", getUserState);

        return () => {
            window.removeEventListener("resize", getUserState);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setFormLoading(true);
            if (!form.carId) return toast.warning("Voiture id n'est Pas Définé")
            const response: AxiosResponse<{ success: boolean, message?: string }> = await axios.post(`${SERVER}/user/create-reservation`, form);
            if (response.data.success) {
                toast.success(response.data?.message);
                setForm({ startDate: "", endDate: "", name: "", phoneNumber: "", userGmail: "", carId: params.carId });
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                toast.warning(error.message);
                console.error(error);
            } else {
                toast.error(error?.messgae);
                console.error(error);
            }
        } finally {
            setFormLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    if (loading) {
        return (
            <main className="min-h-screen flex flex-row justify-center items-center">
                <Spinner size="xl"></Spinner>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full mx-auto">
                <Swiper
                    spaceBetween={30}
                    slidesPerView={isMobile ? 1 : 3}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    className="rounded-2xl overflow-hidden shadow-xl"
                >
                    {car?.carImages?.map((elem: any, index: number) => {
                        return (
                            <SwiperSlide style={{ width: "33.33%" }} key={index}>
                                <img
                                    src={elem}
                                    alt={`Car Slide ${index + 1}`}
                                    className="w-full h-[360px] object-cover"
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            <div className="container mx-auto px-4 sm:px-24 my-20 grid grid-cols-1 lg:grid-cols-2 pb-24 pt-12">
                <div className="flex flex-col justif-start items-start">
                    <h2 className="text-base lg:text-3xl" style={{ color: "var(--blue)" }}>{car.carName}</h2>

                    <h3 className="text-base lg:text-xl pt-8 text-gray-600">Marque: {car.carMarque}</h3>
                    <h3 className="text-base lg:text-xl pt-4 text-gray-600">Places: {car.carPlaces == 1 ? car.carPlaces + " Place" : car.carPlaces + " Places"}</h3>
                    <h3 className="text-base lg:text-xl pt-4 text-gray-600">Type: {car.carType}</h3>
                    <h3 className="text-base lg:text-xl pt-4 text-gray-600">Km: {car.carKm} Km</h3>
                    <h3 className="text-base lg:text-xl pt-4 text-gray-600">Carburant: {car.carFuel}</h3>
                </div>

                <div className="mt-12 lg:mt-0 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
                    <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                        Réservez cette voiture
                    </h3>

                    <form className="space-y-6" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de début</label>
                            <input
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                type="date"
                                name="startDate"
                                value={form.startDate}
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de fin</label>
                            <input
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                type="date"
                                name="endDate"
                                value={form.endDate}
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom complet</label>
                            <input
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                type="text"
                                name="name"
                                value={form.name}
                                placeholder="John Doe"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                            <input
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                type="tel"
                                name="phoneNumber"
                                value={form.phoneNumber}
                                placeholder="+06 78 00 00 19"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">G-mail</label>
                            <input
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                type="email"
                                name="userGmail"
                                value={form.userGmail}
                                placeholder="email@gmail.com"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                        >

                            {formLoading ? (
                                <Spinner size="md" />
                            ) : ("Réserver maintenant")}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default GetSingleCar;
