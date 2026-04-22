import React from 'react'
import { useSelector } from 'react-redux';
import {NotFoundPage} from './index';
import { Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const authData = useSelector((state) => state.auth.userData);
  
    if (authData) {
       return <NotFoundPage/> 
    }
  return <Outlet/>
}

export default PublicRoute