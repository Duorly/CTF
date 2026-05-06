package com.ctf.api.services;

import java.util.List;
import com.ctf.api.entities.Vote;

public interface VoteService {

    Vote createVote(Vote vote);
    List<Vote> getAllVotes();
    Vote getVoteById(Long id);
    void deleteVote(Long id);
    boolean hasUserVoted(Long userId, Long pollId);
}
