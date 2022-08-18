import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `* {font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;}`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
      </body>
    </Html>
  )
}
