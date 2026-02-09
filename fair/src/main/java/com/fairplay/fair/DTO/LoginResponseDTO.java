package com.fairplay.fair.DTO;

public record LoginResponseDTO(String token, String role) {
     public LoginResponseDTO(String token, String role) {
        this.token = token;
        this.role = role;
    }
}
