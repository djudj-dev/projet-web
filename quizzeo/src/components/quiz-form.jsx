"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ReactQueryProvider } from "../components/react-query";
import { postApi } from "../lib/client-fetch";
import { useAuth } from "../lib/useAuth";
import { Spinner } from "./spinner";
import { Redirection } from "./auth-redirection";
import Image from "next/image";

export const QuizForm = ({ quizz }) => {
    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    });

    const { user } = useAuth("any");

    const { data, isLoading, error, mutate } = useMutation((body) =>
        postApi("result", body)
    );

    const onSubmit = ({ reply }) => {
        const stats = {
            goodReply: 0,
            questionsNumber: quizz.questions.length,
        };

        reply.forEach((value, index) => {
            if (quizz.questions[index].goodAnswer == value) {
                stats.goodReply++;
            }
        });

        const score = (stats.goodReply / stats.questionsNumber).toFixed(2);

        mutate({
            score,
            userId: user.id,
            quizId: quizz.id,
        });
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (data || !quizz.enabled) {
        return <Redirection />;
    }

    if (error) {
        console.error("Erreur a l'enregistrement du resultat");

        return <Redirection />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {quizz.questions.map((data, index) => {
                const { title, answers } = data;
                return (
                    <div className="flex flex-col m-4" key={index}>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {title}
                        </label>
                        {answers.map((value, replyIndex) => {
                            return (
                                <div key={replyIndex}>
                                    <input
                                        {...register(`reply.${index}`)}
                                        type="radio"
                                        name={`reply.${index}`}
                                        value={replyIndex + 1}
                                    />{" "}
                                    {value}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
            <button
                type="submit"
                className="w-full bg-[#CDB46D] text-white py-2 px-4 rounded-md hover:bg-[#F3E999] focus:outline-none focus:bg[#F3E999] font-bold hover:text-[#6A6363]"
            >
                Répondre au Quiz
            </button>
        </form>
    );
};

export const QuizFormPage = ({ quizz }) => (
    <ReactQueryProvider>
        <div className="bg-gray-100 min-h-screen px-24 py-10 flex flex-col gap-5 items-center">
            <Image
                src="/QuizzeoBanner.svg"
                width={400}
                height={400}
                className="rounded shadow-sm"
            />
            <div className="w-full bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl  font-semibold mb-6">{quizz.title}</h2>
                <QuizForm quizz={quizz} />
            </div>
        </div>
    </ReactQueryProvider>
);
