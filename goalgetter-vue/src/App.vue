<template>
  <div>
    <Header />
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Header,
    Navbar
  }
}
</script>

<style>
</style>