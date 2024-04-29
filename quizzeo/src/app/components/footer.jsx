import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto flex justify-between items-center">
                <p>&copy; {currentYear} Nom de votre site</p>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a
                                href="/politique-confidentialite"
                                className="hover:text-gray-400"
                            >
                                Politique de confidentialité
                            </a>
                        </li>
                        <li>
                            <a
                                href="/mentions-legales"
                                className="hover:text-gray-400"
                            >
                                Mentions légales
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-gray-400">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
