package com.fpt.wayfare.service.impl;

import com.fpt.wayfare.entity.Tour;
import com.fpt.wayfare.repository.TourRepository;
import com.fpt.wayfare.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
