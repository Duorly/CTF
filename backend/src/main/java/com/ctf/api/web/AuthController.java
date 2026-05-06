package com.ctf.api.web;

import com.ctf.api.dto.LoginRequest;
import com.ctf.api.entities.Utilisateur;
import com.ctf.api.services.UtilisateurService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UtilisateurService utilisateurService;
    private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        try {
            Utilisateur utilisateur = utilisateurService.login(request.getEmail(), request.getPassword());
            securityContextRepository.saveContext(SecurityContextHolder.getContext(), httpRequest, httpResponse);
            return ResponseEntity.ok(utilisateur);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants invalides");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Utilisateur> register(@RequestBody Utilisateur utilisateur) {
        Utilisateur created = utilisateurService.createUtilisateur(utilisateur);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}
