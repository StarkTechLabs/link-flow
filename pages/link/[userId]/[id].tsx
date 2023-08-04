import { GetServerSideProps } from "next"
import Head from "next/head"
import Error from "next/error"

import { LinkConfig, fetchById } from "@/lib/services/linkConfig"


interface LinkProps {
  data: LinkConfig | null | undefined
}

const LinkPage = ({ data }: LinkProps): JSX.Element => {
  if (!data) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{data?.seo?.title || "Link Config"}</title>
        <meta name="description" content={data?.seo?.description || "Link Config"} />
      </Head>
      <p>{data?.seo?.title || "Link Config"}</p>
      <p>Todo: redirect</p>
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
