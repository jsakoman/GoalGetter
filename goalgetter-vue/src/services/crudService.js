import { db } from '../firebase'; 
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export async function fetchAll(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function addToCollection(collectionName, data) {
  await addDoc(collection(db, collectionName), data);
}

export async function deleteFromCollection(collectionName, id) {
  await deleteDoc(doc(db, collectionName, id));
}

export async function updateInCollection(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}