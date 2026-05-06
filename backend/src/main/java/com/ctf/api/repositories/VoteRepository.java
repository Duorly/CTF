package com.ctf.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.ctf.api.entities.Vote;

public interface VoteRepository extends JpaRepository<Vote, Long>{
    @Query("SELECT COUNT(v) > 0 FROM Vote v WHERE v.voter.id_utilisateur = :userId AND v.optionChosen.sondage.id_sondage = :pollId")
    boolean existsByUserIdAndPollId(@Param("userId") Long userId, @Param("pollId") Long pollId);
}
