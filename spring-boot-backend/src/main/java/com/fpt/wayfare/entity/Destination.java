package com.fpt.wayfare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Table: destinations
 * A travel location (city / landmark) that groups multiple tours.
 *
 * Relationships:
 *   - One Destination → Many Tours (OneToMany)
 */
@Entity
@Table(name = "destinations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Destination extends BaseEntity {

    @NotBlank
    @Column(nullable = false, length = 150)
    private String name;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String country;

    @Column(length = 100)
    private String city;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    /** Latitude coordinate — used for map display. */
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    @Column(columnDefinition = "DECIMAL(10,7)")
    private Double latitude;

    /** Longitude coordinate. */
    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    @Column(columnDefinition = "DECIMAL(10,7)")
    private Double longitude;

    /** Whether this destination is highlighted on the homepage. */
    @Column(name = "is_featured", nullable = false)
    @Builder.Default
    private Boolean isFeatured = false;

    // ─────────────────────────── Relationships ───────────────────────────

    /**
     * cascade = ALL      → persisting / removing Destination cascades to Tours.
     * orphanRemoval      → tours with no destination are deleted automatically.
     */
    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Tour> tours = new ArrayList<>();
}
