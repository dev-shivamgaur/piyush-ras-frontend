import React from 'react'
import { About } from '../components'
import SEO from '../components/SEO'
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from '../config/seo.config'

const AboutPage = () => {
  return (
    <div>
      <SEO
        title="About"
        description="पियूष गौड़ द्वारा Piyush Ras — भक्ति, देशप्रेम और समाज पर हिंदी कविताएँ। लेखक और मंच के बारे में जानें।"
        path="/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: AUTHOR_NAME,
          url: `${SITE_URL}/about`,
          worksFor: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
        }}
      />
      <About/>
    </div>
  )
}

export default AboutPage
