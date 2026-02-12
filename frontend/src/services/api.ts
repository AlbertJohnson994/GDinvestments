import axios from 'axios';
import { Investment, InvestmentRequest, Summary, AssetType } from '../types/investment';

// Usar proxy do Vite em desenvolvimento, ou URL direta em produção
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'http://localhost:8080/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const investmentService = {
  // Listar todos os investimentos
  getAll: async (type?: AssetType): Promise<Investment[]> => {
    const params = type ? { type } : {};
    const response = await api.get<Investment[]>('/investments', { params });
    return response.data;
  },

  // Buscar por ID
  getById: async (id: number): Promise<Investment> => {
    const response = await api.get<Investment>(`/investments/${id}`);
    return response.data;
  },

  // Buscar por símbolo ou nome
  search: async (symbol?: string, name?: string): Promise<Investment[]> => {
    const params: any = {};
    if (symbol) params.symbol = symbol;
    if (name) params.name = name;
    const response = await api.get<Investment[]>('/investments/search', { params });
    return response.data;
  },

  // Criar investimento
  create: async (data: InvestmentRequest): Promise<Investment> => {
    const response = await api.post<Investment>('/investments', data);
    return response.data;
  },

  // Atualizar investimento
  update: async (id: number, data: InvestmentRequest): Promise<Investment> => {
    const response = await api.put<Investment>(`/investments/${id}`, data);
    return response.data;
  },

  // Deletar investimento
  delete: async (id: number): Promise<void> => {
    await api.delete(`/investments/${id}`);
  },

  // Atualizar preço de mercado
  updateMarketPrice: async (id: number, currentPrice: number): Promise<Investment> => {
    const response = await api.patch<Investment>(
      `/investments/${id}/market-price`,
      null,
      { params: { currentPrice } }
    );
    return response.data;
  },

  // Obter resumo
  getSummary: async (): Promise<Summary> => {
    const response = await api.get<Summary>('/investments/summary');
    return response.data;
  },
};
