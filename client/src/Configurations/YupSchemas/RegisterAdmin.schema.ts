import * as yup from "yup";

export interface IRegisterAdmin {
    username: string;
    email: string;
    password: string;
    admin_secret: string;
}

export const createAdminSchema = yup.object<IRegisterAdmin>().shape({
    username: yup
        .string()
        .required("Le nom d'utilisateur est requis"),
    email: yup
        .string()
        .email("Adresse email invalide")
        .required("L'email est requis"),
    password: yup
        .string()
        .required("Le mot de passe est requis"),
    admin_secret: yup
        .string()
        .required("Le secret admin est requis"),
});
