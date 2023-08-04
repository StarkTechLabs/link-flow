import { GetServerSideProps } from "next"
import Head from "next/head"
import dynamic from "next/dynamic"
import Error from "next/error"

const PlatformRedirect = dynamic(() => import("@/lib/components/PlatformRedirect"), {
  ssr: false,
})

import { LinkConfig, fetchById } from "@/lib/services/linkConfig"


interface LinkProps {
  data: LinkConfig | null | undefined
}

const LinkPage = ({ data }: LinkProps): JSX.Element => {
  if (!data) {
    return <Error statusCode={404} />
  }

  const title = data?.seo?.title || "Link Flow Config"
  const desc = data?.seo?.description || "Link Flow Config"
  const imgSrc = data?.seo?.media || ""
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />

        <meta name="description" content={desc} />
        <meta property="og:description" content={desc} />

        <meta property="og:image" content={imgSrc} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={imgSrc} />
      </Head>
      <p>{data?.seo?.title || "Link Config"}</p>
      <PlatformRedirect destinations={data?.destinations || []} />
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const docId = ctx.query?.id as string
  const userId = ctx.query?.userId as string

  if (docId) {
    const result = (await fetchById(docId, userId)) || null

    return { props: { data: result, shouldEmbed: true } }
  }

  return { props: { data: null } }
}

export default LinkPage
