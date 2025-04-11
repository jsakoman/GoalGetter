import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

const incomesCollection = collection(db, 'incomes');

export async function fetchAll() {
  const querySnapshot = await getDocs(incomesCollection);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function addToCollection(name, amount) {
  await addDoc(incomesCollection, { name, amount });
}

export async function deleteFromCollection(id) {
  await deleteDoc(doc(db, 'incomes', id));
}

export async function updateInCollection(id, name, amount) {
  const docRef = doc(db, 'incomes', id);
  await updateDoc(docRef, { name, amount });
}