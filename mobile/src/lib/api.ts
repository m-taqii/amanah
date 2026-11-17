import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.108:5000").trim().replace(/\/+$/, "");

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically attach stored JWT token to all outgoing requests
api.interceptors.request.use(async (config) => {
    try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch {
        // Ignore secure store read failure
    }
    return config;
});

function isEmail(identifier: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(identifier);
}

async function login(identifier: string | null, password: string, role?: string): Promise<any> {
    if (!identifier || !identifier.trim()) {
        throw new Error("Email or phone number is required");
    }

    const trimmed = identifier.trim();
    const isEmailId = isEmail(trimmed);

    const response = await api.post("/user/login", {
        identifier: trimmed,
        email: isEmailId ? trimmed.toLowerCase() : null,
        phone: !isEmailId ? trimmed : null,
        password: password,
        role: role,
    });
    return response.data;
}

async function register(
    name: string,
    email: string,
    phone: string,
    password: string,
    role: string,
    address: string
): Promise<any> {
    if (!email && !phone) {
        throw new Error("Email or phone number is required");
    }

    const response = await api.post("/user/register", {
        name: name.trim(),
        email: email ? email.trim().toLowerCase() : null,
        phone: phone ? phone.trim() : null,
        password: password,
        role: role,
        address: address,
    });
    return response.data;
}

export { login, register };
export default api;
