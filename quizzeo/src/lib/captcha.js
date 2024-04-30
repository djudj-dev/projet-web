import { randomInt } from "crypto";

export const generateCaptcha = (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        captcha += chars.charAt(randomIndex);
    }
    return captcha;
}

export const verifyCaptcha = (userInput, captcha) => (
    userInput === captcha
)