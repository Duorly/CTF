package com.ctf.api.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id_utilisateur;
	private String nom;
	private String preneom;
	private String email;
	private String mot_de_passe;
	


}
