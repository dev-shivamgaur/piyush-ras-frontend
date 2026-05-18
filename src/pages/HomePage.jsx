import React from 'react'
import { Home } from '../components'
import SEO, { buildWebsiteSchema } from '../components/SEO'
import { DEFAULT_DESCRIPTION } from '../config/seo.config'

function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description={DEFAULT_DESCRIPTION}
        path="/"
        jsonLd={buildWebsiteSchema()}
      />
      <div className=''>
        <Home/>
      </div>
    </>
  )
}

export default HomePage
