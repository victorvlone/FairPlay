package com.fairplay.fair.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fairplay.fair.entities.League;

public interface LeagueRepository extends JpaRepository<League, Long> {
    Optional<League> findByNameIgnoreCaseAndCountryId(String name, Long countryId);
    List<League> findByCountryNameIgnoreCase(String countryName);
Optional<League> findByName(String name);
Optional<League> findByNameAndCountryName(String leagueName, String countryName);


}
