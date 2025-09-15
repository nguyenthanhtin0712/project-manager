<template>
  <div class="login-bg">
    <div class="login-container">
      <img src="/src/image/vue_logo.png" alt="Logo" class="login-logo" />
      <h2>Sign in to Project Manager</h2>
      <form @submit.prevent="handleLogin">
        <label>Username or email address</label>
        <input v-model="identifier" type="text" required />
        <label>Password</label>
        <input v-model="password" type="password" required />
        <!-- <a href="#" class="forgot">Forgot password?</a> -->
        <button type="submit" class="login-btn">Sign in</button>
      </form>
      <!-- <button class="passkey-btn">Sign in with a passkey</button> -->
      <div class="register-link">
        New to Project Manager? <a href="#" @click.prevent="$emit('show-register')">Create an account</a>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'Login',
  data() {
    return {
      identifier: '', // Có thể là username hoặc email
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await api.post('/auth/login', {
        identifier: this.identifier,
        password: this.password
      });

        // Nếu backend trả token (thành công)
        if (res.data && res.data.token) {
          localStorage.setItem("token", res.data.token);
          this.$emit('login-success'); // Phát sự kiện đăng nhập thành công
          // this.$router.push("/dashboard");
        } else {
          alert("Đăng nhập thất bại: Không có token");
        }
      }
      catch (err) {
        alert("Đăng nhập thất bại: " + (err.response?.data?.error || err.message));
        console.log("Axios error:", err.response);
      }
    }
  }
};
</script>
