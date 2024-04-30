'use client'
import { localJwt } from "../../../lib/local-storage";
import { redirect } from "next/navigation";

export default function Page() {
    localJwt.remove()
    redirect('/connexion/login');

    return <></>
};
