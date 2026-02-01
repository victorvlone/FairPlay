package com.fairplay.fair.services;

import java.util.List;

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

    public Match createMatch(MatchDTO dto) {

        Team homeTeam = teamRepository.findById(dto.homeTeamId())
                .orElseThrow(() -> new RuntimeException("TIme de casa não encontrado"));

        Team awayTeam = teamRepository.findById(dto.awayTeamId())
                .orElseThrow(() -> new RuntimeException("TIme de fora não encontrado"));

        League league = leagueRepository.findById(dto.leagueId())
                .orElseThrow(() -> new RuntimeException("Liga não encontrada"));

        Match match = new Match();
        match.setMatchDate(dto.matchDate());
        match.setOver15(dto.oddOver15());
        match.setOver25(dto.oddOver25());
        match.setOver05Ht(dto.oddOver05Ht());
        match.setBtts(dto.oddBtts());
        match.setRecommendBet(dto.recommendBet());
        match.setBetMade(dto.betMade());
        match.setResult(dto.result());
        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);
        match.setLeague(league);

        return matchRepository.save(match);
    }

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Match getMatchById(Long id) {
        return matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));
    }

    public Match updateMatch(Long id, MatchDTO dto) {

        Match match = getMatchById(id);

        Team homeTeam = teamRepository.findById(dto.homeTeamId())
                .orElseThrow(() -> new RuntimeException("Time de casa não encontrado"));

        Team awayTeam = teamRepository.findById(dto.awayTeamId())
                .orElseThrow(() -> new RuntimeException("Time visitante não encontrado"));

        League league = leagueRepository.findById(dto.leagueId())
                .orElseThrow(() -> new RuntimeException("Liga não encontrada"));

        match.setMatchDate(dto.matchDate());
        match.setOver15(dto.oddOver15());
        match.setOver25(dto.oddOver25());
        match.setOver05Ht(dto.oddOver05Ht());
        match.setBtts(dto.oddBtts());
        match.setRecommendBet(dto.recommendBet());
        match.setBetMade(dto.betMade());
        match.setResult(dto.result());
        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);
        match.setLeague(league);

        return matchRepository.save(match);
    }

    public void deleteMatch(Long id) {
        Match match = getMatchById(id);
        matchRepository.delete(match);
    }
}
