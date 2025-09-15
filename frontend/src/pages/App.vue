
<template>
  <div>
    <Login v-if="!isLoggedIn && showLogin" @login-success="onLoginSuccess" @show-register="showRegister = true; showLogin = false" />
    <Register v-if="!isLoggedIn && showRegister" @register-success="onRegisterSuccess" @show-login="showLogin = true; showRegister = false" />
    <div v-if="isLoggedIn">
      <h1>Project Manager</h1>
      <p>Ứng dụng Quản lý Dự án</p>
      <!-- Nội dung trang chủ -->
    </div>
  </div>
</template>

<script>
import Login from './Login.vue';
import Register from './Register.vue';

export default {
  name: 'App',
  components: { Login, Register },
  data() {
    return {
      isLoggedIn: false,
      showLogin: true,
      showRegister: false
    };
  },
  methods: {
    onLoginSuccess() {
      this.isLoggedIn = true;
    },
    onRegisterSuccess() {
      this.showLogin = true;
      this.showRegister = false;
    }
  }
};
</script>

<style>
/* ...existing code... */
</style>
