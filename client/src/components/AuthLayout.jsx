import {useState} from 'react';
import {RegisterForm} from "./RegisterForm/RegisterForm.jsx";
import {LoginForm} from "./LoginForm/LoginForm.jsx";
import {useSelector} from "react-redux";
import {selectIsRefreshing} from "../redux/auth/selectors.js";

export const AuthLayout = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const isRefreshing = useSelector(selectIsRefreshing);

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };

    return (
        <>
            {!isRefreshing ? (
                    <b>Request in progress...</b>
                ) : (
                <div className="auth-layout">
                    <div id="container" className={isSignUpActive ? "container right-panel-active" : "container"}>
                        <div className="form-container sign-up-container">
                            <RegisterForm />
                        </div>
                        <div className="form-container sign-in-container">
                            <LoginForm />
                        </div>
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>Enter your personal details and start journey with us</p>
                                    <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};