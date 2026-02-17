package com.fairplay.fair.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fairplay.fair.entities.BankrollHistory;

public interface BankrollHistoryRepository extends JpaRepository<BankrollHistory, Long> {
    List<BankrollHistory> findByUserIdOrderByMonthAsc(UUID userId);

}
