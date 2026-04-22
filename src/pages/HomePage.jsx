import React from 'react'
import { Home } from '../components'
import { Helmet } from "react-helmet-async";
function HomePage() {
  return (
    <>
    <Helmet>
        <title>Piyush Ras - Home</title>
        <meta name="description" content="Best Hindi poetry platform" />
      </Helmet>
      <div className=''>
      <Home/>
    </div>
</>
    
  )
}

export default HomePage