package com.fairplay.fair.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fairplay.fair.entities.User;

public interface UserRepository extends JpaRepository<User, UUID>{


    User findByEmail(String email);
}
