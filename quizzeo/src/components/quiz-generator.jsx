'use client' 
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "react-query";
import { ReactQueryProvider } from "../components/react-query";
import { postApi } from "../lib/client-fetch";
import { useAuth } from "../lib/useAuth";
import { Spinner } from "./spinner";
import { Redirection } from "./auth-redirection";

export const QuestionCreator = ({ register, unregister, questionNumber }) => {
    const [answerCount, setAnswerCount] = useState(2);

    return (
        <div className="my-4 p-2 shadow rounded bg-slate-100">
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Question {questionNumber}
                </label>
                <input
                    {...register(`questions.${questionNumber-1}.title`)}
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Nombre de questions
                </label>
                
                <input
                    type="number"
                    className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={answerCount}
                    onChange={(event) => {
                        unregister(`questions.${questionNumber-1}.answer.${event.target.value}`)
                        setAnswerCount(Number(event.target.value))
                    }}
                />

                {
                    Array.from(Array(answerCount)).map((value, index) =>(
                        <div className="w-full" key={index}>
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Reponse {index+1}
                            </label>
                            <input
                                 {...register(`questions.${questionNumber-1}.answers.${index}`)}
                                type="text"
                                className=" px-3 w-full py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    ))
                }
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Bonne réponse
                </label>
                <input
                    {...register(`questions.${questionNumber-1}.goodAnswer`)}
                    type="number"
                    className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    min={1}
                    max={answerCount}

                />
            </div>
        </div>
    )
}

export const QuizCreator = () => {
    const [questionCount, setQuestionCount] = useState(3);
    const { register, handleSubmit, unregister } = useForm({
        shouldUseNativeValidation: true
    });
    const { data, error, isLoading, mutate } = useMutation(body => 
        postApi("quiz", body)
    );

    const { user } = useAuth("QuizMaker");

    const onSubmit = ({ quizTitle, questions }) => {
        questions.forEach(({ goodAnswer }, index) => questions[index].goodAnswer = Number(goodAnswer))

        mutate({
            title: quizTitle,
            creatorId: user.id,
            questions
        })
    }

    if (isLoading || !user) {
        return <Spinner />
    }

    if (data) {
        return <Redirection />
    } 
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Titre du quizz
                </label>
                <input
                    {...register('quizTitle')}
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Nombre de questions
                </label>
                <input
                    type="number"
                    className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={questionCount}
                    onChange={(event) => {
                        unregister('questions.'+ event.target.value)
                        setQuestionCount(Number(event.target.value))
                    }}
                />

                {
                    Array.from(Array(questionCount)).map((value, index) =>(
                        <QuestionCreator questionNumber={index+1} {...{ register, unregister}} key={index}/>
                    ))
                }
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Créer le quiz
            </button>
        </form>
    )
}

export const QuizCreatorPage = () => (
    <ReactQueryProvider>
        <div className="bg-gray-100 min-h-screen p-24 flex items-center justify-center">
            <div className="w-4/5 w-full bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl  font-semibold mb-6">Créer votre Quizz</h2>
                <QuizCreator />
            </div>
        </div>
    </ReactQueryProvider>
)