package com.ctf.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ctf.api.entities.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Long, Utilisateur>{

	Optional<Utilisateur> findByAdresseMail(String adresseMail);

	void deleteUtilisateurByAdresseMail(String adresseMail);
	

}
