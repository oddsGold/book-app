import React, {useState} from "react";
import contact from "./Contact.module.css"
import {useDispatch} from "react-redux";
import {deleteContact} from "../../redux/contacts/operations.js";
import EditContactForm from "../ContactForm/EditContactForm.jsx";

const Contact = ({id, name, number}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteContact(id));
        setDeleteModal(false);
    };

    const handleClickModal = (e) => {
        e.stopPropagation();
    };

    return(
        <div className={contact["contact"]}>
            {!isEditing ? (
                <div className={contact["contact-info"]}>
                    <div className={contact["contact-info-row"]}>
                        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt={name} />
                        <p>{name}</p>
                    </div>
                    <div className={contact["contact-info-row"]}>
                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/phone-icon.png" alt={number} />
                        <p>{number}</p>
                    </div>
                    <div className={contact["contact-btn"]}>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => setDeleteModal(true)}>Delete</button>
                    </div>
                </div>
            ) : (
                <EditContactForm id={id} name={name} number={number} onCancel={() => setIsEditing(false)} />
            )}
            {deleteModal && (
                <div className={contact["modal"]} onClick={() => setDeleteModal(false)}>
                    <div className={contact["modal-content"]} onClick={handleClickModal}>
                        <p>Are you sure you want to delete this contact?</p>
                        <div>
                            <button onClick={handleDelete}>Yes</button>
                            <button onClick={() => setDeleteModal(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Contact;