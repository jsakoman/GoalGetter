<template>
  <div class="container">

    <!-- INCOMES -->
    <div class="tab">
      <div class="total-container">
        <!-- Clickable Total Income -->
        <div class="total-amount clickable" @click="showIncomeForm = !showIncomeForm">
          <h3>Total Income: {{ totalIncome }} CHF</h3>
        </div>
      </div>

      <!-- Income Form -->
      <IncomeForm v-if="showIncomeForm" />
    </div>

    <!-- EXPENSES -->
    <div class="tab">
      <div class="total-container">
        <!-- Clickable Total Expense -->
        <div class="total-amount clickable" @click="showExpenseForm = !showExpenseForm">
          <h3>Total Expenses: {{ totalExpense }} CHF</h3>
        </div>
      </div>

      <!-- Expense Form -->
      <ExpenseForm v-if="showExpenseForm" />
    </div>

  </div>
</template>

<script>
import IncomeForm from './Budgeting/IncomeForm.vue';
import ExpenseForm from './Budgeting/ExpenseForm.vue';
import { fetchAll } from '../services/crudService';

export default {
  name: 'Budgeting',
  components: {
    IncomeForm,
    ExpenseForm
  },
  data() {
    return {
      showIncomeForm: false, // Default not showing the form
      incomes: [], // Income data will be fetched here
      showExpenseForm: false, // Default not showing the form
      expenses: [] // Expense data will be fetched here
    };
  },
  computed: {
    // Compute the total amount by summing all the items amounts
    totalIncome() {
      return this.incomes.reduce((sum, income) => sum + income.amount, 0);
    },
    totalExpense() {
      return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
  },
  methods: {
    async loadIncomes() {
      this.incomes = await fetchAll('incomes');
    },
    async loadExpenses() {
      this.expenses = await fetchAll('expenses');
    }
  },
  mounted() {
    this.loadIncomes(),
    this.loadExpenses();
  }
};
</script>