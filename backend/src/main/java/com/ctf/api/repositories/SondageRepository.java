package com.ctf.api.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ctf.api.entities.Sondage;

import java.util.List;

public interface SondageRepository extends JpaRepository<Sondage, Long> {
    @Query("SELECT s FROM Sondage s LEFT JOIN s.options o LEFT JOIN o.votes v GROUP BY s ORDER BY COUNT(v) DESC")
    List<Sondage> findMostPopularPolls(Pageable pageable);
}
