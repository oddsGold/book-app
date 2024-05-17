import {useDispatch, useSelector} from "react-redux";
import {selectError, selectLoading} from "../../redux/contacts/selectors.js";
import {useEffect} from "react";
import {fetchContacts} from "../../redux/contacts/operations.js";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import ContactList from "../../components/ContactList/ContactList.jsx";

function ContactsPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div className="app">
            <h1>Phonebook</h1>
            <ContactForm/>
            <SearchBox/>

            {isLoading && !error && <b>Request in progress...</b>}
            {error && <h2>An error occurred: {error}</h2>}
            <ContactList/>
        </div>
    )
}

export default ContactsPage;