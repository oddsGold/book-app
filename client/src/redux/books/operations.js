import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from "react-toastify";


const INSTANCE = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/api",
    timeout: 2500,
});

const acceptFunction = () => {
    toast.success(`Book has been added`, {
        position: "bottom-left"
    });
}

// Utility to add JWT
const setAuthHeader = (token) => {
    INSTANCE.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
    INSTANCE.defaults.headers.common.Authorization = '';
};

export const addBook = createAsyncThunk(
    'books/addBook',
    async ( { title, author, publish_year, pages_total }, thunkAPI) => {
        const state = thunkAPI.getState();
        const email = state.auth.user.email;
        const persistedToken = state.auth.token;

        try {
            setAuthHeader(persistedToken);
            const response = await INSTANCE.post('/book',  { email, title, author, publish_year, pages_total });
            acceptFunction();
            return response.data;
        }catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchBooks = createAsyncThunk(
    'books/fetchAll',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;

        try{
            setAuthHeader(persistedToken);
            const response = await INSTANCE.get('/books');
            return response.data;
        }catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
