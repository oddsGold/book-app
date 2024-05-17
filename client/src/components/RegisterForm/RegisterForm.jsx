import { useDispatch } from 'react-redux';
import {register} from '../../redux/auth/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './RegisterForm.module.css';

export const RegisterForm = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <Formik
                initialValues={{name: '', email: '', password: ''}}
                validationSchema={Yup.object({
                    name: Yup.string().required('Name is required').min(3).max(255),
                    email: Yup.string().email('Must be a valid email').matches(/^(?!.*@[^,]*,)/).required('Email is required').max(255),
                    password: Yup.string().min(3, 'Password must be at least 3 characters').max(255, 'Password must be at most 255 characters').required('Password is required'),
                })}
                onSubmit={(values) => {
                    const {name, email, password} = values;
                    dispatch(register({
                        name,
                        email,
                        password
                    }))
                }}
            >
                <Form className={css.form}>
                    <div>
                        <label className={css.label} htmlFor="name">Username</label>
                        <Field type="name" name="name" id="name"/>
                        <ErrorMessage name="name" component="div" className={css["error-message"]}/>
                    </div>
                    <div>
                        <label className={css.label} htmlFor="email">Email</label>
                        <Field type="email" name="email" id="email"/>
                        <ErrorMessage name="email" component="div" className={css["error-message"]}/>
                    </div>
                    <div>
                        <label className={css.label} htmlFor="password">Password</label>
                        <Field type="password" name="password" id="password"/>
                        <ErrorMessage name="password" component="div" className={css["error-message"]}/>
                    </div>
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    );
};
