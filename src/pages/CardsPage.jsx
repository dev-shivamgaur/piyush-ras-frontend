import React from 'react'
import { Cards } from '../components'
import SEO from '../components/SEO'

const CardsPage = () => {
  return (
    <>
      <SEO
        title="All Kavita"
        description="कविता, लंबी कविता, शायरी और त्योहार विशेष — Piyush Ras पर सभी हिंदी रचनाएँ एक जगह पढ़ें।"
        path="/allKavita"
      />
      <Cards />
    </>
  )
}

export default CardsPage
