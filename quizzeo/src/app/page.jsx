"use client"
import { Redirection } from "../components/auth-redirection"
import { Spinner } from "../components/spinner"

export default function Page() {
    return (
        <>
            <Redirection />
            <Spinner />
        </>
    );
}
