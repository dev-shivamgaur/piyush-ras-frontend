import React from 'react'
import { Dashboard } from '../components'
import SEO from '../components/SEO'

const DashboardPage = () => {
  return (
    <>
      <SEO
        title="Dashboard"
        description="Piyush Ras Admin Dashboard"
        path="/dashboard"
        noindex
      />
      <Dashboard />
    </>
  )
}

export default DashboardPage
