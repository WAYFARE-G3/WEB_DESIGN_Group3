package com.fpt.wayfare.service;

import com.fpt.wayfare.entity.Tour;
import com.fpt.wayfare.dto.TourRequest;
import java.util.List;

public interface TourService {
    /** Retrieve all tours from the database. */
    List<Tour> getAllTours();

    /** Retrieve all active tours. */
    List<Tour> getActiveTours();

    /** Find a tour by its ID. */
    Tour getTourById(Long id);

    /** Create a new tour (Admin only). */
    Tour createTour(TourRequest request);

    /** Update an existing tour (Admin only). */
    Tour updateTour(Long id, TourRequest request);

    /** Soft-delete a tour by marking it inactive (Admin only). */
    void deleteTour(Long id);

    /** Toggle the active status of a tour (Admin only). */
    void toggleTourStatus(Long id);
}
