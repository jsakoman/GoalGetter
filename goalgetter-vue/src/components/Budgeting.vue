<template>
  <div class="container">
    <div class="total-income-container">
      <!-- Display Total Income -->
      <div class="total-income">
        <h3>Total Income: {{ totalIncome }} CHF</h3>
      </div>

      <!-- Button to toggle Income Form on the right -->
      <button @click="showIncomeForm = !showIncomeForm" class="toggle-button">
        {{ showIncomeForm ? 'Hide Income Form' : 'Incomes' }}
      </button>
    </div>

    <!-- Income Form -->
    <IncomeForm v-if="showIncomeForm" />
  </div>
</template>

<script>
import IncomeForm from './Budgeting/IncomeForm.vue';
import { fetchAll } from '../services/crudService';

export default {
  name: 'Budgeting',
  components: {
    IncomeForm
  },
  data() {
    return {
      showIncomeForm: false, // Default not showing the form
      incomes: [] // Income data will be fetched here
    };
  },
  computed: {
    // Compute the total income by summing all the income amounts
    totalIncome() {
      return this.incomes.reduce((sum, income) => sum + income.amount, 0);
    }
  },
  methods: {
    async loadIncomes() {
      this.incomes = await fetchAll('incomes');
    }
  },
  mounted() {
    this.loadIncomes();
  }
};
</script>