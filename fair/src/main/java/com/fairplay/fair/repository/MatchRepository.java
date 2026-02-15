package com.fairplay.fair.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fairplay.fair.entities.Match;

public interface MatchRepository extends JpaRepository<Match, Long> {
    @Query("SELECT m FROM Bet b JOIN b.matches m WHERE b.user.id = :userId")
    List<Match> findByUserId(@Param("userId") UUID userId);
}
