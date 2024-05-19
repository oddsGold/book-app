import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const INSTANCE = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/api",
    // timeout: 2500,
});

// Utility to add JWT
const setAuthHeader = (token) => {
    console.log(token)
    INSTANCE.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
    INSTANCE.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const res = await INSTANCE.post('/registration', credentials);
            // After successful registration, add the token to the HTTP header
            setAuthHeader(res.data.token);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, {rejectWithValue}) => {
        try {
            const res = await INSTANCE.post('/login', credentials);
            // After successful login, add the token to the HTTP header
            setAuthHeader(res.data.token);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logOut = createAsyncThunk('auth/logout', async (_, {rejectWithValue}) => {
    try {
        await INSTANCE.post('/logout');
        // After a successful logout, remove the token from the HTTP header
        clearAuthHeader();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;

        if (persistedToken === null) {
            // If there is no token, exit without performing any request
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }

        try {
            const res = await INSTANCE.get('/refresh');
            return res.data;
        }catch (error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);