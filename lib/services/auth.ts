import { NextPageContext } from "next"
import nookies from "nookies"

import firebaseAdmin from "@/lib/common/firebaseAdmin"
import constants from "@/lib/common/constants"
import config from "@/lib/common/config"
import { getDocument, updateDocument } from "@/lib/services/datastore"

export interface User {
  email?: string
  id?: string
}

export interface UserDetail {
  name?: string
  id?: string
  meta: Record<string, any>
}

const getUserWithContext = async (
  ctx: NextPageContext
): Promise<User | null> => {
  const cookies = nookies.get(ctx)
  const token = cookies[constants.cookie.authTokenName]

  if (!token) {
    return null
  }

  try {
    const decoded = await firebaseAdmin.auth().verifyIdToken(token)
    const { uid, email } = decoded
    return {
      email,
      id: uid,
    } as User
  } catch (err: any) {
    if (err.code === "auth/id-token-expired") {
      // refresh token
      // return refreshUserToken(token)
      console.warn("user token expired")
      // remove expired token
      nookies.destroy(
        ctx,
        constants.cookie.authTokenName,
        constants.cookie.options
      )
    } else {
      console.error("failed to decode user token", err)
    }

    return null
  }
}

const fetchUserDetails = async (userId: string): Promise<UserDetail | null> => {
  console.log("looking for user detail", { userId })
  const docId = `${config.datastore.basePath}/${userId}`
  const doc = await getDocument(docId)

  const data: UserDetail = {
    id: doc.id,
    name: doc.get("name") || null,
    meta: {
      ...doc.get("meta"),
      updatedAt: doc.updateTime?.toDate().toISOString() || "",
      createdAt: doc.createTime?.toDate().toISOString() || "",
    },
  }
  return data
}

const updateUserDetails = async (
  userId: string,
  data: Record<string, any>,
  meta: Record<string, any>
): Promise<UserDetail | null> => {
  const collection = `${config.datastore.basePath}/${userId}`
  const existing = await fetchUserDetails(userId)

  await updateDocument(collection, {
    ...existing,
    ...data,
    meta: {
      ...existing?.meta,
      ...meta,
    },
  })
  return fetchUserDetails(userId)
}

const exports = {
  getUserWithContext,
  fetchUserDetails,
  updateUserDetails,
}

export default exports
