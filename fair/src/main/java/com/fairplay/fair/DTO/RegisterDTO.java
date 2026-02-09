package com.fairplay.fair.DTO;

import com.fairplay.fair.entities.enums.UserRole;

public record RegisterDTO(String firstName, String lastName, String email, String password, UserRole role, Double initialBankroll) {

}
