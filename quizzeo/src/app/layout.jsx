import { Inter } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Quizzeo",
    description: "Générateur de quizz en ligne",
};

export default function HomeLayout({ children }) {
    return (
        <html lang="fr" className="h-full">
            <body className={`${inter.className} min-h-full flex flex-col`}>
                <Header />
                    {children}
                <Footer />
            </body>
        </html>
    );
}
