package com.fairplay.fair.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fairplay.fair.DTO.LeagueDTO;
import com.fairplay.fair.entities.League;
import com.fairplay.fair.services.LeagueService;

@RestController
@RequestMapping("/leagues")
public class LeagueController {

    @Autowired
    private LeagueService leagueService;

    @PostMapping
    public ResponseEntity<League> postLeague(@RequestBody LeagueDTO leagueDTO) {
        League league = leagueService.createLeague(leagueDTO);
        return ResponseEntity.status(201).body(league);
    }

    @GetMapping
    public ResponseEntity<List<League>> findAll() {
        return ResponseEntity.ok(leagueService.getAllLeagues());
    }

    @GetMapping("/{id}")
    public ResponseEntity<League> findById(@PathVariable Long id) {
        return ResponseEntity.ok(leagueService.getLeagueById(id));
    }

    @GetMapping("/country/{countryName}")
    public ResponseEntity<List<League>> getLeaguesByCountry(@PathVariable String countryName) {
        return ResponseEntity.ok(leagueService.getLeaguesByCountryName(countryName));
    }

    @PutMapping("/{id}")
    public ResponseEntity<League> update(@PathVariable Long id,
            @RequestBody LeagueDTO dto) {
        return ResponseEntity.ok(leagueService.updateLeague(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        leagueService.deleteLeague(id);
        return ResponseEntity.noContent().build();
    }
}
