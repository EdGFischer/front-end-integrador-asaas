import axios from 'axios';
import Cookies from 'js-cookie'; 

interface Client {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  address: string;
  phone: string;
  registrationDate: string;
}

interface FetchClientsResponse {
  clients: Client[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const fetchClients = async (page: number = 1): Promise<FetchClientsResponse> => {
  try {
    
    const token = Cookies.get('token');
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado.');
    }


    const headers =  { Authorization: `Bearer ${token}` };

    console.log('Cabeçalhos enviados:', headers);

    const response = await axios.get(`http://localhost:3333/client`, {
      params: { page },
      headers,
    });

    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Erro ao buscar clientes';

    throw new Error(`Erro ao buscar clientes: ${message}`);
  }
};
