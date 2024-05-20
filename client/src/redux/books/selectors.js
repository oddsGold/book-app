import {createSelector} from "@reduxjs/toolkit";

export const selectBooks  = (state) => state.books.items;

export const selectLoading = (state) => state.books.loading;

export const selectError = (state) => state.books.error;

export const selectBooksByStatus = createSelector(
    [selectBooks],
    (books) => {
        const groupedBooks = [];

        books.forEach((book) => {
            const statusName = book.Status.name;
            const existingGroup = groupedBooks.find((group) => group.status === statusName);
            if (!existingGroup) {
                groupedBooks.push({
                    status: statusName,
                    books: [book],
                });
            } else {
                existingGroup.books.push(book);
            }
        });

        return groupedBooks;
    }
);
