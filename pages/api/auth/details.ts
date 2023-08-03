// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import auth, { UserDetail } from "@/lib/services/auth"

type Data = {
  message: string
  data?: UserDetail
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = await auth.getUserWithContext({ req, res } as any)
  if (!user || !user.id) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Failed to find user" })
  }

  const result = await auth.updateUserDetails(
    user.id,
    {
      ...req.body,
    },
    {
      ip: req.headers["x-forwarded-for"] || "unknown",
    }
  )

  if (result) {
    return res.status(200).json({ data: result, message: "Updated" })
  }

  res.status(500).json({ message: "Failed to create submission document" })
}
