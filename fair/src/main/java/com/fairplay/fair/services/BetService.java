package com.fairplay.fair.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fairplay.fair.DTO.BetDTO;
import com.fairplay.fair.entities.BankrollHistory;
import com.fairplay.fair.entities.Bet;
import com.fairplay.fair.entities.Country;
import com.fairplay.fair.entities.League;
import com.fairplay.fair.entities.Match;
import com.fairplay.fair.entities.Team;
import com.fairplay.fair.entities.User;
import com.fairplay.fair.entities.enums.Result;
import com.fairplay.fair.entities.enums.Status;
import com.fairplay.fair.repository.BankrollHistoryRepository;
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

    @Autowired
    private BankrollHistoryRepository bankrollHistoryRepository;

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
        bet.setBetValue(dto.betValue());
        bet.setPotentialReturn(dto.potentialReturn());
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

    @Transactional
    public Bet updateBet(Long id, BetDTO dto) {
        Bet bet = betRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aposta não encontrada"));

        bet.setStatus(dto.status());
        bet.setActualReturn(dto.actualReturn());

        if (bet.getStatus() == Status.FINALIZADA) {
            // --- INÍCIO DA MUDANÇA (Etapa 1) ---
            for (Match match : bet.getMatches()) {
                // Se o Frontend enviou o status específico dessa partida no Map
                if (dto.matchesStatus() != null && dto.matchesStatus().containsKey(match.getId())) {
                    String statusEnviado = dto.matchesStatus().get(match.getId()); // "GREEN" ou "RED"
                    match.setResult(Result.valueOf(statusEnviado));
                } else {
                    // Caso o Map esteja vazio (ex: clique no botão "Tudo Green"),
                    // usa a lógica baseada no retorno financeiro
                    Result fallback = (bet.getActualReturn() > 0) ? Result.GREEN : Result.RED;
                    match.setResult(fallback);
                }
            }
            // --- FIM DA MUDANÇA ---

            // 2. Lógica Financeira do Usuário (Mantém igual, está correta!)
            User user = bet.getUser();
            double lucroLiquido = bet.getActualReturn() - bet.getBetValue();

            user.setRealProfit(user.getRealProfit() + lucroLiquido);
            user.setFinalBankroll(user.getInitialBankroll() + user.getRealProfit());

            // 3. Regra dos 10% (Mantém igual)
            double meta = user.getInitialBankroll() * 0.10;

            if (user.getRealProfit() >= meta) {
                BankrollHistory history = new BankrollHistory();
                history.setUser(user);
                history.setMonth(user.getMonth());
                history.setInitialBankroll(user.getInitialBankroll());
                history.setRealProfit(user.getRealProfit());
                history.setFinalBankroll(user.getFinalBankroll());

                bankrollHistoryRepository.save(history);

                user.setMonth(user.getMonth() + 1);
                double novaBancaComAporte = user.getFinalBankroll() + 100.0;

                user.setInitialBankroll(novaBancaComAporte);
                user.setRealProfit(0.0);
                user.setFinalBankroll(novaBancaComAporte);
            }

            userRepository.save(user);
        }

        return betRepository.save(bet);
    }

    public void deleteBet(Long id) {
        Bet bet = getBetById(id);
        betRepository.delete(bet);
    }

}
