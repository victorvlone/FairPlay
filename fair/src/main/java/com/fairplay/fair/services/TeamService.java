package com.fairplay.fair.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fairplay.fair.DTO.TeamDTO;
import com.fairplay.fair.entities.League;
import com.fairplay.fair.entities.Team;
import com.fairplay.fair.repository.LeagueRepository;
import com.fairplay.fair.repository.TeamRepository;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private LeagueRepository leagueRepository;

    public Team createTeam(TeamDTO teamDTO) {

        League league = leagueRepository.findById(teamDTO.leagueId())
                .orElseThrow(() -> new RuntimeException("Liga não encontrada!"));

        teamRepository
                .findByNameIgnoreCaseAndLeagueId(teamDTO.name(), teamDTO.leagueId())
                .ifPresent(existing -> {
                    throw new RuntimeException("Já existe um time com esse nome nessa liga.");
                });

        Team team = new Team();
        team.setName(teamDTO.name());
        team.setLeague(league);

        return teamRepository.save(team);
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Team getTeamById(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Time não encontrado"));
    }

    public Team updateTeam(Long id, TeamDTO dto) {

        Team team = getTeamById(id);

        League league = leagueRepository.findById(dto.leagueId())
                .orElseThrow(() -> new RuntimeException("Liga não encontrada!"));

        teamRepository
                .findByNameIgnoreCaseAndLeagueId(dto.name(), dto.leagueId())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new RuntimeException("Já existe um time com esse nome nessa liga.");
                    }
                });

        team.setName(dto.name());
        team.setLeague(league);

        return teamRepository.save(team);
    }

    public void deleteTeam(Long id) {
        Team team = getTeamById(id);
        teamRepository.delete(team);
    }
    
}
