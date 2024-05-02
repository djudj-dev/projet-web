"use client"
import { API_URL } from './env';

const fetchApi = async(apiRoute, method, body = undefined, jwt = undefined) => {

    const headers = {
        'Content-Type': 'application/json',    
    }

    if (jwt) {
        headers['Authorization'] = `Bearer ${jwt}`;
        console.log("auth", headers)
    }

    const fetchPayload = {
        method,
        withCredentials: true,
        credentials: 'include',
        headers,
    }
    
    body && (fetchPayload.body = JSON.stringify(body));

    const response = await fetch(API_URL + apiRoute, fetchPayload)

    if(!response.ok) {
        throw new Error('Error with api fetching')
    }

    const data = await response.json();
    
    return data;
}

export const getApi = (apiRoute) => fetchApi(apiRoute, "GET");
export const postApi = (apiRoute, body) => fetchApi(apiRoute, "POST", body);
export const getAuthApi = (apiRoute, jwt) => fetchApi(apiRoute, "GET", undefined, jwt);
export const postAuthApi = (apiRoute, body, jwt) => fetchApi(apiRoute, "POST", body, jwt);