import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { type FormikHelpers, useFormik } from "formik";
import { createAdminSchema, type IRegisterAdmin } from "../../Configurations/YupSchemas/RegisterAdmin.schema";
import { Link, useNavigate } from "react-router-dom";
import axios, { type AxiosResponse } from "axios";
import { toast } from "react-toastify";

function RegisterAdmin() {
    const SERVER: string = import.meta.env.VITE_SERVER as string;
    const navigate = useNavigate();

    const onSubmit = async (values: IRegisterAdmin, actions: FormikHelpers<IRegisterAdmin>) => {
        try {
            const response: AxiosResponse<{ success: boolean, message?: string }> = await axios.post(`${SERVER}/admin/create-admin`, values);
            if (response.data.success) {
                toast.success(response.data.message);
                actions.resetForm();
                navigate("/login");
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

    const {
        errors,
        values,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
        isSubmitting,
    } = useFormik<IRegisterAdmin>({
        initialValues: {
            username: "",
            email: "",
            password: "",
            admin_secret: "",
        },
        validationSchema: createAdminSchema,
        onSubmit,
    });

    return (
        <main className="min-h-screen flex flex-col justify-start items-center py-24">
            <h1 className="text-gray-700 text-2xl font-semibold mb-6">Inscription Admin</h1>

            <div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-4xl">
                <form
                    onSubmit={handleSubmit}
                    className="col-span-1 md:col-start-4 md:col-span-6 flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md w-full"
                >
                    <div>
                        <Label htmlFor="username">Nom d'utilisateur</Label>
                        <TextInput
                            id="username"
                            name="username"
                            placeholder="admin123"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            color={errors.username && touched.username ? "failure" : undefined}
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Adresse email</Label>
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            placeholder="nom@exemple.com"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            color={errors.email && touched.email ? "failure" : undefined}
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            color={errors.password && touched.password ? "failure" : undefined}
                        />
                    </div>

                    <div className="pb-2">
                        <Label htmlFor="admin_secret">Clé secrète Admin</Label>
                        <TextInput
                            id="admin_secret"
                            name="admin_secret"
                            type="text"
                            value={values.admin_secret}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            color={errors.admin_secret && touched.admin_secret ? "failure" : undefined}
                        />
                    </div>

                    <div className="mb-5">
                        <p style={{ fontSize: "1em" }}>
                            Vous avez déja un Compte<Link style={{ fontSize: "1em", textDecoration: "underline" }} to="/login">login</Link>
                        </p>
                    </div>

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Spinner size="md" />
                        ) : ("Enregistrer")}
                    </Button>
                </form>
            </div>
        </main>
    );
}

export default RegisterAdmin;
