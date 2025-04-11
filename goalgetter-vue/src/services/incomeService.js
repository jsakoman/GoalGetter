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

export async function fetchFunc() {
  const querySnapshot = await getDocs(incomesCollection);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function addFunc(name, amount) {
  await addDoc(incomesCollection, { name, amount });
}

export async function deleteFunc(id) {
  await deleteDoc(doc(db, 'incomes', id));
}

export async function updateFunc(id, name, amount) {
  const docRef = doc(db, 'incomes', id);
  await updateDoc(docRef, { name, amount });
}