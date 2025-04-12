<template>
    <div>
      <h2>BUDGETING</h2>

      <button @click="showIncomeForm = !showIncomeForm">
        {{ showIncomeForm ? 'Hide Income Form' : 'Incomes' }}
      </button>
      <IncomeForm v-if="showIncomeForm" />
    </div>
  </template>
  
  <script>
  import IncomeForm from './IncomeForm.vue';
  
  export default {
    name: 'Budgeting',
    components: {
      IncomeForm
    },
    data() {
      return {
        showIncomeForm: false, //default not showing the form
      };
    },
  }
  </script>