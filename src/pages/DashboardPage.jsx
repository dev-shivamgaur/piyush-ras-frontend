import React from 'react'
import { Dashboard } from '../components'
import SEO from '../components/SEO'

const DashboardPage = () => {
  return (
    <>
      <SEO
        title="डैशबोर्ड"
        description="Piyush Ras एडमिन डैशबोर्ड"
        path="/dashboard"
        noindex
      />
      <Dashboard />
    </>
  )
}

export default DashboardPage
