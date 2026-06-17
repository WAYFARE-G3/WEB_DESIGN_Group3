package com.fpt.wayfare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Main Application Class - Entry point for WayFare Backend
 */
@SpringBootApplication
@EnableJpaAuditing
public class WayFareApplication {

    public static void main(String[] args) {
        SpringApplication.run(WayFareApplication.class, args);
    }
}
