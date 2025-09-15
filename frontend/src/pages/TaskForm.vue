<template>
  <div>
    <h2>{{ isEdit ? 'Edit Task' : 'Add Task' }}</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="title" placeholder="Title" required />
      <textarea v-model="description" placeholder="Description"></textarea>
      <input v-model="deadline" type="date" />
      <select v-model="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select v-model="status">
        <option value="todo">Todo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      <input v-model="tags" placeholder="Tags (comma separated)" />
      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'TaskForm',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isEdit = !!route.params.id;
    const title = ref('');
    const description = ref('');
    const deadline = ref('');
    const priority = ref('medium');
    const status = ref('todo');
    const tags = ref('');

    onMounted(async () => {
      if (isEdit) {
        const res = await axios.get(`/api/tasks/${route.params.id}`);
        const t = res.data;
        title.value = t.title;
        description.value = t.description;
        deadline.value = t.deadline;
        priority.value = t.priority;
        status.value = t.status;
        tags.value = t.tags ? t.tags.join(',') : '';
      }
    });

    const handleSubmit = async () => {
      const payload = {
        title: title.value,
        description: description.value,
        deadline: deadline.value,
        priority: priority.value,
        status: status.value,
        tags: tags.value.split(',').map(s => s.trim()).filter(Boolean)
      };
      if (isEdit) {
        await axios.put(`/api/tasks/${route.params.id}`, payload);
      } else {
        await axios.post('/api/tasks', payload);
      }
      router.push('/tasks');
    };

    return { isEdit, title, description, deadline, priority, status, tags, handleSubmit };
  }
};
</script>
