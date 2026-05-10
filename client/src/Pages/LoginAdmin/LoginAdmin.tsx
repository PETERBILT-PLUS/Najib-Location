import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { type FormikHelpers, useFormik } from "formik";
import { type ILoginAdmin, loginSchema } from "../../Configurations/YupSchemas/LoginAdmin.schema.ts";
import axios, { type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HiUser, HiKey } from "react-icons/hi";


function LoginAdmin() {
    const SERVER: string = import.meta.env.VITE_SERVER as string;
    const navigate = useNavigate();

    const onSubmit = async (values: ILoginAdmin, actions: FormikHelpers<ILoginAdmin>) => {
        try {
            const response: AxiosResponse<{ success: boolean, message?: string, token?: string }> = await axios.post(`${SERVER}/admin/login-admin`, { ...values });
            if (response.data.success && response.data.token) {
                localStorage.setItem("token", response.data.token);
                toast.success(response.data.message);
                actions.resetForm();
                navigate("/admin");
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

    const { errors, values, touched, handleBlur, handleSubmit, handleChange, isSubmitting } = useFormik<ILoginAdmin>({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
        validationSchema: loginSchema
    });

    return (
        <main className="min-h-screen flex flex-col justify-center items-center p-4">
            <h1 className="text-gray-700 text-center text-2xl lg:text-3xl pb-16">Login Admin</h1>
            <div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-4xl">


                <form onSubmit={handleSubmit} autoComplete="off" className="shadow-2xl col-span-1 md:col-start-4 md:col-span-6 flex flex-col gap-4 bg-white p-6 rounded-xl">
                    <div>
                        <Label htmlFor="email" value="Adresse email" />

                        <TextInput
                            id="email"
                            name="email"
                            icon={HiUser}
                            placeholder="admin@domain.com"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            color={errors.email && touched.email ? "failure" : "gray"}
                            helperText={
                                errors.email && touched.email ? (
                                    <span className="text-red-500">{errors.email}</span>
                                ) : "Choisissez une adresse email valide"
                            }
                            sizing="lg"
                        />

                    </div>
                    <div>
                        <Label htmlFor="password" value="Mot de passe" />

                        <TextInput
                            id="password"
                            name="password"
                            icon={HiKey}
                            placeholder="admin123"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="new-password"
                            color={errors.password && touched.password ? "failure" : "gray"}
                            helperText={
                                errors.password && touched.password ? (
                                    <span className="text-red-500">{errors.password}</span>
                                ) : "Choisissez un mot de passe fort"
                            }
                            sizing="lg"
                        />

                    </div>

                    <Button
                        type="submit"
                        isProcessing={isSubmitting}
                        disabled={isSubmitting}
                        className="mt-5 w-full h-16 text-white bg-sky-500 hover:bg-sky-700 transition-colors duration-200"
                        size="lg"
                    >
                        {isSubmitting ? "Enregistrement..." : "Créer un compte"}
                    </Button>

                </form>
            </div>
        </main>
    );
}

export default LoginAdmin;
