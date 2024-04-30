'use client'

export const localJwt = {
    get: () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('jwt')
        }
    },
    set: (jwt) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('jwt', jwt)
       }
    },
    remove: (jwt) => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('jwt')
       }
    }
};
