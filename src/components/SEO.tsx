import { Helmet } from 'react-helmet-async'
import { siteConfig } from '../data/siteConfig'

interface SEOProps {
  title: string
  description: string
  ogImage?: string
  path?: string
}

export default function SEO({ title, description, ogImage, path = '' }: SEOProps) {
  const fullTitle = `${title} | ${siteConfig.name}`
  const url = `${siteConfig.siteUrl}${path}`
  const image = ogImage || `${siteConfig.siteUrl}/images/og-default.jpg`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteConfig.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
