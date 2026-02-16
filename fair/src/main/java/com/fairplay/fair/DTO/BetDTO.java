package com.fairplay.fair.DTO;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.fairplay.fair.entities.enums.Status;
import com.fairplay.fair.entities.enums.Types;

public record BetDTO(Double oddTotal, Status status, UUID userId, Types type, List<MatchDTO> matches, Double actualReturn, Double betValue, double potentialReturn, Map<Long, String> matchesStatus) {

}
