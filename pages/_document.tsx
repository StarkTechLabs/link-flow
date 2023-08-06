import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Link Flow - Routing your users to their preferred platform. A Firebase Dynamic Link alternative." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#202124" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
