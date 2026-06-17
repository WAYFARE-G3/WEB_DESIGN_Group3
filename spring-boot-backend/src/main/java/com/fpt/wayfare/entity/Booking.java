package com.fpt.wayfare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Table: bookings
 * Represents a customer's tour reservation.
 *
 * Relationships:
 *   - Many Bookings → One User    (ManyToOne)
 *   - Many Bookings → One Tour    (ManyToOne)
 *   - One  Booking  → One Payment (OneToOne, FK on Payment side)
 */
@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking extends BaseEntity {

    /**
     * fetch = EAGER → User data is loaded immediately with the Booking.
     * @JoinColumn   → FK column user_id lives in the bookings table.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    /** Departure date chosen by the customer. */
    @NotNull
    @FutureOrPresent
    @Column(name = "travel_date", nullable = false)
    private LocalDate travelDate;

    @NotNull
    @Min(1)
    @Column(name = "number_of_people", nullable = false)
    private Integer numberOfPeople;

    /** Total price = tour.price × numberOfPeople; computed in the service layer. */
    @Column(name = "total_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private BookingStatus status = BookingStatus.PENDING;

    /** Optional notes or special requests from the customer. */
    @Column(columnDefinition = "TEXT")
    private String notes;

    // ─────────────────────────── Relationships ───────────────────────────

    /**
     * mappedBy  → the FK (booking_id) is owned by the Payment entity.
     * cascade   → deleting a Booking also deletes its Payment.
     */
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Payment payment;

    // ─────────────────────────── Enum ───────────────────────────────────

    public enum BookingStatus {
        PENDING,    // Awaiting confirmation
        CONFIRMED,  // Confirmed by admin
        CANCELLED,  // Cancelled by user or admin
        COMPLETED   // Tour has been completed
    }
}
