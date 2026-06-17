package com.fpt.wayfare.service.impl;

import com.fpt.wayfare.dto.TourRequest;
import com.fpt.wayfare.entity.Category;
import com.fpt.wayfare.entity.Destination;
import com.fpt.wayfare.entity.Tour;
import com.fpt.wayfare.repository.CategoryRepository;
import com.fpt.wayfare.repository.DestinationRepository;
import com.fpt.wayfare.repository.TourRepository;
import com.fpt.wayfare.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TourServiceImpl implements TourService {

    private final TourRepository tourRepository;
    private final DestinationRepository destinationRepository;
    private final CategoryRepository categoryRepository;

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
    public Tour createTour(TourRequest request) {
        Destination destination = destinationRepository.findById(request.getDestinationId())
                .orElseThrow(() -> new RuntimeException("Destination not found with id: " + request.getDestinationId()));

        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));
        }

        Tour tour = Tour.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .durationDays(request.getDurationDays())
                .durationNights(request.getDurationNights() != null ? request.getDurationNights() : request.getDurationDays() - 1)
                .maxCapacity(request.getMaxCapacity() != null ? request.getMaxCapacity() : 20)
                .availableSlots(request.getAvailableSlots() != null ? request.getAvailableSlots() : request.getMaxCapacity())
                .imageUrl(request.getImageUrl())
                .isActive(true)
                .averageRating(BigDecimal.ZERO)
                .reviewCount(0)
                .destination(destination)
                .category(category)
                .build();

        return tourRepository.save(tour);
    }

    @Override
    @Transactional
    public Tour updateTour(Long id, TourRequest request) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found with id: " + id));

        if (request.getTitle() != null) tour.setTitle(request.getTitle());
        if (request.getDescription() != null) tour.setDescription(request.getDescription());
        if (request.getPrice() != null) tour.setPrice(request.getPrice());
        if (request.getDurationDays() != null) tour.setDurationDays(request.getDurationDays());
        if (request.getDurationNights() != null) tour.setDurationNights(request.getDurationNights());
        if (request.getMaxCapacity() != null) tour.setMaxCapacity(request.getMaxCapacity());
        if (request.getAvailableSlots() != null) tour.setAvailableSlots(request.getAvailableSlots());
        if (request.getImageUrl() != null) tour.setImageUrl(request.getImageUrl());

        if (request.getDestinationId() != null) {
            Destination destination = destinationRepository.findById(request.getDestinationId())
                    .orElseThrow(() -> new RuntimeException("Destination not found"));
            tour.setDestination(destination);
        }

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            tour.setCategory(category);
        }

        return tourRepository.save(tour);
    }

    @Override
    @Transactional
    public void deleteTour(Long id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found with id: " + id));

        tour.setIsActive(false);
        tourRepository.save(tour);
    }

    @Override
    @Transactional
    public void toggleTourStatus(Long id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found with id: " + id));

        tour.setIsActive(!Boolean.TRUE.equals(tour.getIsActive()));
        tourRepository.save(tour);
    }
}
