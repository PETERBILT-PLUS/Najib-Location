import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { type FormikHelpers, useFormik } from "formik";
import { type ILoginAdmin, loginSchema } from "../../Configurations/YupSchemas/LoginAdmin.schema.ts";
import axios, { type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

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
            <h1 className="text-gray-500 text-center text-2xl lg:text-3xl pb-16">Login Admin</h1>
            <div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-4xl">
                <form onSubmit={handleSubmit} autoComplete="off" className="shadow-2xl col-span-1 md:col-start-4 md:col-span-6 flex flex-col gap-4 bg-white p-6 rounded-xl">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email">Your email</Label>
                        </div>
                        <TextInput id="email" name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} type="email" placeholder="e-mail" />
                        {errors.email && touched.email && <h4 className="text-sm text-red-600 pt-3">{errors.email}</h4>}
                    </div>
                    <div className="pb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="password1">Mot De Passe</Label>
                        </div>
                        <TextInput id="password" name="password" type="password" placeholder="Mot De Passe" value={values.password} onBlur={handleBlur} onChange={handleChange} />
                        {errors.password && touched.password && <h4 className="text-sm text-red-600 pt-3">{errors.password}</h4>}
                    </div>
                    <div className="mb-8">
                        <p style={{ fontSize: "1em" }}>
                            Crée us compte Admin<Link style={{ fontSize: "1em", textDecoration: "underline" }} to="/register-admin">Register</Link>
                        </p>
                    </div>
                    <Button type="submit">{isSubmitting ? (
                        <Spinner size="md" />
                    ) : ("Enregistrer")}</Button>
                </form>
            </div>
        </main>
    );
}

export default LoginAdmin;
