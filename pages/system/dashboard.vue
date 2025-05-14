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
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Quantidade de Clientes por Tipo</v-card-title>
          <v-card-text>
            <PieChartReport :chart-data="clientTypeData" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Evolução de Novos Clientes (Últimos Meses)</v-card-title>
          <v-card-text>
            <LineChartReport :chart-data="newClientsEvolutionData" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import PieChartReport from '@/components/PieChartReport.vue';
import LineChartReport from '@/components/LineChartReport.vue';

const newClientsEvolutionData = ref({
  labels: ['Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan'],
  datasets: [
    {
      label: 'Novos Clientes',
      borderColor: '#4CAF50',
      data: [25, 30, 28, 35, 40, 45],
      fill: false
    }
  ]
});

definePageMeta({
  layout: 'system'
});
</script>