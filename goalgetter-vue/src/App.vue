<template>
  <div>
    <h1>GoalGetter – Income Tracker</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import IncomeForm from './components/IncomeForm.vue';

export default {
  components: {
    IncomeForm,
  },
}
</script>