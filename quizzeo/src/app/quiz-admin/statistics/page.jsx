"use client"
import { useAuth } from "../../../lib/useAuth";
import { Statistics } from "../../../components/pages/statistics";

export default function Page () {
    const { user, jwt } = useAuth('QuizAdmin');

    return <Statistics {...{ user, jwt }} />
}