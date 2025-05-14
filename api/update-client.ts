import axios from 'axios';

interface UpdateClientPayload {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export const updateClient = async (payload: UpdateClientPayload) => {
  try {
    const response = await axios.put(`http://localhost:3333/client/${payload.id}`, payload);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Erro ao atualizar cliente';
    throw new Error(`Erro na atualização: ${message}`);
  }
};