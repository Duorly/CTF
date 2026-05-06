package com.ctf.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ctf.api.entities.Option;

public interface OptionRepository extends JpaRepository<Option, Long> {

}
