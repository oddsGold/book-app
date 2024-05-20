import {useDispatch, useSelector} from "react-redux";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import React, {useEffect} from "react";
import LibraryForm from "../../components/LibraryForm/LibraryForm.jsx";
import {selectBooksByStatus, selectError, selectLoading} from "../../redux/books/selectors.js";
import {fetchBooks} from "../../redux/books/operations.js";

function LibraryPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const books = useSelector(selectBooksByStatus);
    console.log(books)

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    return (
        <>
            <DocumentTitle>Library page</DocumentTitle>
            <div className="library-page">
                <LibraryForm />

                {isLoading && !error && <b>Request in progress...</b>}
                {error && <h2>An error occurred: {error}</h2>}
                <div>
                    {books.map((book) => (
                        <div key={book.status}>
                            <h2>{book.status}</h2>
                            <ul>
                                {book.books.map((book) => (
                                    <li key={book.id}>{book.title}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default LibraryPage;