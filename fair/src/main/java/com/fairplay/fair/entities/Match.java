package com.fairplay.fair.entities;

import com.fairplay.fair.entities.enums.RecommendBet;
import com.fairplay.fair.entities.enums.Result;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "matches")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer over15;

    @Column(nullable = false)
    private Integer over25;

    @Column(nullable = false)
    private Integer over05Ht;

    @Column(nullable = false)
    private Integer btts;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private RecommendBet recommendBet;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private Result result;

    @ManyToOne
    @JoinColumn(name = "home_team_id", nullable = false)
    private Team homeTeam;

    @ManyToOne
    @JoinColumn(name = "away_team_id", nullable = false)
    private Team awayTeam;
}
