import { FooterBrand, FooterCopyright, FooterDivider, FooterLinkGroup } from "flowbite-react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";



import LOGO from "../../assets/Rent_Car-Ismaail.png";
import "./Footer.css";
import { Link } from "react-router-dom";


function Footer() {
    return (
        <footer className="footer">
            <div className="w-full text-center container mx-auto px-4 sm:px-24">


                <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">

                    <FooterBrand
                        className="size-30"
                        src={LOGO}
                        alt="LOGO"
                        name="Rent Car Ismaail"
                    />


                    <FooterLinkGroup className="flex flex-col justify-evenly items-center md:flex-row md:justify-evenly md:items-center gap-x-10 text-md text-gray-700">
                        <Link to="/">Accueil</Link>
                        <Link to="/service">Service</Link>
                        <Link to="/contact">Contact</Link>
                    </FooterLinkGroup>

                </div>

                <br />
                <br />


                {/* for social media */}
                <div className="flex flex-col justify-center items-center">

                    <h3 className="text-center pb-6 text-lg font-bold underline text-gray-700">Voir Notre Social Media</h3>


                    <div className="flex justify-end space-x-4 pt-4 pb-16">

                        <FooterLinkGroup className="flex flex-col justify-evenly items-center md:flex-row md:justify-evenly md:items-center gap-x-16 text-md text-gray-600">
                            <Link to="#" className="text-gray-600 hover:text-blue-500">
                                <FaFacebook color="#1877F2" size={25} />
                            </Link>
                            <Link to="#" className="text-gray-600 hover:text-blue-500">
                                <FaInstagram color="#E1306C" size={25} />
                            </Link>
                            <Link to="#" className="text-gray-600 hover:text-blue-500">
                                <BsWhatsapp color="#25D366" size={25} />
                            </Link>
                        </FooterLinkGroup>

                    </div>
                </div>



                <FooterDivider />
                <FooterCopyright className="text-gray-800 pt-8" href="#" by=" Rent Car Ismaail" year={new Date().getFullYear()} />
                <p className="text-gray-800 py-6">Tous les Droits Sont réservé</p>
            </div>
        </footer>
    );
}

export default Footer;