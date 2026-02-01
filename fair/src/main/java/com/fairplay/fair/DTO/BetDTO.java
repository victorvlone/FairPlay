package com.fairplay.fair.DTO;

import java.util.UUID;

import com.fairplay.fair.entities.enums.Status;
import com.fairplay.fair.entities.enums.Types;

public record BetDTO(Double oddTotal, Status status, UUID userId, Types type) {

}
