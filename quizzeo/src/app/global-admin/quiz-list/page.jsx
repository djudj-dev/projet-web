"use client"
import { useAuth } from "../../../lib/useAuth";
import { QuizList } from "../../../components/pages/quiz-list"

export default function Page () {
    const { user, jwt } = useAuth('GlobalAdmin');

    return <QuizList {...{ user, jwt }} />
}