package com.fpt.wayfare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Table: payments
 * Stores payment details for a single Booking.
 *
 * Relationships:
 *   - One Payment  → One Booking  (OneToOne, FK booking_id lives here)
 *   - Many Payments → One User    (ManyToOne)
 */
@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment extends BaseEntity {

    /**
     * @OneToOne   → each Payment belongs to exactly one Booking.
     * @JoinColumn → FK column booking_id is in the payments table.
     * unique      → enforces the one-to-one constraint at the DB level.
     */
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private PaymentStatus status = PaymentStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false, length = 30)
    private PaymentMethod paymentMethod;

    /** Transaction ID returned by the payment gateway. */
    @Column(name = "transaction_id", length = 100)
    private String transactionId;

    /** Timestamp when the payment was successfully completed. */
    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    /** Optional note (e.g. failure reason or refund note). */
    @Column(length = 255)
    private String note;

    // ─────────────────────────── Enum ───────────────────────────────────

    public enum PaymentStatus {
        PENDING,   // Awaiting payment
        SUCCESS,   // Payment successful
        FAILED,    // Payment failed
        REFUNDED   // Amount has been refunded
    }

    public enum PaymentMethod {
        CASH,           // Cash on arrival
        BANK_TRANSFER,  // Bank wire transfer
        CREDIT_CARD,    // Credit / debit card
        MOMO,           // MoMo e-wallet
        VNPAY,          // VNPay gateway
        ZALOPAY         // ZaloPay gateway
    }
}
