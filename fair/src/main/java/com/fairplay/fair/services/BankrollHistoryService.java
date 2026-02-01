package com.fairplay.fair.services;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fairplay.fair.DTO.BankrollHistoryDTO;
import com.fairplay.fair.entities.BankrollHistory;
import com.fairplay.fair.entities.User;
import com.fairplay.fair.repository.BankrollHistoryRepository;
import com.fairplay.fair.repository.UserRepository;

@Service
public class BankrollHistoryService {

    @Autowired
    private BankrollHistoryRepository bankrollHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    public BankrollHistory createMonth(BankrollHistoryDTO dto) {

        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        BankrollHistory lastMonth = bankrollHistoryRepository.findAll().stream()
                .filter(b -> b.getUser().getId().equals(user.getId()))
                .max(Comparator.comparing(BankrollHistory::getMonth))
                .orElse(null);

        Double initialBankroll;

        if (lastMonth == null) {

            initialBankroll = 0.0;
        } else {

            initialBankroll = lastMonth.getFinalBankroll();
        }

        Double finalBankroll = initialBankroll + dto.realProfit();

        BankrollHistory history = new BankrollHistory();
        history.setMonth(dto.month());
        history.setInitialBankroll(initialBankroll);
        history.setRealProfit(dto.realProfit());
        history.setFinalBankroll(finalBankroll);
        history.setUser(user);

        return bankrollHistoryRepository.save(history);
    }

    public BankrollHistory getMonth(UUID userId, String month) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return bankrollHistoryRepository.findAll().stream()
                .filter(b -> b.getUser().getId().equals(userId) && b.getMonth().equals(month))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Histórico do mês não encontrado"));
    }

    public BankrollHistory updateMonth(UUID userId, String month, BankrollHistoryDTO dto) {
        BankrollHistory history = getMonth(userId, month);

        history.setRealProfit(dto.realProfit());

        history.setFinalBankroll(history.getInitialBankroll() + dto.realProfit());

        return bankrollHistoryRepository.save(history);
    }

    public void deleteMonth(UUID userId, String month) {
        BankrollHistory history = getMonth(userId, month);
        bankrollHistoryRepository.delete(history);
    }

    public List<BankrollHistory> getAllMonths(UUID userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

    return bankrollHistoryRepository.findAll().stream()
            .filter(b -> b.getUser().getId().equals(userId))
            .sorted(Comparator.comparing(BankrollHistory::getMonth))
            .toList();
}


}
