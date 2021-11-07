import Head from 'next/head'

const SEO = ({ title, description, image, url }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="title" name="title" content={title} />
      <meta property="description" name="description" content={description} />
      <meta name="og:url" property="og:url" content={url} />
      <meta name="og:title" property="og:title" content={title} />
      <meta name="og:description" property="og:description" content={description} />
      <meta name="og:image" property="og:image" content={`${image}`} />
      <meta name="twitter:site" content="@Layer0Deploy" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${image}`} />
    </Head>
  )
}

export default SEO
