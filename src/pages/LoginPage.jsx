import React from 'react'
import { Login } from '../components'
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  return (
    <div className=''>
      <Helmet>
        <title>Piyush Ras - Login</title>
        <meta name="description" content="Best Hindi poetry platform" />
      </Helmet>
        <Login/>
    </div>
  )
}

export default LoginPage