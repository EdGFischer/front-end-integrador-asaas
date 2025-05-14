import axios from 'axios';

export const deleteClient = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:3333/client/${id}`);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Erro ao deletar cliente';
    throw new Error(`Erro na atualização: ${message}`);
  }
};