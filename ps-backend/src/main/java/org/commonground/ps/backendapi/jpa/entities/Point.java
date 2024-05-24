package org.commonground.ps.backendapi.jpa.entities;

import java.math.BigDecimal;

import jakarta.persistence.Embeddable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Embeddable
public class Point {
    private BigDecimal x;
    private BigDecimal y;
}