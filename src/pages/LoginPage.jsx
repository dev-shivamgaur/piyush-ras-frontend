import React from 'react'
import { Login } from '../components'
import SEO from '../components/SEO'

const LoginPage = () => {
  return (
    <>
      <SEO
        title="Login"
        description="Piyush Ras पर अपने खाते में लॉगिन करें।"
        path="/login"
        noindex
      />
      <Login />
    </>
  )
}

export default LoginPage
