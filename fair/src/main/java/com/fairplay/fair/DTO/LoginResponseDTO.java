package com.fairplay.fair.DTO;

import java.util.UUID;

public record LoginResponseDTO(String token, String role, UUID userId, Double initialBankroll) {

     public LoginResponseDTO(String token, String role, UUID userId, Double initialBankroll) {
        this.token = token;
        this.role = role;
        this.userId = userId;
        this.initialBankroll = initialBankroll;
    }
}
