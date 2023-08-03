import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import nookies from "nookies"
import constants from "@/lib/common/constants"
import getApp from "@/lib/common/firebase"
import appAuth from "@/lib/services/auth"


const registerWithEmail = async (req, res) => {
  const { email, password } = req.body

  try {
    const auth = getAuth(getApp())
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    const idToken = await user.getIdToken()
    nookies.set({ req, res }, constants.cookie.authTokenName, idToken, constants.cookie.options)
    await appAuth.updateUserDetails(user.uid, { name: user.displayName, photoUrl: user.photoURL }, { ip: req.headers["x-forwarded-for"] || "unknown" })
    return res.json({ email: user.email, id: user.uid })
  } catch (err) {
    const errorCode = err.code
    const errorMessage = err.message
    console.error("failed to register user with email", { errorCode, errorMessage })
    return res.status(errorCode ? 400 : 500).json({ errorCode, message: errorMessage })
  }
}

export default registerWithEmail
