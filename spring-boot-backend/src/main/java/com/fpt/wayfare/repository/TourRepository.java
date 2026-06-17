package com.fpt.wayfare.repository;

import com.fpt.wayfare.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    
    /**
     * Finds all tours that are currently active.
     * @return a list of active tours
     */
    List<Tour> findByIsActiveTrue();
}
