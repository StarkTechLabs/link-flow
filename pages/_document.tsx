import { Html, Head, Main, NextScript } from "next/document"
import GA from "@/lib/components/GA"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Linx Flow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <GA />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
