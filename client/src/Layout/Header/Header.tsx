import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import LOGO from "../../assets/Rent_Car-Ismaail.png";
import { CiSettings } from "react-icons/ci";
import "./Header.css";
import { useState } from "react";


function Header() {
    const [visibility, setVisibility] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <header className="header">
            <Navbar rounded className="container mx-auto px-4 sm:px-24">
                <NavbarBrand as={NavLink} onClick={() => redirect("/")}>
                    <img src={LOGO} className="h-24" alt="LOGO" />
                </NavbarBrand>
                <div className="flex flex-row justify-between items-center md:order-2">
                    <div className="text-center flex flex-col justify-between items-center pr-10">
                        <h3 className="header-info text-gray-900 hidden lg:block py-1 font-medium">ismaailelkhatouri@gmail.com</h3>
                        <h3 className="header-info text-gray-900 hidden lg:block py-1 font-medium">0678888513</h3>
                    </div>
                    <div className="flex flex-col justify-center items-center relative">
                        <CiSettings size={28} className="cursor-pointer" onClick={() => setVisibility(!visibility)} />
                        <div className={visibility ? "drop-down flex flex-col justify-start items-center shadow" : "drop-down  flex-col justify-start items-center shadow hidden"}>
                            <div className="part" onClick={() => navigate("/login")}>A dmin Log-In</div>
                        </div>
                    </div>
                    <NavbarToggle />
                </div>
                <NavbarCollapse>
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Accueil</NavLink>
                    <NavLink to="/service" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Service</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Contact</NavLink>
                </NavbarCollapse>
            </Navbar>
        </header>
    );
}

export default Header;