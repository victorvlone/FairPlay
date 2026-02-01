package com.fairplay.fair.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fairplay.fair.entities.League;

public interface LeagueRepository extends JpaRepository<League, Long> {
    Optional<League> findByNameIgnoreCaseAndCountryId(String name, Long countryId);

}
