<template>
  <div>
    <h2>Dashboard</h2>
    <canvas id="taskChart"></canvas>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'Dashboard',
  setup() {
    onMounted(() => {
      // Dữ liệu mẫu, thay bằng API thực tế
      const data = {
        labels: ['Todo', 'Doing', 'Done'],
        datasets: [{
          label: 'Tasks',
          data: [10, 5, 7],
          backgroundColor: ['#f39c12', '#3498db', '#2ecc71']
        }]
      };
      new Chart(document.getElementById('taskChart'), {
        type: 'bar',
        data,
        options: { responsive: true }
      });
    });
  }
};
</script>
