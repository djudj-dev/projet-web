import jsonwebtoken from 'jsonwebtoken';

const secretSalt = process.env.SALT;

export const generateJwt = async (userId) => {
    return await jsonwebtoken.sign({ data: { userId } }, secretSalt, { expiresIn: 60 * 60 })
};

export const verifyJwt = async (token) => {
    return jsonwebtoken.verify(token, secretSalt);
};
