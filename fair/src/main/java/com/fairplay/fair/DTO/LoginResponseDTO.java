package com.fairplay.fair.DTO;

import java.util.UUID;

public record LoginResponseDTO(String token, String role, UUID userId) {
     public LoginResponseDTO(String token, String role, UUID userId) {
        this.token = token;
        this.role = role;
        this.userId = userId;
    }
}
