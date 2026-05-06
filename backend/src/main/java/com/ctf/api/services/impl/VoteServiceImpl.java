package com.ctf.api.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctf.api.entities.Vote;
import com.ctf.api.repositories.VoteRepository;
import com.ctf.api.services.VoteService;

@Service
public class VoteServiceImpl implements VoteService {

    @Autowired
    private VoteRepository voteRepository;

    public Vote createVote(Vote vote) {
        return voteRepository.save(vote);
    }

    @Override
    public Vote getVoteById(Long id) {
        return voteRepository.findById(id).orElse(null);
    }

    @Override
    public void getallVotes() {
        voteRepository.findAll();
    }

    @Override
    public void deleteVote(Long id) {
        voteRepository.deleteById(id);
    }

}
