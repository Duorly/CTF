package com.ctf.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ctf.api.entities.Vote;

public interface VoteRepository extends JpaRepository<Long, Vote>{

}
