package com.ctf.api.services;

import com.ctf.api.dto.StatsDTO;
import com.ctf.api.entities.Sondage;
import com.ctf.api.repositories.SondageRepository;
import com.ctf.api.repositories.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final VoteRepository voteRepository;
    private final SondageRepository sondageRepository;

    public StatsDTO getPlatformStats() {
        long totalVotes = voteRepository.count();
        
        List<Sondage> popularPolls = sondageRepository.findMostPopularPolls(PageRequest.of(0, 1));
        
        String popularTitle = "N/A";
        long popularVotes = 0;
        Long popularId = null;

        if (!popularPolls.isEmpty()) {
            Sondage mostPopular = popularPolls.get(0);
            popularTitle = mostPopular.getTitre();
            popularId = mostPopular.getId_sondage();
            popularVotes = mostPopular.getOptions().stream()
                    .mapToLong(o -> o.getVotes() != null ? o.getVotes().size() : 0)
                    .sum();
        }

        return StatsDTO.builder()
                .totalVotes(totalVotes)
                .mostPopularPollTitle(popularTitle)
                .mostPopularPollVotes(popularVotes)
                .mostPopularPollId(popularId)
                .build();
    }
}
