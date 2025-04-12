<template>
  <div class="table-container">
    <!-- "+" Button to show the Add Income Form -->
    <button @click="toggleAddForm" class="table-button add-button toggle-button">+</button>
    
    <!-- Add New Income Form (shown when Add Income button is clicked) -->
    <div v-if="showAddForm">
      <h3 class="form-heading">Add new Income</h3>
      <input v-model="name" class="table-input" placeholder="Name (e.g., Salary)" />
      <input v-model.number="amount" class="table-input" type="number" placeholder="Amount (e.g., 4500)" />
      <button @click="addIncome" class="table-button add-button">Add</button>
    </div>

    <!-- Edit Income Form (shown when editing) -->
    <div v-if="editing">
      <h4 class="form-heading">Edit Income</h4>
      <input v-model="editName" class="table-input" placeholder="Edit Name" />
      <input v-model.number="editAmount" class="table-input" type="number" placeholder="Edit Amount" />
      <button @click="updateIncome" class="table-button save-button">Save</button>
      <button @click="cancelEdit" class="table-button cancel-button">Cancel</button>
    </div>

    <!-- List of Incomes -->
    <h3 class="form-heading">Income List</h3>
    <ul class="table-list">
      <li v-for="item in incomes" :key="item.id" class="table-item">
        {{ item.name }} - {{ item.amount }} CHF
        <button @click="deleteIncome(item.id)" class="table-button delete-button">Delete</button>
        <button @click="startEditing(item)" class="table-button edit-button">Edit</button>
      </li>
    </ul>
  </div>
</template>
  
<script>
import {
    fetchAll,
    addToCollection,
    deleteFromCollection,
    updateInCollection
} from '../../services/crudService';

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
      editAmount: 0,
      showAddForm: false // Controls the visibility of Add New Income form
    };
  },
  methods: {
    async loadIncomes() {
      this.incomes = await fetchAll('incomes');
    },
    async addIncome() {
      if (!this.name || !this.amount) return;
      await addToCollection('incomes', { name: this.name, amount: this.amount });
      this.name = '';
      this.amount = 0;
      this.showAddForm = false; // Hide the add form after adding
      this.loadIncomes();
    },
    async deleteIncome(id) {
      await deleteFromCollection('incomes', id);
      this.loadIncomes();
    },
    startEditing(item) {
      this.editing = true;
      this.editId = item.id;
      this.editName = item.name;
      this.editAmount = item.amount;
      this.showAddForm = false; // Hide the Add form when editing
    },
    async updateIncome() {
      await updateInCollection('incomes', this.editId, { name: this.editName, amount: this.editAmount });
      this.cancelEdit();
      this.loadIncomes();
    },
    cancelEdit() {
      this.editing = false;
      this.editId = null;
      this.editName = '';
      this.editAmount = 0;
    },
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
      this.editing = false; // Hide edit form when adding new income
    }
  },
  mounted() {
    this.loadIncomes();
  }
};
</script>