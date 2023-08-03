import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import nookies from "nookies"
import constants from "@/lib/common/constants"
import getApp from "@/lib/common/firebase"

const signInWithEmail = async (req, res) => {
  const { email, password } = req.body

  try {
    const auth = getAuth(getApp())
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    const idToken = await user.getIdToken()
    nookies.set({ req, res }, constants.cookie.authTokenName, idToken, constants.cookie.options)
    return res.json({ email: user.email, id: user.uid })
  } catch (err) {
    const errorCode = err.code
    const errorMessage = err.message
    console.error("failed to sign in user with email", { errorCode, errorMessage })
    return res.status(errorCode ? 400 : 500).json({ errorCode, message: errorMessage })
  }
}

export default signInWithEmail
