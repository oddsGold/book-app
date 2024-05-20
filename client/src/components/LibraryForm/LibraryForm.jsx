import React from "react";
import {useDispatch} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {addBook} from "../../redux/books/operations.js";
import ContactForm from "../ContactForm/ContactForm.jsx";

const LibraryForm = () => {
    const dispatch = useDispatch();

    return (
        <div className="library-form">
            <div className="library-form-row">
                <Formik
                    initialValues={{
                        title: '',
                        author: '',
                        publish_year: '',
                        pages_total: ''
                    }}
                    onSubmit={(values, {resetForm}) => {
                        const {title, author, publish_year, pages_total} = values;
                        dispatch(addBook({title, author, publish_year, pages_total}))
                        resetForm();
                    }}
                >
                    <Form>
                        <div>
                            <label htmlFor="title">The title of the book</label>
                            <Field type="text" id="title" name="title" placeholder="..."/>
                        </div>
                        <div>
                            <label htmlFor="author">The author of the book</label>
                            <Field type="text" id="author" name="author" placeholder="..."/>
                        </div>
                        <div>
                            <label htmlFor="publish_year">The year of publication</label>
                            <Field type="number" id="publish_year" name="publish_year" placeholder="..."/>
                        </div>
                        <div>
                            <label htmlFor="pages_total">Number of pages</label>
                            <Field type="number" id="pages_total" name="pages_total" placeholder="..."/>
                        </div>
                        <button type="submit">Add</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default LibraryForm;