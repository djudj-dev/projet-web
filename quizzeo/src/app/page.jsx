import { Redirection } from "../components/client-auth"
import { PuffLoader, PulseLoader } from "react-spinners" 

export default function Page() {
    return (
        <>
            <Redirection />
            <PulseLoader color="#36d7b7" />
        </>
    );
}
