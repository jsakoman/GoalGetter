<template>
  <div class="container">

    <!-- INCOMES -->
    <div class="tab">
      <div class="total-container">
        <!-- Clickable Total Income -->
        <div class="total-amount clickable" @click="showIncomeForm = !showIncomeForm">
          <h3>Incomes: {{ totalIncome }} CHF</h3>
        </div>
      </div>

      <!-- Income Form -->
      <IncomeForm v-if="showIncomeForm" @incomeChanged="loadIncomes" />
    </div>

    <!-- EXPENSES -->
    <div class="tab">
      <div class="total-container">
        <!-- Clickable Total Expense -->
        <div class="total-amount clickable" @click="showExpenseForm = !showExpenseForm">
          <h3>Expenses: {{ totalExpense }} CHF</h3>
        </div>
      </div>

      <!-- Expense Form -->
      <ExpenseForm v-if="showExpenseForm" @expenseChanged="loadExpenses" />
    </div>

    <!-- AVAILABLE BUDGET -->
    <div class="tab available-budget">
      <div class="total-container">
        <div class="total-amount">
          <div class="budget-box" :class="availableBudget >= 0 ? 'positive' : 'negative'">
            <h3>Available Budget: {{ availableBudget }} CHF</h3>
          </div>
        </div>
      </div>
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
    totalIncome() {
      return this.incomes.reduce((sum, income) => sum + income.amount, 0);
    },
    totalExpense() {
      return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    },
    availableBudget() {
      return this.totalIncome - this.totalExpense;
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

<style scoped>
  .budget-box {
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    margin-top: 1rem;
    font-size: 1.2rem;
  }

  .positive {
    background-color: #e0f7e9;
    color: #2e7d32;
  }

  .negative {
    background-color: #ffe6e6;
    color: #c62828;
  }
</style>