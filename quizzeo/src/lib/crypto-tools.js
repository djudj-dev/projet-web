"use server"
import jsonwebtoken from 'jsonwebtoken';
import { SALT } from './env';
import sha256 from 'crypto-js/sha256';

export const generateApiKey = () => {  
  const hash = sha256(Date.now().toString()).toString()

  return hash;
}

export const generateJwt = async (userId) => {
    return await jsonwebtoken.sign({ data: { userId } }, SALT, { expiresIn: 60 * 60 })
};

export const verifyJwt = async (token) => {
    return jsonwebtoken.verify(token, SALT);
};

export const getUserIdFromBearer = async (bearer) => { 
    const jwt = bearer.substring(7, bearer.length);  
    const  { data: { userId }} = await verifyJwt(jwt); 

    return userId
}