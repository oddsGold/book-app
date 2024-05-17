import {useDispatch} from 'react-redux';
import {login} from '../../redux/auth/operations';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import css from './LoginForm.module.css';

export const LoginForm = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object({
                    email: Yup.string().email('Must be a valid email').matches(/^(?!.*@[^,]*,)/).required('Email is required').max(255),
                    password: Yup.string().min(3, 'Password must be at least 3 characters').max(255, 'Password must be at most 255 characters').required('Password is required'),
                })}
                onSubmit={(values) => {
                    const {email, password} = values;
                    dispatch(login({
                        email,
                        password
                    }))
                }}
            >
                <Form className={css.form}>
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
                    <button type="submit">Log In</button>
                </Form>
            </Formik>
        </div>

    );
};
