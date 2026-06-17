package com.fpt.wayfare.controller;

import com.fpt.wayfare.entity.Tour;
import com.fpt.wayfare.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/tours")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") 
public class TourController {

    private final TourService tourService;

    
    @GetMapping
    public ResponseEntity<List<Tour>> getAllActiveTours() {
        List<Tour> tours = tourService.getActiveTours();
        return ResponseEntity.ok(tours);
    }

   
    @GetMapping("/{id}")
    public ResponseEntity<Tour> getTourById(@PathVariable Long id) {
        Tour tour = tourService.getTourById(id);
        return ResponseEntity.ok(tour);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return ResponseEntity.noContent().build();
    }
}
