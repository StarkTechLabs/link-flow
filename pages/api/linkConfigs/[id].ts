// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import { deleteById } from "@/lib/services/linkConfig"
import auth from "@/lib/services/auth"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const user = await auth.getUserWithContext({ req, res } as any)
  if (!user) {
    res.redirect("/auth/signin")
    return
  }

  if (req.method === "DELETE") {
    await deleteById(req.query.id as string, user.id || "")
    res.status(200).send("ok")
    return
  }

  res.status(405).send("Method not found")
}
