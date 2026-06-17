package com.fpt.wayfare.controller;

import com.fpt.wayfare.dto.TourRequest;
import com.fpt.wayfare.entity.Tour;
import com.fpt.wayfare.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tours")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TourController {

    private final TourService tourService;

    /** GET /api/tours — Public: get all active tours */
    @GetMapping
    public ResponseEntity<List<Tour>> getAllActiveTours() {
        return ResponseEntity.ok(tourService.getActiveTours());
    }

    /** GET /api/tours/all — Admin only: get all tours (including inactive) */
    @GetMapping("/all")
    public ResponseEntity<List<Tour>> getAllTours() {
        return ResponseEntity.ok(tourService.getAllTours());
    }

    /** GET /api/tours/{id} — Public: get a tour by id */
    @GetMapping("/{id}")
    public ResponseEntity<Tour> getTourById(@PathVariable Long id) {
        return ResponseEntity.ok(tourService.getTourById(id));
    }

    /** POST /api/tours — Admin only: create a new tour */
    @PostMapping
    public ResponseEntity<Tour> createTour(@RequestBody TourRequest request) {
        Tour created = tourService.createTour(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /** PUT /api/tours/{id} — Admin only: update an existing tour */
    @PutMapping("/{id}")
    public ResponseEntity<Tour> updateTour(@PathVariable Long id, @RequestBody TourRequest request) {
        Tour updated = tourService.updateTour(id, request);
        return ResponseEntity.ok(updated);
    }

    /** DELETE /api/tours/{id} — Admin only: soft-delete a tour */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return ResponseEntity.noContent().build();
    }

    /** PATCH /api/tours/{id}/toggle — Admin only: toggle active status of a tour */
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Void> toggleTourStatus(@PathVariable Long id) {
        tourService.toggleTourStatus(id);
        return ResponseEntity.ok().build();
    }
}
