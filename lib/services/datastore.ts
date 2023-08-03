import {
  getFirestore,
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot,
  DocumentReference,
} from "firebase-admin/firestore"

import getApp from "@/lib/common/firebase"
import { ensureApp } from "@/lib/common/firebaseAdmin"

getApp()
ensureApp()

export const getDocument = async (
  docId: string
): Promise<DocumentSnapshot<DocumentData>> => {
  const firestore = getFirestore()
  const document = firestore.doc(docId)

  const doc = await document.get()
  return doc
}

export const updateDocument = async (
  docId: string,
  data: any,
  existing: boolean = true
): Promise<string> => {
  const firestore = getFirestore()

  await firestore.doc(docId).set(data)
  return docId
}

export const createDocument = async (
  collectionPath: string,
  data: DocumentData
): Promise<DocumentReference<DocumentData>> => {
  const firestore = getFirestore()
  const collection = firestore.collection(collectionPath)
  const result = await collection.add(data)
  return result
}

export const fetchDocuments = async (
  collectionPath: string,
  limit: number
): Promise<QuerySnapshot<DocumentData>> => {
  const firestore = getFirestore()
  const collection = await firestore
    .collection(collectionPath)
    .limit(limit)
    .get()
  return collection
}
