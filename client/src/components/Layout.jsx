import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from './AppBar/AppBar';
import {ToastContainer} from "react-toastify";

export const Layout = ({ children }) => {
    return (
        <div className="layout">
            <ToastContainer />
            <AppBar />
            <Suspense fallback={null}>{children}</Suspense>
        </div>
    );
};