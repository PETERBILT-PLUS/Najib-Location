import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import { NavLink, redirect } from "react-router-dom";
import LOGO from "../../assets/Rent_Car-Ismaail.png";
import { CiSettings } from "react-icons/ci";
import { BsWhatsapp } from "react-icons/bs";
import { Languages } from 'lucide-react';
import "./Header.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiMail, HiPhone } from "react-icons/hi";


function Header() {
    const [visibility, setVisibility] = useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [isLangualgesListOpen, setLangualgesListOpen] = useState<boolean>(false);
    const { t, i18n } = useTranslation();

    const message = "Bonjour, je suis intéressé par vos services de location de voitures. Pouvez-vous me fournir plus d'informations ?";
    const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHASTAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    useEffect(() => {
        const checkLanguage = () => {
            const storedLanguage: string | undefined = i18n.resolvedLanguage;
            if (!storedLanguage) return;
            else {
                i18n.changeLanguage(storedLanguage);
            }
        };
        checkLanguage();
    }, []);

    const showWebsiteInfosAlert = () => {
        // this is for show email & phone number in an alert when the user click on the 2 icones icon in the header
        alert("Email: ismaailelkhatouri@gmail.com\nPhone: 0678888513")
    };

    return (
        <header className="header relative">
            <Navbar rounded className="container relative mx-auto px-4 sm:px-24 bg-blend-darken bg-gray-300/5">
                <NavbarBrand as={NavLink} onClick={() => redirect("/")}>
                    <img src={LOGO} className="h-24" alt="LOGO" />
                </NavbarBrand>

                <div className="self-center md:flex flex-row justify-evenly items-center gap-x-16 hidden">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>{t("navbar.cars")}</NavLink>
                    <NavLink to="/service" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>{t("navbar.services")}</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>{t("navbar.contact")}</NavLink>
                </div>

                <div className="flex flex-row justify-between items-center md:order-2">

                    <div className="text-center flex flex-row justify-between items-center md:flex-col pr-10 gap-x-7 gap-y-3 lg:gap-y-0">
                        <div className="flex flex-row justify-center items-center gap-x-2">
                            <HiMail onClick={() => showWebsiteInfosAlert()} color="#2973B2" size={25} className="text-gray-700" />
                            <h3 className="header-info text-gray-800 hidden lg:block py-1 font-medium">ismaailelkhatouri@gmail.com</h3>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-x-2">
                            <HiPhone onClick={() => showWebsiteInfosAlert()} color="#2973B2" size={25} className="text-gray-700" />
                            <h3 className="header-info text-gray-800 hidden lg:block py-1 font-medium">0678888513</h3>
                        </div>
                    </div>


                    <div className="gap-x-4 flex md:order-2">
                        <div className="mr-4 relative">
                            <CiSettings size={28} className="cursor-pointer" onClick={() => {
                                setIsSettingsOpen((prev) => !prev)
                                setLangualgesListOpen(false);
                            }
                            } />
                            {isSettingsOpen && (
                                <a href="/register-admin" className="absolute top-16 left-0 text-md block px-5 py-3 border-4 border-gray-300 bg-white hover:border-blue-500 rounded-lg transition-all text-blue-500">Admin</a>
                            )}
                        </div>

                        <div className="relative">
                            <Languages size={28} className="cursor-pointer" onClick={() => {
                                setLangualgesListOpen((prev) => !prev)
                                setIsSettingsOpen(false);
                            }

                            } />
                            {!!isLangualgesListOpen && (
                                <div className="absolute top-16 left-0 bg-white flex flex-col justify-evenly items-center rounded-md">
                                    {["en", "fr", "ar", "es"].map((lang) => (
                                        <button
                                            key={lang}
                                            className="text-gray-800 w-full hover:text-blue-600 px-5 py-3 text-sm rounded-md hover:bg-gray-100 font-bold"
                                            onClick={() => i18n.changeLanguage(lang)}
                                        >
                                            {lang === "en" && "English"}
                                            {lang === "fr" && "Français"}
                                            {lang === "ar" && "العربية"}
                                            {lang === "es" && "Español"}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <NavbarToggle onClick={() => setVisibility((prev) => !prev)} />
                    </div>

                </div>
                <NavbarCollapse className={`${visibility ? "flex" : "hidden"} navbar-collapse md:hidden flex-col justify-evenly items-center`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>{t("navbar.cars")}</NavLink>
                    <NavLink to="/service" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>{t("navbar.services")}</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>{t("navbar.contact")}</NavLink>
                </NavbarCollapse>
            </Navbar>

            <div className="flex flex-row justify-center items-center fixed bottom-8 right-8">

                <a href={whatsappUrl} target="_blank" rel=" noreferrer" className="flex flex-row justify-center items-center w-24 bg-green-500 hover:bg-green-600 text-white rounded-full py-5 shadow-lg">
                    <button type="button" className="w-full text-center flex flex-row justify-center items-center">
                        <BsWhatsapp size={24} />
                    </button>
                </a>
            </div>
        </header>
    );
}

export default Header;