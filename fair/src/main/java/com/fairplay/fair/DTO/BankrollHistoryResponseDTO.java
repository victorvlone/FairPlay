package com.fairplay.fair.DTO;

public record BankrollHistoryResponseDTO(Long id,
    Integer month,
    Double initialBankroll,
    Double realProfit,
    Double finalBankroll) {

}
