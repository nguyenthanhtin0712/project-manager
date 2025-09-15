<!-- TaskCard component, hiển thị 1 task -->
<template>
  <div class="task-card">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <div>Deadline: {{ task.deadline }}</div>
    <div>Priority: {{ task.priority }}</div>
    <div>Status: {{ task.status }}</div>
    <div>Tags: <span v-for="tag in task.tags" :key="tag">{{ tag }}</span></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'TaskCard',
  props: ['task']
};
</script>
