package com.fpt.wayfare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Table: users
 *
 * Relationships:
 *   - One User    → Many Bookings   (OneToMany)
 *   - One User    → Many Reviews    (OneToMany)
 *   - One User    → Many Payments   (OneToMany)
 */
@Entity
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_users_email",    columnNames = "email"),
        @UniqueConstraint(name = "uk_users_username", columnNames = "username")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @NotBlank
    @Size(min = 3, max = 50)
    @Column(nullable = false, length = 50)
    private String username;

    @NotBlank
    @Email
    @Column(nullable = false, length = 100)
    private String email;

    /** Password hashed with BCrypt — never store plain text. */
    @NotBlank
    @Size(min = 6)
    @Column(nullable = false)
    private String password;

    @Column(name = "full_name", length = 100)
    private String fullName;

    @Column(length = 20)
    private String phone;

    @Column(name = "avatar_url")
    private String avatarUrl;

    /** User role stored as a String in the DB (e.g. "ADMIN"). */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private Role role = Role.USER;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    // ─────────────────────────── Relationships ───────────────────────────

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Booking> bookings = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Payment> payments = new ArrayList<>();

    // ─────────────────────────── Enum ───────────────────────────────────

    public enum Role {
        USER,       // Regular customer
        ADMIN,      // System administrator
        MODERATOR   // Content moderator
    }
}
