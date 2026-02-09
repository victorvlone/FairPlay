package com.fairplay.fair.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fairplay.fair.DTO.AuthenticationDTO;
import com.fairplay.fair.DTO.LoginResponseDTO;
import com.fairplay.fair.DTO.RegisterDTO;
import com.fairplay.fair.entities.User;
import com.fairplay.fair.repository.UserRepository;
import com.fairplay.fair.services.TokenService;

@RestController
@RequestMapping("auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
        var auth = authenticationManager.authenticate(usernamePassword);

        var usuario = (User) auth.getPrincipal();
        var token = tokenService.generateToken((User) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token, usuario.getRole().name()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO data) {
        if (this.userRepository.findByEmail(data.email()) != null)
            return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User novoUsuario = new User();
        novoUsuario.setFirstName(data.firstName());
        novoUsuario.setLastName(data.lastName());
        novoUsuario.setEmail(data.email());
        novoUsuario.setPassword(encryptedPassword);
        novoUsuario.setRole(data.role());

        novoUsuario.setInitialBankroll(data.initialBankroll());
        novoUsuario.setRealProfit(0.0);
        novoUsuario.setFinalBankroll(data.initialBankroll());

        novoUsuario.setMonth(1);

        this.userRepository.save(novoUsuario);

        return ResponseEntity.ok(Map.of("success", true, "message", "Usuário cadastrado com sucesso"));

    }

}