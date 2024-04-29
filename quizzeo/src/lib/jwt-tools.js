import jsonwebtoken from 'jsonwebtoken';

const secretSalt = process.env.SALT;

export const generateJwt = async (userId) => {
    return await jsonwebtoken.sign({ userId },secretSalt, { expiresIn: 60 * 60 })
};

export const verifyJwt = async (token) => {
    return userId = jsonwebtoken.verify(token, secretSalt);
};

export const localJwt = {
    get: () => localStorage.getItem('jwt'),
    set: (jwt) => localStorage.setItem('jwt', jwt)
};