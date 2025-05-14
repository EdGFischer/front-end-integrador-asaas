<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="5">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="text-h5">Cadastre sua Imobiliária</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="formRef" @submit.prevent="cadastrarImobiliaria">
              <v-text-field
                v-model="nomeImobiliaria"
                label="Nome da Imobiliária"
                :rules="[rules.required]"
              />

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="cnpj"
                    label="CNPJ"
                    :rules="[rules.required, rules.cnpj]"
                    v-mask="'cpfcnpj'"
                    maxlength="18"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="telefone"
                    label="Telefone"
                    :rules="[rules.required, rules.telefone]"
                    v-mask="'(00) 00000-0000'"
                    maxlength="15"
                  />
                </v-col>
              </v-row>

              <v-text-field
                v-model="endereco"
                label="Endereço"
                :rules="[rules.required]"
              />

              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :rules="[rules.required, rules.email]"
              />

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

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { createClient } from '@/api/create-client'

const toast = useToast()

const nomeImobiliaria = ref('')
const cnpj = ref('')
const endereco = ref('')
const telefone = ref('')
const email = ref('')

const formRef = ref()

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Email inválido',
  cnpj: (v: string) => {
    const regex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/
    return regex.test(v) || 'CNPJ inválido'
  },
  telefone: (v: string) => {
    const regex = /^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/
    return regex.test(v) || 'Telefone inválido'
  }
}

const cadastrarImobiliaria = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  try {
    await createClient({
      name: nomeImobiliaria.value,
      cnpj: cnpj.value,
      address: endereco.value,
      phone: telefone.value,
      email: email.value,
    })

    toast.success('Cadastro realizado com sucesso!')
  } catch (err: any) {
    toast.error(err.message || 'Erro ao cadastrar!')
  }
}
</script>
