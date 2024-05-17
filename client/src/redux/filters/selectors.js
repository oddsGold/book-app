import {createSelector} from "@reduxjs/toolkit";
import {selectContacts} from "../contacts/selectors.js";

export const selectSearchFilter = state => state.filters.searchValue.toLowerCase();

export const selectFilteredContacts = createSelector(
    [selectSearchFilter, selectContacts],
    (searchValue, contacts) => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchValue) ||
            contact.number.toLowerCase().includes(searchValue)
        );
    }
);