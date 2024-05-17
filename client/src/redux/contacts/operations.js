import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from "react-toastify";

const errorFunction = () => {
    toast.error(`The contact has been deleted`, {
        position: "bottom-left"
    });
}
const acceptFunction = () => {
    toast.success(`Contact has been added`, {
        position: "bottom-left"
    });
}

const INSTANCE = axios.create({
    baseURL: "https://connections-api.herokuapp.com"
});

// Utility to add JWT
const setAuthHeader = (token) => {
    INSTANCE.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
    INSTANCE.defaults.headers.common.Authorization = '';
};

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {

        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;

        try {
            setAuthHeader(persistedToken);
            const response = await INSTANCE.get('/contacts');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async ( { name, number }, {rejectWithValue}) => {
        try {
            const response = await INSTANCE.post('/contacts', { name, number });
            acceptFunction();
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, {rejectWithValue}) => {
        try {
            const response = await INSTANCE.delete(`/contacts/${contactId}`);
            errorFunction();
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const updateContact = createAsyncThunk(
    'contacts/updateContact',
    async ({ contactId, name, number }, {rejectWithValue}) => {
        try {
            const response = await INSTANCE.patch(`/contacts/${contactId}`, { name, number });
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);