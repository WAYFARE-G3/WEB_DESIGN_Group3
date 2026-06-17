package com.fpt.wayfare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Table: reviews
 * A customer's star rating and written feedback for a completed tour.
 *
 * Relationships:
 *   - Many Reviews → One User (ManyToOne)
 *   - Many Reviews → One Tour (ManyToOne)
 *
 * Constraint: each User can review a given Tour only once.
 *   → UniqueConstraint on (user_id, tour_id)
 */
@Entity
@Table(
    name = "reviews",
    uniqueConstraints = @UniqueConstraint(
        name = "uk_reviews_user_tour",
        columnNames = {"user_id", "tour_id"}
    )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    /**
     * Star rating from 1 to 5.
     * Validated by @Min / @Max before the entity is persisted.
     */
    @NotNull
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    @Column(nullable = false)
    private Integer rating;

    /** Written review content (optional). */
    @Column(columnDefinition = "TEXT")
    private String comment;

    /** URL of an optional photo attached to the review. */
    @Column(name = "image_url")
    private String imageUrl;

    /** Whether this review has been approved by an admin before being publicly visible. */
    @Column(name = "is_approved", nullable = false)
    @Builder.Default
    private Boolean isApproved = false;
}
