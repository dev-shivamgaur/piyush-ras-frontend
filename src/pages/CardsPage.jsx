import React from 'react'
import { Cards } from '../components'
import { Helmet } from "react-helmet-async";

const CardsPage = () => {
  <Helmet>
        <title>Piyush Ras - All Poetries</title>
        <meta name="description" content="Best Hindi poetry platform" />
      </Helmet>
  return (
    <div><Cards/></div>
  )
}

export default CardsPage