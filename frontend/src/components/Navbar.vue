<!-- Navbar component -->
<template>
  <nav class="navbar">
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/tasks">Tasks</router-link>
    <router-link to="/profile">Profile</router-link>
    <button @click="$emit('logout')">Logout</button>
  </nav>
</template>
<script>
export default {
  name: 'Navbar'
};
</script>
