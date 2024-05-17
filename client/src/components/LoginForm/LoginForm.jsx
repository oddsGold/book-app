import {useDispatch} from 'react-redux';
import {login} from '../../redux/auth/operations';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

export const LoginForm = () => {
    const dispatch = useDispatch();

    return (
        <>
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
                <Form>
                    <>
                        <Field type="email" name="email" id="email" placeholder="Email"/>
                        <ErrorMessage name="email" className="error-message" component="div" />
                    </>
                    <>
                        <Field type="password" name="password" id="password" placeholder="Password"/>
                        <ErrorMessage name="password" className="error-message" component="div"/>
                    </>
                    <button type="submit">Log In</button>
                </Form>
            </Formik>
        </>

    );
};
