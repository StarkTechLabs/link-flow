
import auth from "lib/services/auth"

export default async function handler (req, res) {
  const user = await auth.getUserWithContext({ req, res })
  res.status(200).json(user)
}
