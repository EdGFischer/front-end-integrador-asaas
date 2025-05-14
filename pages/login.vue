<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="text-h5">Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                required
              ></v-text-field>

              <v-btn
                color="primary"
                block
                class="mt-4"
                type="submit"
              >
                Entrar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginApi } from '@/api/create-session';
import { useCookie } from '#app';
import { useToast } from 'vue-toastification'


const toast = useToast()


const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const data = await loginApi(email.value, password.value);

    const token = useCookie('token'); 
    token.value = data.access_token;

    router.push('system/client');
  } catch (error) {    
    toast.error(error.message || 'Email ou senha incorretos')
  }
};
</script>