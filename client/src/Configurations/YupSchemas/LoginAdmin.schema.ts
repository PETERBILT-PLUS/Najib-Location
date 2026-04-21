import * as yup from "yup";

export interface ILoginAdmin {
    email: string;
    password: string;
}

export const loginSchema = yup.object<ILoginAdmin>().shape({
    email: yup
        .string()
        .email("email address Pas Validé")
        .required("Entrer Votre e-mail"),
    password: yup
        .string()
        .required("Entrer le mot de passe"),
});
