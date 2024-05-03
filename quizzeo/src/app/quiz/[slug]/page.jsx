import { QuizFormPage } from "../../../components/quiz-form";
import { quiz } from "../../../lib/quiz";

export default async function Page({ params }) {
    const currentQuiz = await quiz.getWithQuestion(params.slug)
    return (
        <>
            <QuizFormPage quiz={currentQuiz}/>
        </>
    )
}