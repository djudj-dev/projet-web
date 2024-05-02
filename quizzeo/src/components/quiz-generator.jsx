"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "react-query";
import { ReactQueryProvider } from "../components/react-query";
import { postAuthApi } from "../lib/client-fetch";
import { useAuth } from "../lib/useAuth";
import { Spinner } from "./spinner";
import { Redirection } from "./auth-redirection";

export const QuestionCreator = ({ register, unregister, questionNumber }) => {
    const [answerCount, setAnswerCount] = useState(2);

    return (
        <div className="my-4 p-2 shadow rounded bg-slate-100">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Question n°{questionNumber}
                </label>
                <input
                    {...register(`questions.${questionNumber - 1}.title`)}
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder={`Indiquez ici votre question n°${questionNumber}`}
                />
            </div>
            <div className="mb-6">
                <div className="flex items-baseline gap-1">
                    <label className=" text-gray-700 text-sm font-bold mb-2">
                        Nombre de réponses :
                    </label>

                    <input
                        type="number"
                        className="px-3 py-2 w-[10%] border rounded-md focus:outline-none focus:border-blue-500"
                        value={answerCount}
                        onChange={(event) => {
                            unregister(
                                `questions.${questionNumber - 1}.answer.${
                                    event.target.value
                                }`
                            );
                            setAnswerCount(Number(event.target.value));
                        }}
                    />
                </div>
                {Array.from(Array(answerCount)).map((value, index) => (
                    <div className="w-full" key={index}>
                        <label className="block text-gray-700 text-sm font-bold my-3">
                            Réponse n°{index + 1}
                        </label>
                        <input
                            {...register(
                                `questions.${
                                    questionNumber - 1
                                }.answers.${index}`
                            )}
                            type="text"
                            className=" px-3 w-full py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder={`Indiquez ici la réponse n°${
                                index + 1
                            }`}
                        />
                    </div>
                ))}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Bonne réponse
                </label>
                <input
                    {...register(`questions.${questionNumber - 1}.goodAnswer`)}
                    type="number"
                    className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    min={1}
                    max={answerCount}
                    placeholder="Ex : 1"
                />
            </div>
        </div>
    );
};

export const QuizCreator = () => {
    const [questionCount, setQuestionCount] = useState(3);
    const { register, handleSubmit, unregister } = useForm({
        shouldUseNativeValidation: true,
    });
    const { user, jwt } = useAuth("QuizMaker");
    const { data, isLoading, mutate } = useMutation((body) =>
        postAuthApi("auth/quiz", body, jwt)
    );


    const onSubmit = ({ quizTitle, questions }) => {
        questions.forEach(
            ({ goodAnswer }, index) =>
                (questions[index].goodAnswer = Number(goodAnswer))
        );

        mutate({
            title: quizTitle,
            questions,
        });
    };

    if (isLoading || !user) {
        return <Spinner />;
    }

    if (data) {
        return <Redirection />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Titre du quiz
                </label>
                <input
                    {...register("quizTitle")}
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Saisissez ici le titre du quiz"
                />
            </div>
            <div className="mb-6">
                <div className="flex items-baseline gap-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nombre de questions :
                    </label>
                    <input
                        type="number"
                        className="px-3 py-2 w-[10%] border rounded-md focus:outline-none focus:border-blue-500"
                        value={questionCount}
                        onChange={(event) => {
                            unregister("questions." + event.target.value);
                            setQuestionCount(Number(event.target.value));
                        }}
                    />
                </div>

                {Array.from(Array(questionCount)).map((value, index) => (
                    <QuestionCreator
                        questionNumber={index + 1}
                        {...{ register, unregister }}
                        key={index}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="w-[40%] text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Créer le quiz
                </button>
            </div>
        </form>
    );
};

export const QuizCreatorPage = () => (
    <ReactQueryProvider>
        <div className="mt-8 px-4 py-5 bg-[#F0F0F0] rounded shadow-md">
            <QuizCreator />
        </div>
    </ReactQueryProvider>
);
