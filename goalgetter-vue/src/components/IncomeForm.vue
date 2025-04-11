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
  

import {
    fetchAll,
  addToCollection,
  deleteFromCollection,
  updateInCollection
    } from '../services/incomeService';

  
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
      async loadIncomes() {
        this.incomes = await fetchAll();
      },
      async addIncome() {
        if (!this.name || !this.amount) return;
        await addToCollection(this.name, this.amount);
        this.name = '';
        this.amount = 0;
        this.loadIncomes();
      },
      async deleteIncome(id) {
        await deleteFromCollection(id);
        this.loadIncomes();
      },
      startEditing(item) {
        this.editing = true;
        this.editId = item.id;
        this.editName = item.name;
        this.editAmount = item.amount;
      },
      async updateIncome() {
        await updateInCollection(this.editId, this.editName, this.editAmount);
        this.cancelEdit();
        this.loadIncomes();
      },
      cancelEdit() {
        this.editing = false;
        this.editId = null;
        this.editName = '';
        this.editAmount = 0;
      }
    },
    mounted() {
      this.loadIncomes();
    }
  };
  </script>