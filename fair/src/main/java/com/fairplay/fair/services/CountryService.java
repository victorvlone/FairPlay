package com.fairplay.fair.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fairplay.fair.DTO.CountryDTO;
import com.fairplay.fair.entities.Country;
import com.fairplay.fair.repository.CountryRepository;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public Country createCountry(CountryDTO countryDTO) {

        countryRepository.findByNameIgnoreCase(countryDTO.name())
                .ifPresent(country -> {
                    throw new RuntimeException("País já cadastrado.");
                });

        Country country = new Country();
        country.setName(countryDTO.name());

        return countryRepository.save(country);
    }

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public Country getCountryById(Long id) {
        return countryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("País não encontrado"));
    }

    public Country updateCountry(Long id, CountryDTO dto) {
        Country country = getCountryById(id);

        countryRepository.findByNameIgnoreCase(dto.name())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new RuntimeException("Já existe um país com esse nome.");
                    }
                });

        country.setName(dto.name());
        return countryRepository.save(country);
    }

    public void deleteCountry(Long id) {
        Country country = countryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("País não encontrado"));

        countryRepository.delete(country);
    }
}
