package com.ctf.api.web;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctf.api.entities.Vote;
import com.ctf.api.services.VoteService;

@RestController
@RequestMapping("/api/votes")
@Tag(name = "Votes", description = "Gestion des votes pour les options des sondages")
public class VoteController {

    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @GetMapping
    @Operation(summary = "Lister tous les votes")
    public List<Vote> getAllVotes() {
        return voteService.getAllVotes();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupérer un vote par ID")
    public ResponseEntity<Vote> getVoteById(@PathVariable Long id) {
        Vote vote = voteService.getVoteById(id);
        return vote != null ? ResponseEntity.ok(vote) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary = "Enregistrer un nouveau vote")
    public ResponseEntity<Vote> createVote(@RequestBody Vote vote) {
        Vote created = voteService.createVote(vote);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un vote")
    public ResponseEntity<Void> deleteVote(@PathVariable Long id) {
        voteService.deleteVote(id);
        return ResponseEntity.noContent().build();
    }
}
