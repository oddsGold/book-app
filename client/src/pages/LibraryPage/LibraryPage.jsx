import {useDispatch, useSelector} from "react-redux";
import {selectError, selectLoading} from "../../redux/contacts/selectors.js";
import {useEffect} from "react";
import {fetchContacts} from "../../redux/contacts/operations.js";
import ContactList from "../../components/ContactList/ContactList.jsx";
import DocumentTitle from "../../components/DocumentTitle.jsx";

function LibraryPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // useEffect(() => {
    //     dispatch(fetchContacts());
    // }, [dispatch]);

    return (
        <>
            <DocumentTitle>Library page</DocumentTitle>
            <div className="library-page">
                {isLoading && !error && <b>Request in progress...</b>}
                {error && <h2>An error occurred: {error}</h2>}
                <p>LibraryPage</p>
            </div>
        </>
    )
}

export default LibraryPage;