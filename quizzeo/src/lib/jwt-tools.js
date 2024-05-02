import jsonwebtoken from 'jsonwebtoken';
import { SALT } from './env';

export const generateJwt = async (userId) => {
    return await jsonwebtoken.sign({ data: { userId } }, SALT, { expiresIn: 60 * 60 })
};

export const verifyJwt = async (token) => {
    return jsonwebtoken.verify(token, SALT);
};
