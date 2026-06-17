package com.fpt.wayfare.service;

import com.fpt.wayfare.dto.TourUpdateRequest;
import com.fpt.wayfare.entity.Tour;

import java.util.List;

public interface TourService {
    List<Tour> getAllTours();

    List<Tour> getActiveTours();

    Tour getTourById(Long id);

    Tour updateTour(Long id, TourUpdateRequest request);
}
