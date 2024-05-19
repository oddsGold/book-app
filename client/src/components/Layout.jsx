import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import {AppBar} from './AppBar/AppBar';
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {selectIsRefreshing} from "../redux/auth/selectors.js";
import {Loading} from "./LoadingBar/Loading.jsx";

export const Layout = ({children}) => {
    const isRefreshing = useSelector(selectIsRefreshing);

    return (
        <>
            {isRefreshing ? (
                <Loading />
            ) : (
                <div className="layout">
                    <ToastContainer />
                    <AppBar />
                    <Suspense fallback={null}>{children}</Suspense>
                </div>
            )}
        </>
    );
};