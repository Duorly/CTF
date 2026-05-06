package com.ctf.api.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Vote {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id_vote;
	
	@ManyToOne
	private Utilisateur voter;

	@ManyToOne
	private Option optionChosen;

}
