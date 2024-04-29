const crypto = require('crypto');

// Fonction pour générer un captcha 
function generercaptcha(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, chars.length);
        captcha += chars.charAt(randomIndex);
    }
    return captcha;
}

// Exemple de longueur de CAPTCHA
const captchaLength = 5;

// Générer un CAPTCHA
const captcha = generercaptcha(captchaLength);
console.log('CAPTCHA généré:', captcha);

// Fonction pour vérifier le captcha
function verifyCaptcha(userInput, captcha) {
    if (userInput === captcha) {
        console.log('CAPTCHA vérifié avec succès!'); 
        return true; 
    } else {
        console.log('CAPTCHA incorrect. Veuillez réessayer.'); 
        return false; 
    }
}
