/**
 * Fonction qui génère aléatoirement un mot de passe sécurisé
 * @param {*} length longueur du mot de passe par défaut 16
 * @returns string
 */
const generateSecurePassword = (length = 16) => {
    // Constante contenant les caractères potentiels du mot de passe
    const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // Fonction pour générer un caractère aléatoire
    const getRandomChar = () => {
        return charset[Math.floor(Math.random() * charset.length)];
    };

    // Génère le mot de passe
    let password = "";
    for (let i = 0; i < length; i++) {
        password += getRandomChar();
    }

    return password;
};

export default generateSecurePassword;
