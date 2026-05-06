package com.ctf.api.web;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.ctf.api.security.UserPrincipal;
import org.springframework.security.core.Authentication;
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
@Tag(name = "Sondages", description = "Gestion des sondages (création, consultation, suppression)")
public class SondageController {

    private final SondageService sondageService;

    public SondageController(SondageService sondageService) {
        this.sondageService = sondageService;
    }

    @GetMapping
    @Operation(summary = "Lister tous les sondages")
    public List<Sondage> getAllSondages() {
        return sondageService.getAllSondages();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupérer un sondage par ID")
    public ResponseEntity<Sondage> getSondageById(@PathVariable Long id) {
        Sondage sondage = sondageService.getSondageById(id);
        return sondage != null ? ResponseEntity.ok(sondage) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary = "Créer un nouveau sondage")
    public ResponseEntity<Sondage> createSondage(@RequestBody Sondage sondage) {
        Sondage created = sondageService.createSondage(sondage);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un sondage")
    public ResponseEntity<Void> deleteSondage(@PathVariable Long id, Authentication authentication) {
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        sondageService.deleteSondage(id, principal.getUser().getId_utilisateur());
        return ResponseEntity.noContent().build();
    }
}
