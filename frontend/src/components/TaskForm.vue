<!-- TaskForm component, dùng cho thêm/sửa task -->
<template>
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
</template>
<script>
export default {
  name: 'TaskForm',
  props: ['isEdit', 'task', 'onSubmit'],
  data() {
    return {
      title: this.task?.title || '',
      description: this.task?.description || '',
      deadline: this.task?.deadline || '',
      priority: this.task?.priority || 'medium',
      status: this.task?.status || 'todo',
      tags: this.task?.tags?.join(',') || ''
    };
  },
  methods: {
    handleSubmit() {
      const payload = {
        title: this.title,
        description: this.description,
        deadline: this.deadline,
        priority: this.priority,
        status: this.status,
        tags: this.tags.split(',').map(s => s.trim()).filter(Boolean)
      };
      this.onSubmit(payload);
    }
  }
};
</script>
