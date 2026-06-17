package com.fpt.wayfare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Table: tours
 *
 * Relationships:
 *   - Many Tours  → One Destination (ManyToOne)
 *   - Many Tours  → One Category    (ManyToOne)
 *   - One Tour    → Many Bookings   (OneToMany)
 *   - One Tour    → Many Reviews    (OneToMany)
 */
@Entity
@Table(name = "tours")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tour extends BaseEntity {

    @NotBlank
    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    /**
     * Use BigDecimal for monetary values to avoid floating-point rounding errors.
     * precision = 12, scale = 2  →  stores up to 9,999,999,999.99
     */
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Min(1)
    @Column(name = "duration_days", nullable = false)
    private Integer durationDays;

    @Min(0)
    @Column(name = "duration_nights")
    private Integer durationNights;

    /** Maximum number of participants allowed. */
    @Min(1)
    @Column(name = "max_capacity")
    private Integer maxCapacity;

    /** Remaining slots; decremented when a booking is confirmed. */
    @Min(0)
    @Column(name = "available_slots")
    private Integer availableSlots;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    /** Average star rating (0.0 – 5.0); recalculated when a new Review is saved. */
    @DecimalMin("0.0")
    @DecimalMax("5.0")
    @Column(name = "average_rating", precision = 3, scale = 2)
    @Builder.Default
    private BigDecimal averageRating = BigDecimal.ZERO;

    @Column(name = "review_count")
    @Builder.Default
    private Integer reviewCount = 0;

    // ─────────────────────────── Relationships ───────────────────────────

    /**
     * fetch = EAGER  → Destination is loaded together with the Tour in one query.
     * @JoinColumn    → the FK column destination_id lives in the tours table.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destination_id", nullable = false)
    private Destination destination;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Booking> bookings = new ArrayList<>();

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Review> reviews = new ArrayList<>();
}
