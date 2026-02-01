package com.fairplay.fair.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fairplay.fair.entities.Bet;

public interface BetRepository extends JpaRepository<Bet, Long> {
    List<Bet> findByUserId(UUID userId);
}
