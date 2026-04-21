import { useEffect, useState } from "react";
import { useFormik, type FormikHelpers } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { carSchema, type ICar } from "../../Configurations/YupSchemas/car.schema";
import { storage } from "../../Configurations/firebase/firebase";
import { carBrands, carTypes } from "../../Configurations/fixtures/types";
import axios, { type AxiosResponse } from "axios";

function AdminEditCar() {
    const { car_id } = useParams();
    const navigate = useNavigate();
    const [uploadByte, setUploadByte] = useState<number>(0);
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const SERVER: string = import.meta.env.VITE_SERVER as string;
    const token: string | null = localStorage.getItem("token");


    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`${SERVER}/admin/get-single-car/${car_id}`);
                if (response.data.success) {
                    setImages(response.data.car.carImages);
                    setValues(response.data.car);
                }
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    toast.warning(error.response?.data.message);
                    console.error(error);
                } else {
                    toast.warning(error?.message);
                    console.error(error);
                }
            }
        };

        fetchCar();
    }, [car_id]);

    const onSubmit = async (values: ICar, actions: FormikHelpers<ICar>) => {
        try {
            if (!token) return toast.warning("JWT Token Pas Trouvé");

            const dataToSubmit = {
                ...values,
                carImages: images,
                carId: car_id,
                token: token,
            };

            const response: AxiosResponse<{ success: boolean; message?: string }> = await axios.put(`${SERVER}/admin/update-car`, dataToSubmit);
            if (response.data.success) {
                toast.success("Voiture mise à jour avec succès !");
                actions.resetForm();
                navigate("/admin/cars");
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                toast.warning(error.response?.data.message);
                console.error(error);
            } else {
                toast.warning(error?.message);
                console.error(error);
            }
        }
    };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
    } = useFormik<ICar>({
        initialValues: {
            carName: "",
            carFuel: "",
            carImages: [],
            carKm: 0,
            carMarque: "",
            carPlaces: 0,
            carState: "",
            carType: "",
            pricePerDay: 0,
        },
        validationSchema: carSchema,
        onSubmit,
        enableReinitialize: true,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);

        if (selectedFiles.length + images.length > 6) {
            toast.warning("Maximum 6 images autorisées.");
            return;
        }

        setFiles(selectedFiles);
    };

    const handleImageSubmit = async () => {
        if (files.length === 0) return;

        setImageLoading(true);
        try {
            const uploadPromises = files.map((file) => uploadImage(file));
            const urls = await Promise.all(uploadPromises);
            const updatedImages = [...images, ...urls];

            setImages(updatedImages);
            setValues({ ...values, carImages: updatedImages });
            toast.success("Images téléchargées !");
        } catch (err) {
            toast.error("Erreur de téléchargement d'image.");
        } finally {
            setImageLoading(false);
            setFiles([]);
        }
    };

    const uploadImage = (imageFile: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileName = `${Date.now()}-${imageFile.name}`;
            const storageRef = ref(storage, `cars/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadByte(progress);
                },
                (error) => reject(error),
                () => getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject)
            );
        });
    };

    const handleDeleteImage = (url: string) => {
        const updated = images.filter((img) => img !== url);
        setImages(updated);
        setValues({ ...values, carImages: updated });
    };

    return (
        <main className="py-12 min-h-screen">
            <h1 className="text-gray-800 text-center text-2xl lg:text-3xl pb-10">Modifier une Voiture</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <form onSubmit={handleSubmit} className="order-1 lg:order-2 flex max-w-md flex-col gap-4" autoComplete="off">
                    <div>
                        <Label htmlFor="carName">Nom de la Voiture</Label>
                        <TextInput id="carName" name="carName" value={values.carName} onChange={handleChange} onBlur={handleBlur} placeholder="Nom de la Voiture" required />
                        {touched.carName && errors.carName && <div className="text-red-500 text-xs">{errors.carName}</div>}
                    </div>

                    <div>
                        <Label htmlFor="carMarque">Marque</Label>
                        <select id="carMarque" name="carMarque" value={values.carMarque} onChange={handleChange} onBlur={handleBlur} className="w-full p-2 rounded border border-gray-300">
                            <option value="">-- Choisir une marque --</option>
                            {carBrands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                        </select>
                        {touched.carMarque && errors.carMarque && <div className="text-red-500 text-xs">{errors.carMarque}</div>}
                    </div>

                    <div>
                        <Label htmlFor="carKm">Kilométrage</Label>
                        <TextInput id="carKm" name="carKm" type="number" value={values.carKm} onChange={handleChange} onBlur={handleBlur} placeholder="Kilométrage" required />
                        {touched.carKm && errors.carKm && <div className="text-red-500 text-xs">{errors.carKm}</div>}
                    </div>

                    <div>
                        <Label htmlFor="carPlaces">Places</Label>
                        <TextInput id="carPlaces" name="carPlaces" type="number" value={values.carPlaces} onChange={handleChange} onBlur={handleBlur} placeholder="Places" required />
                        {touched.carPlaces && errors.carPlaces && <div className="text-red-500 text-xs">{errors.carPlaces}</div>}
                    </div>

                    <div>
                        <Label htmlFor="carFuel">Carburant</Label>
                        <select id="carFuel" name="carFuel" value={values.carFuel} onChange={handleChange} onBlur={handleBlur} className="w-full p-2 rounded border border-gray-300">
                            <option value="">-- Choisir un type --</option>
                            <option>Essence</option>
                            <option>Diesel</option>
                            <option>Hybrid</option>
                            <option>Electrique</option>
                        </select>
                        {touched.carFuel && errors.carFuel && <div className="text-red-500 text-xs">{errors.carFuel}</div>}
                    </div>

                    <div>
                        <Label htmlFor="carType">Type</Label>
                        <select id="carType" name="carType" value={values.carType} onChange={handleChange} onBlur={handleBlur} className="w-full p-2 rounded border border-gray-300">
                            <option value="">-- Choisir un type --</option>
                            {carTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                        </select>
                        {touched.carType && errors.carType && <div className="text-red-500 text-xs">{errors.carType}</div>}
                    </div>

                    <div>
                        <Label htmlFor="pricePerDay">Prix par jour</Label>
                        <TextInput id="pricePerDay" name="pricePerDay" type="number" value={values.pricePerDay} onChange={handleChange} onBlur={handleBlur} placeholder="Prix par jour" required />
                        {touched.pricePerDay && errors.pricePerDay && <div className="text-red-500 text-xs">{errors.pricePerDay}</div>}
                    </div>

                    <div>
                        <Label htmlFor="carState">Etat</Label>
                        <select id="carState" name="carState" value={values.carState} onChange={handleChange} onBlur={handleBlur} className="w-full p-2 rounded border border-gray-300">
                            <option value="">-- Choisir l'état --</option>
                            <option>Disponible</option>
                            <option>On Charge</option>
                        </select>
                        {touched.carState && errors.carState && <div className="text-red-500 text-xs">{errors.carState}</div>}
                    </div>

                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Mise à jour..." : "Mettre à jour"}</Button>
                </form>

                <div className="order-2 lg:order-1">
                    <Label htmlFor="carImages">Images</Label>
                    <input id="carImages" name="carImages" type="file" accept="image/*" multiple onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300" />
                    <Button className="mt-2" onClick={handleImageSubmit} disabled={imageLoading || files.length === 0}>
                        {imageLoading ? `Chargement... (${Math.round(uploadByte)}%)` : "Upload Images"}
                    </Button>
                    {images.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {images.map((url) => (
                                <div key={url} className="relative group overflow-hidden">
                                    <img src={url} alt="uploaded" className="w-full h-32 object-cover rounded-lg shadow" />
                                    <button type="button" onClick={() => handleDeleteImage(url)} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-90 hover:opacity-100">Supprimer</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default AdminEditCar;