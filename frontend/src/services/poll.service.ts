import api from './api';

export type Option = {
  id_option?: number;
  label: string;
  nbVotes?: number;
};

export type Sondage = {
  id_sondage?: number;
  titre: string;
  description: string;
  creat_at?: string;
  lien?: string;
  options: Option[];
  createur?: { id_utilisateur: number; nom?: string; prenom?: string };
};

export type Stats = {
  totalVotes: number;
  mostPopularPollTitle: string;
  mostPopularPollVotes: number;
  mostPopularPollId: number | null;
};

export const pollService = {
  getStats: async () => {
    const response = await api.get<Stats>('/api/stats');
    return response.data;
  },

  getAllPolls: async () => {
    const response = await api.get<Sondage[]>('/api/sondages');
    return response.data;
  },

  createPoll: async (pollData: Omit<Sondage, 'id_sondage' | 'creat_at' | 'lien'>) => {
    const response = await api.post<Sondage>('/api/sondages', pollData);
    return response.data;
  },

  getPollById: async (id: number) => {
    const response = await api.get<Sondage>(`/api/sondages/${id}`);
    return response.data;
  },

  deletePoll: async (id: number) => {
    return api.delete(`/api/sondages/${id}`);
  }
};
