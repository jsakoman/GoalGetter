<template>
  <div class="table-container">    
    <!-- Add New Expense Form (shown when Add Expense button is clicked) -->
    <div v-if="showAddForm">
      <h3 class="form-heading">Add new Expense</h3>
      <input v-model="name" class="table-input" placeholder="Name (e.g. Rent)" />
      <input v-model.number="amount" class="table-input" type="number" placeholder="Amount (e.g., 1000)" />
      <button @click="addExpense" class="table-button add-button">Add</button>
      <button @click="cancelAdd" class="table-button cancel-button">Cancel</button>
    </div>

    <!-- Edit Expense Form (shown when editing) -->
    <div v-if="editing">
      <h4 class="form-heading">Edit Expense</h4>
      <input v-model="editName" class="table-input" placeholder="Edit Name" />
      <input v-model.number="editAmount" class="table-input" type="number" placeholder="Edit Amount" />
      <button @click="updateExpense" class="table-button save-button">Save</button>
      <button @click="cancelEdit" class="table-button cancel-button">Cancel</button>
    </div>

    <!-- List of Expenses -->
    <h3 class="form-heading">Expense List</h3>
    <ul class="table-list">
      <li v-for="item in expenses" :key="item.id" class="table-item">
        {{ item.name }} - {{ item.amount }} CHF
        <button @click="deleteExpense(item.id)" class="table-button delete-button">Delete</button>
        <button @click="startEditing(item)" class="table-button edit-button">Edit</button>
      </li>
    </ul>

        <!-- Add Expense button -->
        <button @click="toggleAddForm" class="table-button add-button toggle-button">+ (Add new)</button>
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
  name: 'ExpenseForm',
  data() {
    return {
      name: '',
      amount: 0,
      expenses: [],
      editing: false,
      editId: null,
      editName: '',
      editAmount: 0,
      showAddForm: false // Controls the visibility of Add New Expense form
    };
  },
  methods: {
    async loadExpenses() {
      this.expenses = await fetchAll('expenses');
    },
    async addExpense() {
      if (!this.name || !this.amount) return;
      await addToCollection('expenses', { name: this.name, amount: this.amount });
      this.name = '';
      this.amount = 0;
      this.showAddForm = false; // Hide the add form after adding
      this.loadExpenses();
    },
    async deleteExpense(id) {
      await deleteFromCollection('expenses', id);
      this.loadExpenses();
    },
    startEditing(item) {
      this.editing = true;
      this.editId = item.id;
      this.editName = item.name;
      this.editAmount = item.amount;
      this.showAddForm = false; // Hide the Add form when editing
    },
    async updateExpense() {
      await updateInCollection('expenses', this.editId, { name: this.editName, amount: this.editAmount });
      this.cancelEdit();
      this.loadExpenses();
    },
    cancelEdit() {
      this.editing = false;
      this.editId = null;
      this.editName = '';
      this.editAmount = 0;
    },
    cancelAdd() {
      this.name = '';
      this.amount = 0;
      this.showAddForm = false; // Hide add new form when "Cancel"
    },
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
      this.editing = false; // Hide edit form when adding new expenses
    }
  },
  mounted() {
    this.loadExpenses();
  }
};
</script>