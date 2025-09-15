<template>
  <div>
    <h2>Profile</h2>
    <!-- Thông tin user, có thể chỉnh sửa -->
    <div>
      <label>Username</label>
      <input v-model="username" />
      <label>Email</label>
      <input v-model="email" />
      <button @click="updateProfile">Update</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Profile',
  setup() {
    const username = ref('');
    const email = ref('');
    // TODO: Lấy thông tin user từ API
    const updateProfile = () => {
      // TODO: Gọi API cập nhật thông tin user
      alert('Profile updated!');
    };
    return { username, email, updateProfile };
  }
};
</script>
