package com.fairplay.fair.services;

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
        user.setLastName(newUserDTO.firstName());
        user.setEmail(newUserDTO.email());
        user.setPassword(newUserDTO.password());

        return userRepository.save(user);
    }
}
