package com.fpt.wayfare.config;

import com.fpt.wayfare.entity.Category;
import com.fpt.wayfare.entity.Destination;
import com.fpt.wayfare.entity.Tour;
import com.fpt.wayfare.repository.CategoryRepository;
import com.fpt.wayfare.repository.DestinationRepository;
import com.fpt.wayfare.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final TourRepository tourRepository;
    private final DestinationRepository destinationRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Clearing old data...");
        tourRepository.deleteAll();
        destinationRepository.deleteAll();
        categoryRepository.deleteAll();
        
        System.out.println("Seeding new sample data...");
        seedData();
    }

    private void seedData() {
        // Create Categories
        Category cultural = categoryRepository.save(Category.builder().name("Cultural").description("Immerse in local traditions").isActive(true).build());
        Category adventure = categoryRepository.save(Category.builder().name("Adventure").description("Thrill-seeking experiences").isActive(true).build());
        Category beach = categoryRepository.save(Category.builder().name("Beach & Resort").description("Relaxing coastal getaways").isActive(true).build());
        Category nature = categoryRepository.save(Category.builder().name("Nature").description("Breathtaking landscapes").isActive(true).build());

        // Create Destinations
        Destination halong = destinationRepository.save(Destination.builder().name("Ha Long Bay").country("Vietnam").city("Quang Ninh").description("A UNESCO World Heritage site known for its emerald waters.").imageUrl("assets/halong.jpg").isFeatured(true).build());
        Destination hoian = destinationRepository.save(Destination.builder().name("Hoi An").country("Vietnam").city("Quang Nam").description("A well-preserved example of a Southeast Asian trading port.").imageUrl("assets/hoian.jpg").isFeatured(true).build());
        Destination danang = destinationRepository.save(Destination.builder().name("Da Nang").country("Vietnam").city("Da Nang").description("Known for its sandy beaches and history as a French colonial port.").imageUrl("assets/danang.jpg").isFeatured(true).build());
        Destination sapa = destinationRepository.save(Destination.builder().name("Sa Pa").country("Vietnam").city("Lao Cai").description("Famous for its trekking and beautiful mountain scenery.").imageUrl("assets/sapa.jpg").isFeatured(true).build());
        Destination phuquoc = destinationRepository.save(Destination.builder().name("Phu Quoc").country("Vietnam").city("Kien Giang").description("Tropical paradise with white sandy beaches and clear waters.").imageUrl("assets/phuquoc.jpg").isFeatured(true).build());
        Destination hue = destinationRepository.save(Destination.builder().name("Hue").country("Vietnam").city("Thua Thien Hue").description("Historic capital city known for its Imperial City and tombs.").imageUrl("assets/hue.jpg").isFeatured(true).build());

        // Create Tours
        Tour t1 = Tour.builder()
                .title("Ha Long Bay 2-Day Luxury Cruise")
                .description("Experience the majestic Ha Long Bay on a luxury 5-star cruise. Enjoy fine dining, kayaking, and visiting spectacular caves.")
                .price(new BigDecimal("3500000.00"))
                .durationDays(2).durationNights(1)
                .maxCapacity(30).availableSlots(15)
                .imageUrl("assets/halong.jpg")
                .averageRating(new BigDecimal("4.80")).reviewCount(120)
                .destination(halong).category(nature).isActive(true)
                .build();

        Tour t2 = Tour.builder()
                .title("Hoi An Ancient Town Walking Tour")
                .description("Discover the magic of Hoi An by walking through its colorful streets decorated with lanterns. Taste the famous Cao Lau.")
                .price(new BigDecimal("800000.00"))
                .durationDays(1).durationNights(0)
                .maxCapacity(20).availableSlots(10)
                .imageUrl("assets/hoian.jpg")
                .averageRating(new BigDecimal("4.90")).reviewCount(85)
                .destination(hoian).category(cultural).isActive(true)
                .build();

        Tour t3 = Tour.builder()
                .title("Da Nang & Ba Na Hills Adventure")
                .description("Take the spectacular cable car to Ba Na Hills and walk on the famous Golden Bridge held by giant stone hands.")
                .price(new BigDecimal("1500000.00"))
                .durationDays(1).durationNights(0)
                .maxCapacity(25).availableSlots(5)
                .imageUrl("assets/danang.jpg")
                .averageRating(new BigDecimal("4.70")).reviewCount(200)
                .destination(danang).category(adventure).isActive(true)
                .build();

        Tour t4 = Tour.builder()
                .title("Sa Pa 3-Day Trekking Experience")
                .description("Trek through the stunning rice terraces of Sa Pa and interact with local ethnic minority communities.")
                .price(new BigDecimal("2200000.00"))
                .durationDays(3).durationNights(2)
                .maxCapacity(15).availableSlots(8)
                .imageUrl("assets/sapa.jpg")
                .averageRating(new BigDecimal("4.60")).reviewCount(45)
                .destination(sapa).category(adventure).isActive(true)
                .build();

        Tour t5 = Tour.builder()
                .title("Phu Quoc 4-Day Island Retreat")
                .description("Relax on the pristine beaches of Phu Quoc island. Includes a snorkeling trip to coral reefs and a visit to a pearl farm.")
                .price(new BigDecimal("5500000.00"))
                .durationDays(4).durationNights(3)
                .maxCapacity(40).availableSlots(20)
                .imageUrl("assets/phuquoc.jpg")
                .averageRating(new BigDecimal("4.95")).reviewCount(300)
                .destination(phuquoc).category(beach).isActive(true)
                .build();

        Tour t6 = Tour.builder()
                .title("Imperial Hue Heritage Tour")
                .description("Step back in time to the Nguyen Dynasty. Visit the Imperial Citadel, Royal Tombs, and cruise along the Perfume River.")
                .price(new BigDecimal("1200000.00"))
                .durationDays(1).durationNights(0)
                .maxCapacity(20).availableSlots(12)
                .imageUrl("assets/hue.jpg")
                .averageRating(new BigDecimal("4.50")).reviewCount(60)
                .destination(hue).category(cultural).isActive(true)
                .build();

        tourRepository.saveAll(List.of(t1, t2, t3, t4, t5, t6));
        System.out.println("Sample data seeded successfully!");
    }
}
