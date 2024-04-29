import React from "react";
import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Quizzeo
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                href="/account"
                                className="hover:text-gray-400"
                            >
                                Mon compte
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
