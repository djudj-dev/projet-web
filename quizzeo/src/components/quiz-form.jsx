'use client' 
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "react-query";
import { ReactQueryProvider } from "../components/react-query";
import { postApi } from "../lib/client-fetch";
import { localJwt } from "../lib/local-storage";

export const QuizForm = ({ quizz }) => {
    const [questionCount, setQuestionCount] = useState(3);
    const { register, handleSubmit, } = useForm({
        shouldUseNativeValidation: true
    });

    const { data, error, mutate } = useMutation(body => 
        postApi("result", body)
    );

    const onSubmit = (data) =>{
        const jwt = localJwt.get() || '15';

        const stats = {
            goodReply: 0,
            questionsNumber: quizz.questions.length
        };

        data.reply.forEach((value, index) => {

            if (quizz.questions[index].goodAnswer == value) {
                stats.goodReply ++
            }
        })

        const score = (stats.goodReply / stats.questionsNumber).toFixed(2);

        mutate({
            score,
            userId: jwt,
            quizId: quizz.id
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                quizz.questions.map((data, index) => {
                    const { title, answers } = data;
                    return (
                        <div className="flex flex-col m-4"key={index}>
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                {title}
                            </label>
                                {
                                    answers.map((value, replyIndex) => {
                                    return (
                                        <div key={replyIndex}>
                                        <input {...register(`reply.${index}`)} type="radio" name={`reply.${index}`} value={replyIndex+1} /> {value}
                                        </div>
                                    )
                                    })
                                }
                        </div>
                    )
                })
            }
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Créer le quiz
            </button>
        </form>
    )
}

export const QuizFormPage = ({ quizz }) => (
    <ReactQueryProvider>
        <div className="bg-gray-100 min-h-screen p-24 flex items-center justify-center">
            <div className="w-4/5 w-full bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl  font-semibold mb-6">{quizz.title}</h2>
                <QuizForm quizz={quizz}/>
            </div>
        </div>
    </ReactQueryProvider>
)