import React from 'react'
import { SignUp } from '../components'
import { Helmet } from "react-helmet-async";

const SignUpPage = () => {
  return (
    <div>
      <Helmet>
        <title>Piyush Ras - Signup</title>
        <meta name="description" content="Best Hindi poetry platform" />
      </Helmet>
        <SignUp/>
    </div>
  )
}

export default SignUpPage