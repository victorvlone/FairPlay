package com.fairplay.fair.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fairplay.fair.DTO.BetDTO;
import com.fairplay.fair.entities.Bet;
import com.fairplay.fair.entities.Country;
import com.fairplay.fair.entities.League;
import com.fairplay.fair.entities.Match;
import com.fairplay.fair.entities.Team;
import com.fairplay.fair.entities.User;
import com.fairplay.fair.repository.BetRepository;
import com.fairplay.fair.repository.CountryRepository;
import com.fairplay.fair.repository.LeagueRepository;
import com.fairplay.fair.repository.MatchRepository;
import com.fairplay.fair.repository.TeamRepository;
import com.fairplay.fair.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private LeagueRepository leagueRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Transactional
    public Bet createBet(BetDTO dto) {
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<Match> matches = dto.matches().stream().map(mDto -> {
            Match match = new Match();
            match.setMatchDate(mDto.matchDate());
            match.setOver15(mDto.oddOver15());
            match.setOver25(mDto.oddOver25());
            match.setOver05Ht(mDto.oddOver05Ht());
            match.setBtts(mDto.oddBtts());
            match.setRecommendBet(mDto.recommendBet());
            match.setBetMade(mDto.betMade());

            match.setHomeTeam(findOrCreateTeam(mDto.homeTeamName()));
            match.setAwayTeam(findOrCreateTeam(mDto.awayTeamName()));
            match.setLeague(findOrCreateLeague(mDto.leagueName(), mDto.countryName()));

            return matchRepository.save(match);
        }).toList();

        Bet bet = new Bet();
        bet.setOddTotal(dto.oddTotal());
        bet.setType(dto.type());
        bet.setStatus(dto.status());
        bet.setUser(user);
        bet.setMatches(matches);

        return betRepository.save(bet);
    }

    private Team findOrCreateTeam(String name) {
        return teamRepository.findByName(name)
                .orElseGet(() -> {
                    Team newTeam = new Team();
                    newTeam.setName(name);
                    return teamRepository.save(newTeam);
                });
    }

    private League findOrCreateLeague(String leagueName, String countryName) {
        return leagueRepository.findByName(leagueName)
                .orElseGet(() -> {
                    League newLeague = new League();
                    newLeague.setName(leagueName);

                    if (countryName != null && !countryName.isEmpty()) {
                        Country country = findOrCreateCountry(countryName);
                        newLeague.setCountry(country);
                    }

                    return leagueRepository.save(newLeague);
                });
    }

    private Country findOrCreateCountry(String name) {
        return countryRepository.findByName(name)
                .orElseGet(() -> {
                    Country newCountry = new Country();
                    newCountry.setName(name);
                    return countryRepository.save(newCountry);
                });
    }

    public List<Bet> getAllBets() {
        return betRepository.findAll();
    }

    public Bet getBetById(Long id) {
        return betRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aposta não encontrada"));
    }

    public List<Bet> getBetsByUser(UUID userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return betRepository.findByUserId(userId);
    }

    public Bet updateBet(Long id, BetDTO dto) {

        Bet bet = getBetById(id);

        bet.setOddTotal(dto.oddTotal());
        bet.setType(dto.type());
        bet.setStatus(dto.status());

        return betRepository.save(bet);
    }

    public void deleteBet(Long id) {
        Bet bet = getBetById(id);
        betRepository.delete(bet);
    }

}
