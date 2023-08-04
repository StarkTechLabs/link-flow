// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import { LinkConfig, fetchLinkConfigs, saveLinkConfig } from "@/lib/services/linkConfig"
import auth from "@/lib/services/auth"

type Data = {
  docId?: string
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Array<LinkConfig>>
) {
  const user = await auth.getUserWithContext({ req, res } as any)
  if (!user) {
    res.redirect("/auth/signin")
    return
  }

  if (req.method === "POST") {
    const ipAddress = req.headers["x-forwarded-for"] || "unknown"
    const linkConfig: LinkConfig = {
      id: req.body.id || "",
      name: req.body.name || "",
      destinations: req.body.destinations || [],
      seo: req.body.seo || {},
      meta: { ipAddress }
    }
    const docId = await saveLinkConfig(user?.id || "", linkConfig)

    if (docId) {
      return res.status(201).json({ docId })
    }

    res.status(500).json({ message: "Failed to create submission document" })
  }


  const data = (await fetchLinkConfigs({ userId: user.id || "", limit: 25 })) || []
  if (data) {
    return res.status(200).json(data)
  }
  res.status(500).json({ message: "Failed to fetch resource" })

}
