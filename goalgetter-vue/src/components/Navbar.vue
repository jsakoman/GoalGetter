<template>
    <nav class="navbar">
      <router-link to="/budgeting">Budgeting</router-link>
      <router-link to="/planning">Planning</router-link>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar'
    }
</script>

<style scoped>
.navbar {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
}

.navbar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.navbar a.router-link-exact-active {
  color: #42b983;
}
</style>