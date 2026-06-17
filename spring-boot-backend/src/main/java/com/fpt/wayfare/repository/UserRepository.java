package com.fpt.wayfare.repository;

import com.fpt.wayfare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find user by email
     * @param email user email
     * @return Optional containing the user if found
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Find user by username
     * @param username user username
     * @return Optional containing the user if found
     */
    Optional<User> findByUsername(String username);
    
    /**
     * Check if user exists by email
     * @param email user email
     * @return true if user exists, false otherwise
     */
    boolean existsByEmail(String email);
    
    /**
     * Check if user exists by username
     * @param username user username
     * @return true if user exists, false otherwise
     */
    boolean existsByUsername(String username);
}
