import React from 'react'
import { About } from '../components'
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  return (
    <div>
      <Helmet>
        <title>Piyush Ras - About</title>
        <meta name="description" content="Best Hindi poetry platform" />
      </Helmet>
        <About/>
    </div>
  )
}

export default AboutPage