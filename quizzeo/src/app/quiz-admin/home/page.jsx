"use client";
import { useAuth } from "../../../lib/useAuth";
import { HomePage } from "../../../components/pages/home";

export default function Page() {
    const { user, jwt } = useAuth("QuizAdmin");

    return <HomePage {...{ user, jwt}} />
}
