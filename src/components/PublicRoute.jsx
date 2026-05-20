import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {NotFoundPage} from './index';
import { Outlet } from 'react-router-dom';
import { checkUserAvailability } from '../services/user.service';


const PublicRoute = () => {
    const authData = useSelector((state) => state.auth.userData);
    const [saveStatus, setSaveStatus] = useState(false);
    useEffect(() => {
      const fetchUserStatus = async() => {
        const res = await checkUserAvailability();
        if (res.message === "Ok") {
          setSaveStatus(true);
        }
      }
      fetchUserStatus();
    }, [])
    

  
    if (authData && saveStatus) {
       return <NotFoundPage/> 
    }
  return <Outlet/>
}

export default PublicRoute