import Crypto from "node:crypto"

export const generateApiKey = () => {  
    return Crypto
      .randomBytes(25)
      .toString('base64')
      .slice(0, 25)
  }