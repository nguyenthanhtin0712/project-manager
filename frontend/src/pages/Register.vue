<template>
  <div class="login-bg">
    <div class="login-container">
      <img src="/src/image/vue_logo.png" alt="Logo" class="login-logo" />
      <h2>Create your account</h2>
      <form @submit.prevent="handleRegister">
        <label>Username</label>
        <input v-model="username" type="text" required />
        <label>Email address</label>
        <input v-model="email" type="email" required />
        <label>Password</label>
        <input v-model="password" type="password" required />
        <button type="submit" class="login-btn">Register</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
      <div class="register-link">
        Already have an account? <a href="#" @click.prevent="$emit('show-login')">Sign in</a>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      success: '',
      error: ''
    };
  },
  methods: {
    async handleRegister() {
      this.success = '';
      this.error = '';
      try {
        const res = await api.post('/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        if (res.data && res.data.user) {
          this.success = alert("Đăng ký thành công:");
          this.$emit('register-success');
          this.username = '';
          this.email = '';
          this.password = '';
        } else {
          alert("Đăng ký thất bại: " + (err.response?.data?.error || err.message));
        }
      } catch (err) {
        alert("Đăng ký thất bại: " + (err.response?.data?.error || err.message));
      }
    }
  }
};
</script>
