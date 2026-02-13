package com.fairplay.fair.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fairplay.fair.entities.Country;

public interface CountryRepository extends JpaRepository<Country, Long> {
    Optional<Country> findByNameIgnoreCase(String name);
    Optional<Country> findByName(String name);
    
}
