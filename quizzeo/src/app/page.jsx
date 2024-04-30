import { Redirection } from "../components/auth-redirection"
import { PulseLoader } from "react-spinners" 

export default function Page() {
    return (
        <>
            <Redirection />
            <PulseLoader color="#36d7b7" />
        </>
    );
}
