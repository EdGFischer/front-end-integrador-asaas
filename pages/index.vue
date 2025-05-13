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
              ></v-text-field>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="cnpj"
                    label="CNPJ"
                    :rules="[rules.required, rules.cnpj]"
                    v-mask="'cpfcnpj'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="telefone"
                    label="Telefone"
                    :rules="[rules.required, rules.telefone]"
                    v-mask="'(00) 00000-0000'"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="endereco"
                label="Endereço"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :rules="[rules.required, rules.email]"
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
import { ref } from 'vue'
import { createClient } from '@/api/create-client'
import { useRouter } from 'vue-router'

const nomeImobiliaria = ref('')
const cnpj = ref('')
const endereco = ref('')
const telefone = ref('')
const email = ref('')

const formRef = ref(null)
const router = useRouter()

const rules = {
  required: v => !!v || 'Campo obrigatório',
  email: v => /.+@.+\..+/.test(v) || 'Email inválido',
  cnpj: v => /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/.test(v) || 'CNPJ inválido',
  telefone: v => /^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/.test(v) || 'Telefone inválido'
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

    alert('Cadastro realizado com sucesso!')
  } catch (err) {
    alert(err.message)
  }
}
</script>
