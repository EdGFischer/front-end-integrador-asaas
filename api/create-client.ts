// api/create-client.ts
import axios from 'axios';

interface CreateClientPayload {
  name: string;
  email: string;
  cnpj: string;
  address: string;
  phone: string;
}

export const createClient = async (payload: CreateClientPayload) => {
  try {
    const response = await axios.post('http://localhost:3333/client', payload)

    return response.data; 
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Erro ao cadastrar cliente';

    throw new Error(`Erro no envio do cadastro: ${message}`);
  }
};
