package com.ctf.api.web;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctf.api.entities.Sondage;
import com.ctf.api.services.SondageService;

@RestController
@RequestMapping("/api/sondages")
public class SondageController {

    private final SondageService sondageService;

    public SondageController(SondageService sondageService) {
        this.sondageService = sondageService;
    }

    @GetMapping
    public List<Sondage> getAllSondages() {
        return sondageService.getAllSondages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sondage> getSondageById(@PathVariable Long id) {
        Sondage sondage = sondageService.getSondageById(id);
        return sondage != null ? ResponseEntity.ok(sondage) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Sondage> createSondage(@RequestBody Sondage sondage) {
        Sondage created = sondageService.createSondage(sondage);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSondage(@PathVariable Long id) {
        sondageService.deleteSondage(id);
        return ResponseEntity.noContent().build();
    }
}
