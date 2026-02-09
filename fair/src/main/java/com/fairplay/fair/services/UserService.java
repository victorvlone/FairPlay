package com.fairplay.fair.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fairplay.fair.DTO.UserDTO;
import com.fairplay.fair.entities.User;
import com.fairplay.fair.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(UserDTO newUserDTO) {
        User user = new User();
        user.setFirstName(newUserDTO.firstName());
        user.setLastName(newUserDTO.lastName());
        user.setEmail(newUserDTO.email());
        user.setPassword(newUserDTO.password());
        user.setInitialBankroll(newUserDTO.initialBankroll()); 
        user.setRealProfit(0.0);
        user.setFinalBankroll(newUserDTO.initialBankroll());

        return userRepository.save(user);
    }
    public User findById(UUID id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));
}
}
