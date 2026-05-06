package com.ctf.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatsDTO {
    private Long totalVotes;
    private String mostPopularPollTitle;
    private Long mostPopularPollVotes;
    private Long mostPopularPollId;
}
