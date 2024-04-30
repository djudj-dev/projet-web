'use client'
import { useEffect, useState } from "react"
import { generateCaptcha, verifyCaptcha } from "../lib/captcha"

const captchaLengh = 5

export const Captcha = ({ setCaptaResolve }) => {
    const [answer, setAnswer] = useState();
    const [captcha, setCaptcha] = useState(generateCaptcha(captchaLengh))
    
    const reloadCaptcha = () => {
        setCaptcha(generateCaptcha(captchaLengh))
    }

    useEffect(() => {
        setCaptaResolve(verifyCaptcha(answer, captcha))
    }, [answer, captcha])

    return (
        <div className="w-full p-3 border rounded-md mb-4 justify-center items-center">
            <p className="text-center font-bold">Vous devez résoudre le Captcha</p>
            <p className="w-full p-2 text-center my-2 italic line-through font-bold rounded bg-slate-900 text-amber-300">{captcha}</p>
            <input onChange={(event) => setAnswer(event.target.value)} className="w-full px-3 py-2 my-2 border rounded-md focus:outline-none focus:border-blue-500"></input>
            { !verifyCaptcha(answer, captcha) && <p className="text-center font-bold text-red-600">Captcha Invalid</p> }
            <button className="w-full p-2 text-center my-2 font-bold rounded bg-slate-200" onClick={() => reloadCaptcha()}>Changer le captcha</button>
        </div>
    )
}