package com.fairplay.fair.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fairplay.fair.DTO.BetDTO;
import com.fairplay.fair.entities.Bet;
import com.fairplay.fair.services.BetService;

@RestController
@RequestMapping("/bets")
public class BetController {

    private final BetService betService;

    public BetController(BetService betService) {
        this.betService = betService;
    }

    @PostMapping
    public ResponseEntity<Bet> createBet(@RequestBody BetDTO dto) {
        return ResponseEntity.status(201).body(betService.createBet(dto));
    }

    @GetMapping
    public ResponseEntity<List<Bet>> getAll() {
        return ResponseEntity.ok(betService.getAllBets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bet> getById(@PathVariable Long id) {
        return ResponseEntity.ok(betService.getBetById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Bet>> getByUser(@PathVariable UUID userId) {
        return ResponseEntity.ok(betService.getBetsByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bet> update(@PathVariable Long id,
            @RequestBody BetDTO dto) {
        return ResponseEntity.ok(betService.updateBet(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        betService.deleteBet(id);
        return ResponseEntity.noContent().build();
    }
}
