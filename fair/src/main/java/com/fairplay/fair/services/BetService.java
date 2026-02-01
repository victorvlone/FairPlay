package com.fairplay.fair.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fairplay.fair.DTO.BetDTO;
import com.fairplay.fair.entities.Bet;
import com.fairplay.fair.entities.User;
import com.fairplay.fair.repository.BetRepository;
import com.fairplay.fair.repository.UserRepository;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;

    private UserRepository userRepository;

    public Bet createBet(BetDTO dto) {
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Bet bet = new Bet();
        bet.setOddTotal(dto.oddTotal());
        bet.setType(dto.type());
        bet.setStatus(dto.status());
        bet.setUser(user);

        return betRepository.save(bet);
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
