<template>
  <nav class="navbar">
    <router-link to="/budgeting" class="nav-link">Budgeting</router-link>
    <router-link to="/planning" class="nav-link">Planning</router-link>
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
  gap: 40px;
  justify-content: center;
  padding: 10px 0;
  background-color: #333; /* Dark background color */
  border-radius: 8px; /* Rounded corners for the navbar */
}

.nav-link {
  text-decoration: none;
  color: #f4f4f4;
  font-weight: bold;
  font-size: 1.1em;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link:hover {
  background-color: #42b983; /* Greenish hover effect */
  color: white; /* Text turns white when hovered */
}

.navbar a.router-link-exact-active {
  color: #42b983; /* Active link color */
}

.navbar a.router-link-exact-active:hover {
  background-color: #333; /* Keep dark background for active link when hovered */
  color: #42b983; /* Keep active link color */
}
</style>