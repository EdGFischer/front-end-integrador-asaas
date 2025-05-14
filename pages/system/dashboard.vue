<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5">
            Dashboards
          </v-card-title>
          <v-card-text>
            Visualização da quantidade de clientes por tipo e da evolução de novos clientes.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>Evolução de Novos Clientes (Últimos 5 Meses)</v-card-title>
          <v-card-text>
            <LineChartReport :chart-data="newClientsEvolutionData" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchDashboardClients } from '@/api/dashboard';
import LineChartReport from '@/components/LineChartReport.vue';
import { format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const getLastFiveMonths = () => {
  return Array.from({ length: 5 }, (_, i) => {
    const date = subMonths(new Date(), 4 - i);
    return format(date, 'MMM', { locale: ptBR });
  });
};

const newClientsEvolutionData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: 'Novos Clientes',
      borderColor: '#4CAF50',
      data: [] as number[],
      fill: false,
    },
  ],
});

onMounted(async () => {
  try {
    const clients = await fetchDashboardClients();

    const monthlyCounts: Record<string, number> = {};

    const months = getLastFiveMonths();

    months.forEach((month) => {
      monthlyCounts[month] = 0;
    });

    clients.forEach((client) => {
      const date = new Date(client.registrationDate);
      const month = format(date, 'MMM', { locale: ptBR });

      if (monthlyCounts[month] !== undefined) {
        monthlyCounts[month]++;
      }
    });

    newClientsEvolutionData.value.labels = months;
    newClientsEvolutionData.value.datasets[0].data = months.map(
      (month) => monthlyCounts[month]
    );
  } catch (error) {
    console.error(error);
  }
});

definePageMeta({
  layout: 'system',
});
</script>
