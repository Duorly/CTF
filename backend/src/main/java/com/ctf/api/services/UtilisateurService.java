package com.ctf.api.services;

import java.util.List;

import com.ctf.api.entities.Utilisateur;

public interface UtilisateurService {

	Utilisateur getUtilisateurById(Long id);

	Utilisateur getUtilisateurByEmail(String adresseMail);

	Utilisateur createUtilisateur(Utilisateur utilisateur);

	Utilisateur updateUtilisateur(Utilisateur utilisateur);

	List<Utilisateur> getAllUtilisateur();

	void deleteUtilisateurByEmail(String adresseMail);

	void deleteUtilisateurById(Long id);

}
