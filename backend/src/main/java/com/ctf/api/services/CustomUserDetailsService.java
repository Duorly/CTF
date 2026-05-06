package com.ctf.api.services;

import com.ctf.api.entities.Utilisateur;
import com.ctf.api.repositories.UtilisateurRepository;
import com.ctf.api.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UtilisateurRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        Utilisateur user = userRepository.findByEmail(identifier)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found with identifier: " + identifier));

        return new UserPrincipal(user);

    }
}
