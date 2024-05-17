import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../constants.js";

const filtersSlice = createSlice({
    name: "filters",
    initialState: initialState.filters,
    reducers: {
        changeFilter(state, action) {
            state.searchValue = action.payload;
        },
    }
});

export const { changeFilter } = filtersSlice.actions;
export default filtersSlice.reducer;