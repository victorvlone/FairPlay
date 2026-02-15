package com.fairplay.fair.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fairplay.fair.DTO.MatchDTO;
import com.fairplay.fair.entities.League;
import com.fairplay.fair.entities.Match;
import com.fairplay.fair.entities.Team;
import com.fairplay.fair.repository.LeagueRepository;
import com.fairplay.fair.repository.MatchRepository;
import com.fairplay.fair.repository.TeamRepository;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private LeagueRepository leagueRepository;

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Match getMatchById(Long id) {
        return matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));
    }

    public List<Match> getAllMatchesByUser(UUID userId) {
    // Agora chama o novo método com a Query customizada
    return matchRepository.findByUserId(userId);
}

    public void deleteMatch(Long id) {
        Match match = getMatchById(id);
        matchRepository.delete(match);
    }
}
