import config from "@/lib/common/config"
import {
  getDocument,
  createDocument,
  updateDocument,
  fetchDocuments,
  deleteDocument,
} from "@/lib/services/datastore"

export interface Destination {
  platform: "web" | "ios" | "android"
  value: string
}
export interface SeoConfig {
  title: string
  description: string
  media: string
}

export interface LinkConfig {
  id: string
  meta: Record<string, any>
  name: string
  seo: SeoConfig
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
    ...doc.data(),
    id: doc.id,
    meta: {
      ...doc.get("meta"),
      updatedAt: doc.updateTime?.toDate().toISOString(),
      createdAt: doc.createTime?.toDate().toISOString(),
    },
  }
  return docData
}

export const deleteById = async (id: string, userId: string): Promise<void> => {
  console.log("deleting for doc", { id, userId })
  const docId = buildCollectionDocPath(userId, id)
  await deleteDocument(docId)
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
      return {
        ...doc.data(),
        id: doc.id,
        meta: {
          ...doc.get("meta"),
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
