package com.fairplay.fair.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fairplay.fair.entities.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
        Optional<Team> findByNameIgnoreCaseAndLeagueId(String name, Long leagueId);
        Optional<Team> findByName(String name);
}
