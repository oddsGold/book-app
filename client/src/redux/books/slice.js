import { createSlice } from "@reduxjs/toolkit";
import {addBook, fetchBooks} from "./operations.js";
import {initialState} from "./constants.js";

const handlePending = (state) => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.error.message;
};

const booksSlice = createSlice({
    name: "books",
    initialState: initialState.books,
    extraReducers: (builder) => {
        builder
            .addCase(addBook.pending, handlePending)
            .addCase(addBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addCase(addBook.rejected, handleRejected)

            .addCase(fetchBooks.pending, handlePending)
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(fetchBooks.rejected, handleRejected)
    }
})

export  default booksSlice.reducer;