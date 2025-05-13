<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { defineProps } from 'vue';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  chartOptions: {
    type: Object,
    default: () => ({ responsive: true })
  }
});

const chartCanvas = ref(null);
let chartInstance = null;

watch(() => props.chartData, (newChartData) => {
  if (chartInstance) {
    chartInstance.data = newChartData;
    chartInstance.update();
  } else {
    createChart();
  }
}, { deep: true });

watch(() => props.chartOptions, (newChartOptions) => {
  if (chartInstance) {
    chartInstance.options = newChartOptions;
    chartInstance.update();
  } else {
    createChart();
  }
}, { deep: true });

onMounted(() => {
  createChart();
});

const createChart = () => {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: props.chartData,
      options: props.chartOptions
    });
  }
};

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>