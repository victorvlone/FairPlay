package com.fairplay.fair.DTO;

import java.util.UUID;

public record BankrollHistoryDTO(Integer month,
        Double realProfit,
        UUID userId) {

}
