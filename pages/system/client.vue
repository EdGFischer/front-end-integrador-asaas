<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card>
          <v-card-title>
            <v-toolbar-title>Listagem de Clientes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openCreateModal">
              <v-icon prepend-icon="mdi-plus"></v-icon>
              Novo Cliente
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="clients"
              class="elevation-1"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  size="small"
                  class="mr-2"
                  @click="openEditModal(item.raw)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  size="small"
                  @click="openDeleteConfirmation(item.raw)"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="isClientModalOpen" persistent width="500">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>{{ editingClient ? 'Editar Cliente' : 'Novo Cliente' }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="clientForm" @submit.prevent="saveClient">
            <v-text-field
              v-model="clientData.nome"
              label="Nome"
              required
            ></v-text-field>
            <v-text-field
              v-model="clientData.email"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="clientData.telefone"
              label="Telefone"
              v-mask="'(##) #####-####'"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="closeClientModal">Cancelar</v-btn>
          <v-btn color="primary" type="submit" :loading="isSaving" form="clientForm">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isDeleteConfirmationOpen" persistent width="400">
      <v-card>
        <v-card-title class="headline">Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir o cliente "{{ deletingClient?.nome }}"?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="closeDeleteConfirmation">Cancelar</v-btn>
          <v-btn color="error" :loading="isDeleting" @click="deleteClient">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify'; // Importe a função toast
import 'vue3-toastify/dist/index.css'; // Importe os estilos CSS
import { vMask } from 'vue-the-mask';

const clients = ref([]);
const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'Email', key: 'email' },
  { title: 'Telefone', key: 'telefone' },
  { title: 'Ações', key: 'actions', sortable: false },
]);

const isClientModalOpen = ref(false);
const isDeleteConfirmationOpen = ref(false);

const clientData = ref({ id: null, nome: '', email: '', telefone: '' });
const editingClient = ref(null);

const deletingClient = ref(null);

const isSaving = ref(false);
const isDeleting = ref(false);

const fetchClients = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  clients.value = [
    { id: 1, nome: 'João Silva', email: 'joao.silva@email.com', telefone: '(11) 98765-4321' },
    { id: 2, nome: 'Maria Souza', email: 'maria.souza@email.com', telefone: '(21) 91234-5678' },
    { id: 3, nome: 'Pedro Oliveira', email: 'pedro.oliveira@email.com', telefone: '(31) 99876-5432' },
  ];
};

const openCreateModal = () => {
  editingClient.value = null;
  clientData.value = { id: null, nome: '', email: '', telefone: '' };
  isClientModalOpen.value = true;
};

const openEditModal = (client) => {
  editingClient.value = client;
  clientData.value = { ...client };
  isClientModalOpen.value = true;
};

const closeClientModal = () => {
  isClientModalOpen.value = false;
  editingClient.value = null;
  clientData.value = { id: null, nome: '', email: '', telefone: '' };
};

const saveClient = async () => {
  if (!clientData.value.nome || !clientData.value.email) {
    toast.error('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  isSaving.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (editingClient.value) {
    const index = clients.value.findIndex(c => c.id === editingClient.value.id);
    if (index !== -1) {
      clients.value[index] = { ...clientData.value, id: editingClient.value.id };
      toast.success(`Cliente "${clientData.value.nome}" atualizado com sucesso!`);
    }
  } else {
    const newId = clients.value.length > 0 ? Math.max(...clients.value.map(c => c.id)) + 1 : 1;
    clients.value.push({ ...clientData.value, id: newId });
    toast.success(`Cliente "${clientData.value.nome}" criado com sucesso!`);
  }

  closeClientModal();
  isSaving.value = false;
};

const openDeleteConfirmation = (client) => {
  deletingClient.value = client;
  isDeleteConfirmationOpen.value = true;
};

const closeDeleteConfirmation = () => {
  isDeleteConfirmationOpen.value = false;
  deletingClient.value = null;
};

const deleteClient = async () => {
  if (!deletingClient.value) return;

  isDeleting.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));

  clients.value = clients.value.filter(c => c.id !== deletingClient.value.id);
  toast.success(`Cliente "${deletingClient.value.nome}" excluído com sucesso!`);

  closeDeleteConfirmation();
  isDeleting.value = false;
};

onMounted(() => {
  fetchClients();
});

definePageMeta({
  layout: 'system'
});
</script>