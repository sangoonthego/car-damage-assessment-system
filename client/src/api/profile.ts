const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BASE_URL) || 'http://localhost:3636';

import axios from "axios";

export interface UserProfile {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    company?: string;
    address?: string;
    avatar?: string;
    birthday?: string;
    bio?: string;
}

// create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// add interceptor to auto set token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// get profile
export const fetchProfile = async (): Promise<UserProfile> => {
    try {
        const { data } = await api.get<UserProfile>("/api/profile/me");
        return data;
    } catch (error: any) {
        console.error("Fetch Profile Failed:" ,error.response?.data || error.message);
        throw new Error("Failed to fetch Profile!!!");
    }
}

// update profile
export const updateProfile = async (profile: UserProfile): Promise<UserProfile> => {
    try {
        const { data } = await api.put<UserProfile>("/api/profile");
        return data;
    } catch (error: any) {
        console.log("Update Profile Failed:", error.response?.data || error.message);
        throw new Error("Failed to Update Profile");
    }
};


// export const fetchProfile = async (): Promise<UserProfile> => {
//     const token = localStorage.getItem("token");
//     const response = await fetch(`${API_BASE_URL}/api/profile/me`, {
//         headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//         },
//     });
//     if (!response.ok) throw new Error("Failed to fetch Profile");
//     return await response.json();
// }

// export const updateProfile = async (profile: UserProfile) => {
//     const token = localStorage.getItem("token");
//     const { data } =
// }