import React from 'react'
import { SignUp } from '../components'
import SEO from '../components/SEO'

const SignUpPage = () => {
  return (
    <>
      <SEO
        title="SignUp"
        description="Piyush Ras पर नया खाता बनाएँ और कविताएँ पसंद करें, बुकमार्क करें।"
        path="/signup"
        noindex
      />
      <SignUp />
    </>
  )
}

export default SignUpPage
