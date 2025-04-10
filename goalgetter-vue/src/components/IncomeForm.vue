<template>
    <div>
      <h2>Add Income</h2>
      <input v-model="name" placeholder="Name (e.g., Salary)" />
      <input v-model.number="amount" type="number" placeholder="Amount (e.g., 4500)" />
      <button @click="addIncome">Add</button>
  
      <h3>Income List</h3>
      <ul>
        <li v-for="item in incomes" :key="item.id">
          {{ item.name }} - {{ item.amount }} CHF
          <button @click="deleteIncome(item.id)">Delete</button>
          <button @click="startEditing(item)">Edit</button>
        </li>
      </ul>
  
      <div v-if="editing">
        <h4>Edit Income</h4>
        <input v-model="editName" placeholder="Edit Name" />
        <input v-model.number="editAmount" type="number" placeholder="Edit Amount" />
        <button @click="updateIncome">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '../firebase';
  import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
  } from 'firebase/firestore';
  
  export default {
    name: 'IncomeForm',
    data() {
      return {
        name: '',
        amount: 0,
        incomes: [],
        editing: false,
        editId: null,
        editName: '',
        editAmount: 0
      };
    },
    methods: {
      async fetchIncomes() {
        const querySnapshot = await getDocs(collection(db, 'incomes'));
        this.incomes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      },
      async addIncome() {
        if (!this.name || !this.amount) return;
        await addDoc(collection(db, 'incomes'), {
          name: this.name,
          amount: this.amount
        });
        this.name = '';
        this.amount = 0;
        this.fetchIncomes();
      },
      async deleteIncome(id) {
        await deleteDoc(doc(db, 'incomes', id));
        this.fetchIncomes();
      },
      startEditing(item) {
        this.editing = true;
        this.editId = item.id;
        this.editName = item.name;
        this.editAmount = item.amount;
      },
      async updateIncome() {
        const docRef = doc(db, 'incomes', this.editId);
        await updateDoc(docRef, {
          name: this.editName,
          amount: this.editAmount
        });
        this.cancelEdit();
        this.fetchIncomes();
      },
      cancelEdit() {
        this.editing = false;
        this.editId = null;
        this.editName = '';
        this.editAmount = 0;
      }
    },
    mounted() {
      this.fetchIncomes();
    }
  };
  </script>