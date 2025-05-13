<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-container>
        <v-row align="center">
          <v-col cols="auto">
            <v-toolbar-title>Sistema Interno Imobia</v-toolbar-title>
          </v-col>

          <v-spacer></v-spacer>

          <v-col cols="auto" class="d-flex align-center">
            <v-btn
              color="white"
              variant="text"
              to="/system/dashboard"
              class="mr-2"
            >
              Dashboard
            </v-btn>
            <v-btn
              color="white"
              variant="text"
              to="/system/client"
              class="mr-2"
            >
              Clientes
            </v-btn>
            <v-btn
              icon="mdi-logout"
              color="error"
              @click="logout"
            ></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>