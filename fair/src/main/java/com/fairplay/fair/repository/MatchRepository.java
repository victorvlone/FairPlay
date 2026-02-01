package com.fairplay.fair.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fairplay.fair.entities.Match;

public interface MatchRepository extends JpaRepository<Match, Long> {

}
