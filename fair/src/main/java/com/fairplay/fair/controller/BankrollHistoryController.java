package com.fairplay.fair.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fairplay.fair.DTO.BankrollHistoryDTO;
import com.fairplay.fair.entities.BankrollHistory;
import com.fairplay.fair.services.BankrollHistoryService;

@RestController
@RequestMapping("/bankroll")
public class BankrollHistoryController {

    @Autowired
    private BankrollHistoryService bankrollHistoryService;

    @PostMapping
    public ResponseEntity<BankrollHistory> createMonth(@RequestBody BankrollHistoryDTO dto) {
        BankrollHistory created = bankrollHistoryService.createMonth(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{userId}/{month}")
    public ResponseEntity<BankrollHistory> getMonth(
            @PathVariable UUID userId,
            @PathVariable String month) {

        BankrollHistory history = bankrollHistoryService.getMonth(userId, month);
        return ResponseEntity.ok(history);
    }

    @PutMapping("/{userId}/{month}")
    public ResponseEntity<BankrollHistory> updateMonth(
            @PathVariable UUID userId,
            @PathVariable String month,
            @RequestBody BankrollHistoryDTO dto) {

        BankrollHistory updated = bankrollHistoryService.updateMonth(userId, month, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{userId}/{month}")
    public ResponseEntity<Void> deleteMonth(
            @PathVariable UUID userId,
            @PathVariable String month) {

        bankrollHistoryService.deleteMonth(userId, month);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<BankrollHistory>> getAllMonths(@PathVariable UUID userId) {
        List<BankrollHistory> histories = bankrollHistoryService.getAllMonths(userId);
        return ResponseEntity.ok(histories);
    }
}
