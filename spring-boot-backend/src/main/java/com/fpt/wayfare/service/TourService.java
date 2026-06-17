package com.fpt.wayfare.service;

import com.fpt.wayfare.entity.Tour;
import java.util.List;

public interface TourService {
    /**
     * Retrieve all tours from the database.
     * @return List of all tours.
     */
    List<Tour> getAllTours();

    /**
     * Retrieve all active tours.
     * @return List of active tours.
     */
    List<Tour> getActiveTours();

    /**
     * Find a tour by its ID.
     * @param id The ID of the tour.
     * @return The Tour entity if found.
     */
    Tour getTourById(Long id);
}
