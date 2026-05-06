package com.ctf.api.web;

import com.ctf.api.dto.StatsDTO;
import com.ctf.api.services.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService statsService;

    @GetMapping
    public StatsDTO getStats() {
        return statsService.getPlatformStats();
    }
}
