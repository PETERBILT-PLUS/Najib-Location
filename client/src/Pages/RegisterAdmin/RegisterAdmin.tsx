import { Button, Label, TextInput } from "flowbite-react";
import { type FormikHelpers, useFormik } from "formik";
import { createAdminSchema, type IRegisterAdmin } from "../../Configurations/YupSchemas/RegisterAdmin.schema";
import { Link, useNavigate } from "react-router-dom";
import axios, { type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { HiMail, HiLockClosed, HiUser, HiKey } from "react-icons/hi";


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
        <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
            <div className="w-full h-auto max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Inscription Admin</h1>
                    <p className="text-gray-600">Créez votre compte administrateur</p>
                </div>

                {/* Form Container */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-2xl p-8 space-y-5 border border-gray-100"
                >
                    {/* Username */}
                    <div>
                        <Label htmlFor="username" value="Nom d'utilisateur" />
                        <TextInput
                            id="username"
                            name="username"
                            icon={HiUser}
                            placeholder="admin123"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            color={errors.username && touched.username ? "failure" : "gray"}
                            helperText={
                                errors.username && touched.username ? (
                                    <span className="text-red-500">{errors.username}</span>
                                ) : "Choisissez un nom unique"
                            }
                            sizing="lg"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email" value="Adresse email" />
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            icon={HiMail}
                            placeholder="nom@exemple.com"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            color={errors.email && touched.email ? "failure" : "gray"}
                            helperText={
                                errors.email && touched.email ? (
                                    <span className="text-red-500">{errors.email}</span>
                                ) : "Nous ne partagerons jamais votre email"
                            }
                            sizing="lg"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <Label htmlFor="password" value="Mot de passe" />
                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            icon={HiLockClosed}
                            placeholder="Entrez votre mot de passe"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="new-password"
                            color={errors.password && touched.password ? "failure" : "gray"}
                            helperText={
                                errors.password && touched.password ? (
                                    <span className="text-red-500">{errors.password}</span>
                                ) : "Minimum 8 caractères"
                            }
                            sizing="lg"
                        />
                    </div>

                    {/* Secret */}
                    <div>
                        <Label htmlFor="admin_secret" value="Clé secrète Admin" />
                        <TextInput
                            id="admin_secret"
                            name="admin_secret"
                            icon={HiKey}
                            placeholder="Entrez la clé secrète"
                            value={values.admin_secret}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="off"
                            color={errors.admin_secret && touched.admin_secret ? "failure" : "gray"}
                            helperText={
                                errors.admin_secret && touched.admin_secret ? (
                                    <span className="text-red-500">{errors.admin_secret}</span>
                                ) : "Clé fournie par le système"
                            }
                            sizing="lg"
                        />
                    </div>

                    {/* Button */}
                    <Button
                        type="submit"
                        isProcessing={isSubmitting}
                        disabled={isSubmitting}
                        className="w-full h-16 text-white bg-sky-500 hover:bg-sky-700 transition-colors duration-200"
                        size="lg"
                    >
                        {isSubmitting ? "Enregistrement..." : "Créer un compte"}
                    </Button>

                    {/* Footer */}
                    <p className="text-sm text-gray-600 text-center pt-2">
                        Vous avez déjà un compte ?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Connectez-vous
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
}

export default RegisterAdmin;
