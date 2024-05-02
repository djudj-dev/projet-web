import sha256 from 'crypto-js/sha256';

export const generateApiKey = () => {  
    const hash = sha256(Date.now().toString()).toString()

    return hash;
  }