// api/dashboard.ts
import axios from 'axios';
import Cookies from 'js-cookie';

interface DashboardClient {
  id: number;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: string;
  registrationDate: string;
}

export const fetchDashboardClients = async (): Promise<DashboardClient[]> => {
  try {
    const token = Cookies.get('token');

    const response = await axios.get('http://localhost:3333/client-dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.clients;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Erro ao buscar dados do dashboard';

    throw new Error(`Erro ao buscar dados do dashboard: ${message}`);
  }
};
