package com.fairplay.fair.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bankroll_history", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "user_id", "month" })
})
public class BankrollHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer month;

    @Column(nullable = false)
    private Double initialBankroll;

    @Column(nullable = false)
    private Double realProfit;

    @Column(nullable = false)
    private Double finalBankroll;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
