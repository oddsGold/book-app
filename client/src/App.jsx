import "reset-css/reset.css";
import './App.css'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectIsRefreshing} from "./redux/auth/selectors.js";
import {refreshUser} from "./redux/auth/operations.js";
import {Layout} from "./components/Layout.jsx";
import { Route, Routes } from 'react-router-dom';
import {RestrictedRoute} from "./components/RestrictedRoute.jsx";
import {PrivateRoute} from "./components/PrivateRoute.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ContactsPage from "./pages/ContactsPage/ContactsPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import "react-toastify/dist/ReactToastify.css"

function App() {
    const dispatch = useDispatch();
    const { isRefreshing } = useSelector(selectIsRefreshing);

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    return isRefreshing ? (
        <b>Refreshing user...</b>
    ) : (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/register"
                    element={
                        <RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
                    }
                />
                <Route
                    path="/contacts"
                    element={
                        <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
                    }
                />
            </Routes>
        </Layout>
    );
}

export default App
