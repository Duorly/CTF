package com.ctf.api.services;

import java.util.List;
import java.util.Optional;

import com.ctf.api.entities.Utilisateur;

public interface UtilisateurService {

	Utilisateur getUtilisateurById(Long id);

	Optional<Utilisateur> getUtilisateurByEmail(String email);

	Utilisateur createUtilisateur(Utilisateur utilisateur);

	Utilisateur updateUtilisateur(Utilisateur utilisateur);

	List<Utilisateur> getAllUtilisateur();

	void deleteUtilisateurByEmail(String email);

	void deleteUtilisateurById(Long id);

}
