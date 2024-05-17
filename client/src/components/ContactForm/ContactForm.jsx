import React from "react";
import contactForm from "./ContactForm.module.css"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {addContact} from "../../redux/contacts/operations.js";

const ContactForm = () => {

    const dispatch = useDispatch();

    return(
        <div className={contactForm["contactForm"]}>
            <Formik
                initialValues={{ name: '', number: '' }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Required').min(3, 'Мінімальна кількість символів - 3').max(50, 'Максимальна кількість символів - 50'),
                    number: Yup.string().required('Required').min(3, 'Мінімальна кількість символів - 3').max(50, 'Максимальна кількість символів - 50'),
                })}
                onSubmit={(values, { resetForm }) => {
                    const { name, number } = values;
                    dispatch(addContact({ name, number }));
                    resetForm();
                }}
            >
                <Form className={contactForm["form"]}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field type="text" id="name" name="name" />
                        <ErrorMessage name="name" component="div"  className={contactForm["error-message"]} />
                    </div>
                    <div>
                        <label htmlFor="number">Number</label>
                        <Field type="text" id="number" name="number" />
                        <ErrorMessage name="number" component="div" className={contactForm["error-message"]} />
                    </div>
                    <button type="submit">Add Contact</button>
                </Form>
            </Formik>
        </div>
    )
}

export default ContactForm;