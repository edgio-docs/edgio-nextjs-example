import Head from 'next/head'

const SEO = ({ meta }) => {
  return (
    <Head>
      <title>{meta['title']}</title>
      <meta property="title" name="title" content={meta['title']} />
      <meta property="description" name="description" content={meta['description']} />
      <meta name="og:url" property="og:url" content={meta['url']} />
      <meta name="og:title" property="og:title" content={meta['title']} />
      <meta name="og:description" property="og:description" content={meta['description']} />
      <meta name="og:image" property="og:image" content={`${meta['url']}/og-image.png`} />
      <meta name="twitter:site" content="@Layer0Deploy" />
      <meta name="twitter:title" content={meta['title']} />
      <meta name="twitter:description" content={meta['description']} />
      <meta name="twitter:image" content={`${meta['url']}/og-image.png`} />
    </Head>
  )
}

export default SEO
