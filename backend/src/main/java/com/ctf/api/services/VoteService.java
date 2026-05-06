package com.ctf.api.services;

import com.ctf.api.entities.Vote;

public interface VoteService {

        void createVote();
        void getVoteById();
        void getallVotes();
        void deleteVote(Long id);
        Vote getVoteById(Long id);
        Vote createVote(Vote vote);
}
