package com.fpt.wayfare.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO for creating and updating tours.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourRequest {
    private String title;
    private String description;
    private BigDecimal price;
    private Integer durationDays;
    private Integer durationNights;
    private Integer maxCapacity;
    private Integer availableSlots;
    private String imageUrl;
    private Long destinationId;
    private Long categoryId;
}
