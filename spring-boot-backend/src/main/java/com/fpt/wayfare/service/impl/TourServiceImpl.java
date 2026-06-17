package com.fpt.wayfare.service.impl;

import com.fpt.wayfare.dto.TourUpdateRequest;
import com.fpt.wayfare.entity.Tour;
import com.fpt.wayfare.repository.TourRepository;
import com.fpt.wayfare.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TourServiceImpl implements TourService {

    private final TourRepository tourRepository;

    @Override
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    @Override
    public List<Tour> getActiveTours() {
        return tourRepository.findByIsActiveTrue();
    }

    @Override
    public Tour getTourById(Long id) {
        return tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found with id: " + id));
    }

    @Override
    @Transactional
    public Tour updateTour(Long id, TourUpdateRequest request) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found with id: " + id));

        tour.setTitle(request.getTitle());
        tour.setDescription(request.getDescription());
        tour.setPrice(request.getPrice());
        tour.setDurationDays(request.getDurationDays());
        tour.setDurationNights(request.getDurationNights());
        tour.setMaxCapacity(request.getMaxCapacity());
        tour.setAvailableSlots(request.getAvailableSlots());
        tour.setImageUrl(request.getImageUrl());

        return tourRepository.save(tour);
    }
}
