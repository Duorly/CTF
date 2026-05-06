import api from "./api";

export interface Vote {
  id_vote?: number;
  voter: { id_utilisateur: number };
  optionChosen: { id_option: number };
}

export const voteService = {
  createVote: async (voterId: number, optionId: number) => {
    const vote: Vote = {
      voter: { id_utilisateur: voterId },
      optionChosen: { id_option: optionId }
    };
    return api.post<Vote>("/api/votes", vote);
  },

  getAllVotes: async () => {
    return api.get<Vote[]>("/api/votes");
  },

  checkUserVote: async (userId: number, pollId: number) => {
    const response = await api.get<boolean>(`/api/votes/check/${userId}/${pollId}`);
    return response.data;
  }
};
