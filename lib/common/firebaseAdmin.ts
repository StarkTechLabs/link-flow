import * as firebaseAdmin from "firebase-admin"

import config from "@/lib/common/config"

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(config.firebaseAdmin),
  })
}

export const ensureApp = () => {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(config.firebaseAdmin),
    })
  }
}

export default firebaseAdmin
