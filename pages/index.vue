<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="5">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="text-h5">Cadastre sua Imobiliária</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="cadastrarImobiliaria">
              <v-text-field
                v-model="nomeImobiliaria"
                label="Nome da Imobiliária"
                required
              ></v-text-field>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="cnpj"
                    label="CNPJ"
                    v-mask="'##.###.###/####-##'"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="telefone"
                    label="Telefone"
                    v-mask="'(##) #####-####'"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="endereco"
                label="Endereço"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              ></v-text-field>

              <v-btn
                color="primary"
                block
                class="mt-6"
                type="submit"
              >
                Solicitar Cadastro
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
import { createClient } from '../api/creat-client';  // Importando a função para fazer a requisição

// Definição das variáveis para os dados do formulário
const nomeImobiliaria = ref('');
const cnpj = ref('');
const endereco = ref('');
const telefone = ref('');
const email = ref('');

// Função para enviar os dados para a API
const cadastrarImobiliaria = async () => {
  // Prepara os dados do formulário
  const payload = {
    name: nomeImobiliaria.value,
    cnpj: cnpj.value,
    address: endereco.value,
    phone: telefone.value,
    email: email.value,
  };

  try {
    // Chama a função createClient para enviar os dados
    const response = await createClient(payload); 

    // Exibe uma mensagem de sucesso caso o cadastro tenha sido realizado com sucesso
    alert('Cadastro realizado com sucesso!');
    console.log('Resposta do cadastro:', response);
  } catch (error) {
    // Em caso de erro, exibe a mensagem de erro
    alert(`Erro: ${error.message}`);
    console.error('Erro no cadastro:', error);
  }
};
</script>
