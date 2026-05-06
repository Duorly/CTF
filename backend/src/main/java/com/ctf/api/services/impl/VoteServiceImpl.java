package com.ctf.api.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctf.api.entities.Vote;
import com.ctf.api.repositories.VoteRepository;
import com.ctf.api.services.VoteService;

@Service
public class VoteServiceImpl implements VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private com.ctf.api.repositories.OptionRepository optionRepository;

    @Override
    public Vote createVote(Vote vote) {
        // Récupérer l'option complète pour avoir le sondage associé
        com.ctf.api.entities.Option option = optionRepository.findById(vote.getOptionChosen().getId_option())
                .orElseThrow(() -> new RuntimeException("Option non trouvée"));
        
        if (hasUserVoted(vote.getVoter().getId_utilisateur(), option.getSondage().getId_sondage())) {
            throw new RuntimeException("L'utilisateur a déjà voté pour ce sondage.");
        }
        
        return voteRepository.save(vote);
    }

    @Override
    public List<Vote> getAllVotes() {
        return voteRepository.findAll();
    }

    @Override
    public Vote getVoteById(Long id) {
        return voteRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteVote(Long id) {
        voteRepository.deleteById(id);
    }

    @Override
    public boolean hasUserVoted(Long userId, Long pollId) {
        return voteRepository.existsByUserIdAndPollId(userId, pollId);
    }
}
