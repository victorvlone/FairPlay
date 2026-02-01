package com.fairplay.fair.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fairplay.fair.DTO.LeagueDTO;
import com.fairplay.fair.entities.Country;
import com.fairplay.fair.entities.League;
import com.fairplay.fair.repository.CountryRepository;
import com.fairplay.fair.repository.LeagueRepository;

@Service
public class LeagueService {

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private LeagueRepository leagueRepository;

    public League createLeague(LeagueDTO leagueDTO) {

        Country country = countryRepository.findById(leagueDTO.countryId())
                .orElseThrow(() -> new RuntimeException("País não encontrado!"));

        leagueRepository
                .findByNameIgnoreCaseAndCountryId(leagueDTO.name(), leagueDTO.countryId())
                .ifPresent(existing -> {
                    throw new RuntimeException("Já existe uma liga com esse nome nesse país.");
                });

        League league = new League();
        league.setName(leagueDTO.name());
        league.setCountry(country);

        return leagueRepository.save(league);
    }

    public List<League> getAllLeagues() {
        return leagueRepository.findAll();
    }

    public League getLeagueById(Long id) {
        return leagueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Liga não encontrada"));
    }

    public League updateLeague(Long id, LeagueDTO dto) {

        League league = getLeagueById(id);

        Country country = countryRepository.findById(dto.countryId())
                .orElseThrow(() -> new RuntimeException("País não encontrado!"));

        leagueRepository
                .findByNameIgnoreCaseAndCountryId(dto.name(), dto.countryId())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new RuntimeException("Já existe uma liga com esse nome nesse país.");
                    }
                });

        league.setName(dto.name());
        league.setCountry(country);

        return leagueRepository.save(league);
    }

    public void deleteLeague(Long id) {
        League league = getLeagueById(id);
        leagueRepository.delete(league);
    }

}
