<template>
  <div>
    <h2>Task List</h2>
    <!-- Filter/Search UI -->
    <input v-model="search" placeholder="Search task..." />
    <select v-model="status">
      <option value="">All</option>
      <option value="todo">Todo</option>
      <option value="doing">Doing</option>
      <option value="done">Done</option>
    </select>
    <button @click="fetchTasks">Filter</button>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <strong>{{ task.title }}</strong> - {{ task.status }}
        <router-link :to="`/tasks/${task.id}/edit`">Edit</router-link>
      </li>
    </ul>
    <router-link to="/tasks/new">Add Task</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'TaskList',
  setup() {
    const tasks = ref([]);
    const search = ref('');
    const status = ref('');

    const fetchTasks = async () => {
      const params = {};
      if (search.value) params.search = search.value;
      if (status.value) params.status = status.value;
      const res = await axios.get('/api/tasks', { params });
      tasks.value = res.data;
    };

    fetchTasks();

    return { tasks, search, status, fetchTasks };
  }
};
</script>
