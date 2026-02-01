package com.fairplay.fair.DTO;

import java.time.LocalDateTime;

import com.fairplay.fair.entities.enums.BetType;
import com.fairplay.fair.entities.enums.Result;

public record MatchDTO(LocalDateTime matchDate,
        Integer oddOver15,
        Integer oddOver25,
        Integer oddOver05Ht,
        Integer oddBtts,
        BetType recommendBet,
        BetType betMade,
        Result result,
        Long homeTeamId,
        Long awayTeamId,
        Long leagueId) {

}
