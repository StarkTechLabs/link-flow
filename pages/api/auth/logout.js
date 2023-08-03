import nookies from "nookies"
import { getAuth, signOut } from "firebase/auth"
import getApp from "@/lib/common/firebase"
import constants from "@/lib/common/constants"

const logout = async (req, res) => {
  try {
    nookies.destroy({ req, res }, constants.cookie.authTokenName, constants.cookie.options)
    const auth = getAuth(getApp())
    await signOut(auth)
    res.status(302).redirect("/auth/signin")
  } catch (err) {
    const errorCode = err.code
    const errorMessage = err.message
    console.error("failed to sign in user with email", { errorCode, errorMessage })
    res.status(errorCode).json({ message: errorMessage })
  }
}

export default logout
