package com.ctf.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ctf.api.entities.Sondage;

public interface SondageRepository extends JpaRepository<Sondage, Long> {

}
