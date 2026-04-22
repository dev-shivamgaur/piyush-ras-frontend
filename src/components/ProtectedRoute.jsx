import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
const ProtectedRoute = () => {
    const authData = useSelector((state) => state.auth.userData);
    const location = useLocation();
    if (!authData) {
        return (
            <Navigate
            to = "/login"
            state = {{from: location.pathname}}
            replace
            />
        )
    }

    if (authData.email !==import.meta.env.VITE_ADMIN_EMAIL) {
       return <NotFoundPage/> 
    }
  return <Outlet/>
}

export default ProtectedRoute;