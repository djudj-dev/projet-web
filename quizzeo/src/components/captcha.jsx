"use client";
import { useEffect, useState } from "react";
import { generateCaptcha, verifyCaptcha } from "../lib/captcha";
import Image from "next/image";

const captchaLengh = 5;

export const Captcha = ({ setCaptaResolve }) => {
    const [answer, setAnswer] = useState();
    const [captcha, setCaptcha] = useState(generateCaptcha(captchaLengh));

    const reloadCaptcha = () => {
        setCaptcha(generateCaptcha(captchaLengh));
    };

    useEffect(() => {
        setCaptaResolve(verifyCaptcha(answer, captcha));
    }, [answer, captcha, setCaptaResolve]);

    return (
        <div className="w-full p-3 border rounded-md mb-4 justify-center items-center">
            <p className="text-center text-gray-700 text-sm font-bold">
                Vous devez résoudre le Captcha
            </p>
            <div className="flex bg-[#CFCFCF] px-3 rounded">
                <p className="w-full text-center my-2 italic line-through font-bold rounded bg-[#CFCFCF] text-[#6A6363]">
                    {captcha}
                </p>
                <Image
                    src="/reloadIcon.svg"
                    alt=""
                    className="hover:animate-spin cursor-pointer"
                    width={25}
                    height={25}
                    onClick={() => reloadCaptcha()}
                />
            </div>
            <input
                onChange={(event) => setAnswer(event.target.value)}
                className="w-full px-3 py-2 my-2 border rounded-md focus:outline-none focus:border-blue-500"
            ></input>
            {!verifyCaptcha(answer, captcha) && (
                <p className="text-center font-bold text-red-600">
                    Le Captcha n'est pas valide
                </p>
            )}
        </div>
    );
};
