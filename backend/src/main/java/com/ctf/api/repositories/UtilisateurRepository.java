package com.ctf.api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ctf.api.entities.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long>{

	Optional<Utilisateur> findByEmail(String email);

	void deleteByEmail(String email);
	

}
