<template>
  <div class="header">
    <img src="@/assets/logo.png" alt="Goal Getter Logo" class="logo" />
    <h1>GOAL GETTER</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
/* Scoped styles for Header component */
.logo {
  width: 150px;
  margin-bottom: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}
</style>