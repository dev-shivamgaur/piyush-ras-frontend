import React from 'react'
import { Dashboard } from '../components'
import { Helmet } from "react-helmet-async";

const DashboardPage = () => {
  return (
    
    <div>
      <Helmet>
        <title>Piyush Ras - Dashboard</title>
        <meta name="description" content="Best Hindi poetry platform" />
      </Helmet>
        <Dashboard/>
    </div>
  )
}

export default DashboardPage