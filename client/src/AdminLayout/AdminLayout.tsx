import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import LOGO from "../assets/Rent_Car-Ismaail.png";
import { useState } from "react";

function AdminLayout() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const setLogout = () => {
        setDropdownOpen(false);
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <main className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12">
            {/* Sidebar */}
            <nav className="hidden lg:flex lg:col-span-3 flex-col bg-gray-100 shadow-md min-h-screen px-6 py-8">
                <div className="flex justify-center mb-10">
                    <img src={LOGO} alt="LOGO" className="w-32 h-auto" />
                </div>
                <hr className="mb-6 border-gray-300" />
                <NavLink
                    to="/admin/"
                    end
                    className={({ isActive }) =>
                        isActive ? "font-semibold text-blue-600 mb-4" : "text-gray-700 mb-4 hover:text-blue-500"
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/admin/cars"
                    className={({ isActive }) =>
                        isActive ? "font-semibold text-blue-600 mb-4" : "text-gray-700 mb-4 hover:text-blue-500"
                    }
                >
                    Véhicules
                </NavLink>
                <NavLink
                    to="/admin/reservations"
                    className={({ isActive }) =>
                        isActive ? "font-semibold text-blue-600 mb-4" : "text-gray-700 mb-4 hover:text-blue-500"
                    }
                >
                    Réservations
                </NavLink>
            </nav>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-9 bg-white">
                {/* Top Nav */}
                <nav className="w-full flex justify-between items-center h-16 px-6 bg-blue-600 text-white shadow-md">
                    <div className="text-xl font-bold">Admin Panel</div>
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className="cursor-pointer px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700 transition"
                        >
                            Options
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                                <Link
                                    to="/admin"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/admin/reservations"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Réservations
                                </Link>
                                <Link
                                    to="/admin/cars"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Véhicules
                                </Link>
                                <Link
                                    to="/admin/create-car"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Crée un Vehicule
                                </Link>
                                <button
                                    className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {setLogout()}}
                                >
                                    Déconnexion
                                </button>
                            </div>
                        )}
                    </div>
                </nav>

                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export default AdminLayout;
