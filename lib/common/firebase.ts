import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import config from "@/lib/common/config"

const init = () => {
  const apps = getApps()
  if (!apps.length) {
    const app = initializeApp(config.firebase)
    // Initialize Firebase Authentication
    getAuth(app)

    return app
  }
  return getApp()
}

export default init
