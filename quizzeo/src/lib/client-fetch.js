"use client"
const API_URL = "http://localhost:3000/api/"

const fetchApi = async(apiRoute, method, body = undefined) => {
    const response = await fetch(API_URL + apiRoute, {
        method,
        mode: "no-cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if(!response.ok) {
        throw new Error('Error with api fetching')
    }
    const data = await response.json();
    
    return data;
}

export const getApi = (apiRoute) => fetchApi(apiRoute, "GET");
export const postApi = (apiRoute, body) => fetchApi(apiRoute, "POST", body);
