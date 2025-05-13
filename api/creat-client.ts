// api/client.ts
import { useFetch } from '#app';  // Nuxt3

interface CreateClientPayload {
  name: string;
  email: string;
  cnpj: string;
  address: string;
  phone: string;
}

// Função para fazer o cadastro do cliente via API
export const createClient = async (payload: CreateClientPayload) => {
  try {
    const response = await useFetch('/api/client', {
      method: 'POST',
      body: payload,
    });

    // Checando se houve algum erro na requisição
    if (response.error.value) {
      throw new Error(response.error.value.data?.message || 'Erro ao cadastrar cliente');
    }

    return response.data;  // Retorna os dados da resposta se o cadastro for bem-sucedido
  } catch (error) {
    throw new Error(`Erro no envio do cadastro: ${error.message}`);
  }
};
