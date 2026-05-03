import { Dropdown, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import LOGO from "../../assets/Rent_Car-Ismaail.png";
import { CiSettings } from "react-icons/ci";
import { BsWhatsapp } from "react-icons/bs";

import "./Header.css";
import { useState } from "react";


function Header() {
    const [visibility, setVisibility] = useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const message = "Bonjour, je suis intéressé par vos services de location de voitures. Pouvez-vous me fournir plus d'informations ?";
    const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHASTAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    return (
        <header className="header relative">
            <Navbar rounded className="container relative mx-auto px-4 sm:px-24">
                <NavbarBrand as={NavLink} onClick={() => redirect("/")}>
                    <img src={LOGO} className="h-24" alt="LOGO" />
                </NavbarBrand>

                <div className="self-center md:flex flex-row justify-evenly items-center gap-x-16 hidden">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Accueil</NavLink>
                    <NavLink to="/service" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Service</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Contact</NavLink>
                </div>

                <div className="flex flex-row justify-between items-center md:order-2">

                    <div className="text-center flex flex-col justify-between items-center pr-10">
                        <h3 className="header-info text-gray-900 hidden lg:block py-1 font-medium">ismaailelkhatouri@gmail.com</h3>
                        <h3 className="header-info text-gray-900 hidden lg:block py-1 font-medium">0678888513</h3>
                    </div>


                    <div className="flex md:order-2">
                        <div className="mr-4 relative">
                            <CiSettings size={28} className="cursor-pointer" onClick={() => setIsSettingsOpen((prev) => !prev)} />
                            {isSettingsOpen && (
                                <a href="/register-admin" className="absolute top-16 left-0 text-md block px-5 py-3 border-4 border-gray-300 bg-white hover:border-blue-500 rounded-lg transition-all text-blue-500">Admin</a>
                            )}
                        </div>
                        <NavbarToggle onClick={() => setVisibility((prev) => !prev)} />
                    </div>

                </div>
                <NavbarCollapse className={`${visibility ? "flex" : "hidden"} navbar-collapse md:hidden flex-col justify-evenly items-center`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Accueil</NavLink>
                    <NavLink to="/service" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Service</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Contact</NavLink>
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