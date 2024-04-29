import Header from "../../components/header";
import Footer from "../../components/footer";
export default function HomeLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
