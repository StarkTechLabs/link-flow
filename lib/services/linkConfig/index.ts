import config from "@/lib/common/config"
import {
  getDocument,
  createDocument,
  updateDocument,
  fetchDocuments,
} from "@/lib/services/datastore"

export interface Destination {
  platform: "web" | "ios" | "android"
  value: string
}

export interface LinkConfig {
  id: string
  meta: Record<string, any>
  name: string
  destinations: Array<Destination>
}


const buildCollectionDocPath = (userId: string, docId?: string): string => {
  const path = `${config.datastore.basePath}/${userId}/configs`
  if (docId) {
    return `${path}/${docId}`
  }
  return path
}

export const saveLinkConfig = async (
  userId: string,
  data: LinkConfig,
): Promise<string> => {
  const collection = buildCollectionDocPath(userId, data.id)
  console.log("saving link config in", collection)
  let docId = undefined
  if (data.id) {
    docId = await updateDocument(collection, data)
  } else {
    const docRef = await createDocument(collection, data)
    docId = docRef.id
  }

  return docId
}

export const fetchById = async (
  id: string,
  userId: string
): Promise<LinkConfig> => {
  console.log("looking for doc", { id, userId })
  const docId = buildCollectionDocPath(userId, id)
  const doc = await getDocument(docId)

  const docData: any = {
    id: doc.id,
    ...doc.data(),
    meta: {
      ...doc.get("meta"),
      updatedAt: doc.updateTime?.toDate().toISOString(),
      createdAt: doc.createTime?.toDate().toISOString(),
    },
  }
  return docData
}

export const fetchLinkConfigs = async ({
  userId,
  limit,
}: {
  userId: string
  limit: number
}): Promise<LinkConfig[]> => {
  try {
    const collection = buildCollectionDocPath(userId)
    console.log("fetching link configs for collection", collection)
    const data = await fetchDocuments(collection, limit)
    return data.docs.map((doc) => {
      const meta = doc.get("meta")
      return {
        id: doc.id,
        ...doc.data(),
        meta: {
          ...meta,
          updatedAt: doc.updateTime.toDate().toISOString(),
          createdAt: doc.createTime.toDate().toISOString(),
        },
      } as LinkConfig
    })
  } catch (err) {
    console.error("failed to fetch link configs", err)
    return []
  }
}
