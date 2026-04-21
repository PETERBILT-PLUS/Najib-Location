import * as yup from "yup";

// Interface definition for the car model
export interface ICar {
  carName: string;        // Name of the car
  carMarque: string;      // Car brand (e.g., Toyota, BMW)
  carKm: number;          // Kilometers driven
  carPlaces: number;      // Number of seats
  carFuel: string;        // Fuel type (e.g., Petrol, Diesel, Electric)
  carType: string;        // Type of car (e.g., Sedan, SUV)
  carImages: string[];    // List of image URLs
  pricePerDay: number;    // Price per day for renting
  carState: string;       // Condition of the car (e.g., New, Used)
}

// Yup validation schema for ICar
export const carSchema = yup.object<ICar>().shape({
  carName: yup
    .string()
    .required("Le nom de la voiture est requis"),

  carMarque: yup
    .string()
    .required("La marque de la voiture est requise"),

  carKm: yup
    .number()
    .typeError("Le kilométrage doit être un nombre")
    .required("Le kilométrage est requis"),

  carPlaces: yup
    .number()
    .typeError("Le nombre de places doit être un nombre")
    .required("Le nombre de places est requis"),

  carFuel: yup
    .string()
    .required("Le type de carburant est requis"),

  carType: yup
    .string()
    .required("Le type de voiture est requis"),

  carImages: yup
    .array()
    .of(yup.string().url("Chaque image doit être une URL valide"))
    .min(1, "Au moins une image est requise")
    .required("Les images de la voiture sont requises"),

  pricePerDay: yup
    .number()
    .typeError("Le prix par jour doit être un nombre")
    .required("Le prix par jour est requis"),

  carState: yup
    .string()
    .required("L'état de la voiture est requis")
});