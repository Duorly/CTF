import api from './api';

export interface User {
  id_utilisateur?: number;
  nom: string;
  prenom: string;
  email: string;
  password?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

const authService = {
  login: async (data: LoginRequest): Promise<User> => {
    const response = await api.post<User>('/auth/login', data);
    return response.data;
  },

  register: async (data: User): Promise<User> => {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  },
};

export default authService;
