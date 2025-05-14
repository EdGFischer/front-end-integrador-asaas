<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card>
          <v-card-title>
            <v-toolbar-title>Lista de Clientes</v-toolbar-title>
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
              :hide-default-footer="true"
              class="elevation-1"
              @update:page="loadClients(1)"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="small" class="mr-2" @click="openEditModal(item)">
                  mdi-pencil
                </v-icon>
                <v-icon size="small" @click="openDeleteConfirmation(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
             <v-row class="d-flex justify-end mt-4 align-center gap-4">
              <v-btn
                :disabled="!hasPreviousPage"
                @click="goToPreviousPage"
                color="primary"
                variant="outlined"
              >
                Anterior
              </v-btn>

              <span>Página {{ currentPage }}</span>

              <v-btn
                :disabled="!hasNextPage"
                @click="goToNextPage"
                color="primary"
                variant="outlined"
              >
                Próxima
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal de Cliente -->
    <v-dialog v-model="isClientModalOpen" persistent width="500">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>{{ editingClient ? 'Editar Cliente' : 'Novo Cliente' }}</v-toolbar-title>
        </v-toolbar>
        <v-form ref="clientForm" id="clientForm" @submit.prevent="saveClient">
          <v-card-text>
            <v-text-field v-model="clientData.name" label="Nome" required />
            <v-text-field v-model="clientData.email" label="Email" type="email" required />
            <v-text-field
              v-model="clientData.phone"
              label="Telefone"
              v-mask="'(00) 00000-0000'"
              maxlength="15"
              required
            />
            <v-text-field
              v-if="!editingClient"
              v-model="clientData.cnpj"
              label="CNPJ"
              :rules="[rules.required, rules.cnpj]"
              v-mask="'cpfcnpj'"
              maxlength="18"
            />
            <v-text-field v-model="clientData.address" label="Endereço" required />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" @click="closeClientModal">Cancelar</v-btn>
            <v-btn color="primary" type="submit" :loading="isSaving" form="clientForm">Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Confirmação de Exclusão -->
    <v-dialog v-model="isDeleteConfirmationOpen" persistent width="400">
      <v-card>
        <v-card-title class="headline">Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir o cliente "{{ deletingClient?.name }}"?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="closeDeleteConfirmation">Cancelar</v-btn>
          <v-btn color="error" :loading="isDeleting" @click="deleteClientById">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { fetchClients } from '@/api/fetch-client';
import { createClient } from '@/api/create-client';
import { updateClient } from '@/api/update-client';
import { deleteClient } from '@/api/delete-client';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  cnpj?: string;
  address: string;
}

const clients = ref<Client[]>([]);
const headers = ref([
  { title: 'ID', key: 'id', sortable: false },
  { title: 'Nome', key: 'name', sortable: false },
  { title: 'Email', key: 'email', sortable: false },
  { title: 'Telefone', key: 'phone', sortable: false },
  { title: 'Ações', key: 'actions', sortable: false },
]);

const isClientModalOpen = ref(false);
const isDeleteConfirmationOpen = ref(false);

const clientData = ref<Client>({ id: 0, name: '', email: '', phone: '', address: '' });
const editingClient = ref<Client | null>(null);
const deletingClient = ref<Client | null>(null);

const isSaving = ref(false);
const isDeleting = ref(false);

const currentPage = ref(1)
const hasNextPage = ref(false)
const hasPreviousPage = ref(false)

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Email inválido',
  cnpj: (v: string) => {
    const regex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
    return regex.test(v) || 'CNPJ inválido';
  },
};

async function loadClients(page: number) {
  currentPage.value = page ?? 1

  const response = await fetchClients(currentPage.value)
    clients.value = response.clients;

  hasNextPage.value = response.hasNextPage
  hasPreviousPage.value = response.hasPreviousPage
}

function goToNextPage() {
  if (hasNextPage.value) loadClients(currentPage.value + 1)
}

function goToPreviousPage() {
  if (hasPreviousPage.value && currentPage.value > 1)
    loadClients(currentPage.value - 1)
}


const openCreateModal = () => {
  editingClient.value = null;
  clientData.value = { id: 0, name: '', email: '', phone: '', address: '' };
  isClientModalOpen.value = true;
};

const openEditModal = (client: Client) => {
  editingClient.value = client;
  clientData.value = {
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    cnpj: client.cnpj || '',
    address: client.address,
  };
  isClientModalOpen.value = true;
};

const closeClientModal = () => {
  isClientModalOpen.value = false;
  editingClient.value = null;
  clientData.value = { id: 0, name: '', email: '', phone: '', address: '' };
};

const saveClient = async () => {
  if (!clientData.value.name || !clientData.value.email || !clientData.value.phone || !clientData.value.address) {
    toast.error('Preencha todos os campos obrigatórios.');
    return;
  }

  isSaving.value = true;
  try {
    if (editingClient.value) {
      const payload = {
        id: editingClient.value.id,
        name: clientData.value.name,
        email: clientData.value.email,
        phone: clientData.value.phone,
        address: clientData.value.address,
      };

      const response = await updateClient(payload);
      const index = clients.value.findIndex(c => c.id === editingClient.value.id);
      if (index !== -1) {
        clients.value[index] = {
          id: response.id,
          name: response.name,
          email: response.email,
          phone: response.phone,
          address: response.address,
        };
        loadClients(1);
        toast.success(`Cliente "${clientData.value.name}" atualizado com sucesso!`);
      }
    } else {
      const payload = {
        name: clientData.value.name,
        email: clientData.value.email,
        phone: clientData.value.phone,
        cnpj: clientData.value.cnpj || '',
        address: clientData.value.address,
      };
      const response = await createClient(payload);
      clients.value.push({
        id: response.id,
        name: response.name,
        email: response.email,
        phone: response.phone,
        cnpj: response.cnpj,
        address: response.address,
      });
      loadClients(1);
      toast.success(`Cliente "${clientData.value.name}" cadastrado com sucesso!`);
    }
  } catch (error) {
    toast.error('Erro ao salvar cliente.');
    console.error(error);
  } finally {
    closeClientModal();
    isSaving.value = false;
  }
};

const openDeleteConfirmation = (client: Client) => {
  deletingClient.value = client;
  isDeleteConfirmationOpen.value = true;
};

const closeDeleteConfirmation = () => {
  isDeleteConfirmationOpen.value = false;
  deletingClient.value = null;
};

const deleteClientById = async () => {
  if (!deletingClient.value) return;

  isDeleting.value = true;
  try {
    await deleteClient(deletingClient.value.id );
    loadClients(1);
    toast.success(`Cliente "${deletingClient.value.name}" excluído com sucesso!`);
  } catch (error) {
    toast.error('Erro ao excluir cliente.');
    console.error(error);
  } finally {
    closeDeleteConfirmation();
    isDeleting.value = false;
  }
};

onMounted(() => {
  loadClients(currentPage.value)
})

definePageMeta({
  layout: 'system',
});
</script>
