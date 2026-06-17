const destinations = [
  {
    id: "halong",
    name: "Ha Long Bay",
    country: "Quang Ninh",
    region: "North",
    style: "Beach",
    rating: 4.9,
    price: 3290,
    image: "assets/halong.jpg",
    description: "Thousands of limestone islands rising from emerald waters.",
    longDescription: "Ha Long Bay is a UNESCO World Heritage Site where nearly two thousand limestone karsts rise from jade-green waters. Spend a night on a boutique cruise, kayak into hidden lagoons, and watch the bay turn gold at sunrise — one of Vietnam's most unforgettable landscapes.",
    highlights: ["Overnight cruise among limestone karsts", "Kayak through hidden lagoons and caves", "Visit Sung Sot Cave and Titov Island", "Fresh seafood dinners on deck"],
    bestTime: "October – April",
    duration: "2–3 days recommended",
  },
  {
    id: "sapa",
    name: "Sa Pa",
    country: "Lao Cai",
    region: "North",
    style: "Mountain",
    rating: 4.8,
    price: 2480,
    image: "assets/sapa.jpg",
    description: "Terraced rice fields drifting in and out of the mist.",
    longDescription: "Sa Pa sits high in the Hoang Lien Son range, where terraced rice fields cascade down misty valleys and ethnic minority villages preserve centuries-old traditions. Trek to Fansipan, share tea with local families, and breathe in the cool mountain air.",
    highlights: ["Trek the Muong Hoa Valley terraces", "Fansipan summit by foot or cable car", "Visit Hmong and Dao villages", "Homestay with local families"],
    bestTime: "March – May, September – November",
    duration: "3–4 days recommended",
  },
  {
    id: "hanoi",
    name: "Hanoi",
    country: "Capital",
    region: "North",
    style: "Culture",
    rating: 4.7,
    price: 1890,
    image: "assets/hanoi.jpg",
    description: "A thousand-year-old old quarter, lanterns, and egg coffee.",
    longDescription: "Vietnam's capital blends French colonial elegance with a buzzing Old Quarter. Wander narrow lanes of shophouses, sip egg coffee by Hoan Kiem Lake, and discover temples, street food, and a nightlife scene that never quite sleeps.",
    highlights: ["Old Quarter food walk with a local guide", "Hoan Kiem Lake and Ngoc Son Temple", "Water puppet theatre performance", "Hidden alley cafés and egg coffee"],
    bestTime: "October – April",
    duration: "2–3 days recommended",
  },
  {
    id: "hue",
    name: "Hue",
    country: "Thua Thien Hue",
    region: "Central",
    style: "Culture",
    rating: 4.7,
    price: 2150,
    image: "assets/hue.jpg",
    description: "An imperial city with citadels and the poetic Perfume River.",
    longDescription: "Hue was the seat of the Nguyen Dynasty, and its Imperial Citadel, royal tombs, and pagodas still echo with history. Drift along the Perfume River at dusk and taste the refined cuisine that once graced the emperor's table.",
    highlights: ["Imperial Citadel and Forbidden Purple City", "Royal tombs along the Perfume River", "Thien Mu Pagoda at sunset", "Imperial-style cuisine tasting"],
    bestTime: "January – August",
    duration: "2 days recommended",
  },
  {
    id: "hoian",
    name: "Hoi An",
    country: "Quang Nam",
    region: "Central",
    style: "Culture",
    rating: 4.9,
    price: 2390,
    image: "assets/hoian.jpg",
    description: "A lantern-lit ancient town along the Thu Bon River.",
    longDescription: "Hoi An's UNESCO-listed Ancient Town glows with silk lanterns, yellow-walled merchant houses, and riverside cafés. Tailors stitch custom outfits in days, cooking classes reveal central Vietnamese flavors, and An Bang Beach is a short ride away.",
    highlights: ["Lantern-lit Ancient Town evening walk", "Custom tailoring and silk shopping", "Cooking class with market visit", "Basket boat ride in Cam Thanh coconut forest"],
    bestTime: "February – August",
    duration: "2–3 days recommended",
  },
  {
    id: "danang",
    name: "Da Nang",
    country: "Da Nang",
    region: "Central",
    style: "Adventure",
    rating: 4.8,
    price: 2790,
    image: "assets/danang.jpg",
    description: "The Golden Bridge and Ba Na Hills above the clouds.",
    longDescription: "Da Nang is central Vietnam's coastal hub — a city of beaches, bridges, and mountain escapes. Ride the cable car to Ba Na Hills, walk the iconic Golden Bridge held by giant stone hands, and unwind on the white sands of My Khe.",
    highlights: ["Golden Bridge and Ba Na Hills cable car", "My Khe Beach and Son Tra Peninsula", "Marble Mountains exploration", "Dragon Bridge fire-breathing show (weekends)"],
    bestTime: "February – August",
    duration: "2–3 days recommended",
  },
  {
    id: "phuquoc",
    name: "Phu Quoc",
    country: "Kien Giang",
    region: "South",
    style: "Beach",
    rating: 4.8,
    price: 3150,
    image: "assets/phuquoc.jpg",
    description: "White-sand beaches and blazing sunsets on the island paradise.",
    longDescription: "Phu Quoc is Vietnam's largest island — a tropical escape of powder-white beaches, coral reefs, and pepper farms. Snorkel in turquoise waters, watch blood-orange sunsets, and savor fresh seafood straight from the fishing boats.",
    highlights: ["Long Beach and Sao Beach swimming", "Snorkeling and island-hopping tours", "Phu Quoc pepper farm visit", "Sunset seafood dinner on the pier"],
    bestTime: "November – March",
    duration: "3–4 days recommended",
  },
];

const blogPosts = [
  { title: "10 Best Beaches in Vietnam for 2026", excerpt: "From Phu Quoc and Con Dao to the untouched bays of Quy Nhon — beaches you cannot miss.", image: "assets/phuquoc.jpg", author: "Mai Anh", date: "Jun 4, 2026", tag: "Beach" },
  { title: "Sa Pa Guide for First-Time Visitors", excerpt: "Best seasons, Fansipan by foot or cable car, and villages worth visiting.", image: "assets/sapa.jpg", author: "Hoang Nam", date: "May 28, 2026", tag: "Mountain" },
  { title: "Ha Long Bay: 2 Days 1 Night on a Cruise", excerpt: "Cruise tiers compared, sample routes, and photo tips for this natural wonder.", image: "assets/halong.jpg", author: "Le Thu", date: "May 19, 2026", tag: "Northern Vietnam" },
  { title: "48 Hours in Hanoi — A Food Lover's Edition", excerpt: "Bun cha, street pho, egg coffee, and the sidewalk spots locals actually love.", image: "assets/hanoi.jpg", author: "Tran Binh", date: "May 11, 2026", tag: "Food" },
  { title: "Hoi An & Da Nang: The Perfect 4-Day Itinerary", excerpt: "How to combine the old town, My Khe Beach, and Ba Na Hills without burnout.", image: "assets/hoian.jpg", author: "Ngoc Ha", date: "Apr 30, 2026", tag: "Central Vietnam" },
  { title: "Chasing Clouds at Ba Na & the Golden Bridge at Dawn", excerpt: "Early-start tips, cabin picks, and photo angles most travelers miss.", image: "assets/danang.jpg", author: "Pham Vu", date: "Apr 22, 2026", tag: "Adventure" },
];

const itinerary = [
  { day: 1, title: "Arrive in Hanoi", desc: "Land at Noi Bai Airport and transfer to a boutique hotel in the Old Quarter. Evening stroll around Hoan Kiem Lake and bun cha with your guide." },
  { day: 2, title: "Ha Long Bay", desc: "Head to Ha Long, board a 5-star cruise, kayak through Sung Sot Cave, and watch sunset among thousands of limestone islets." },
  { day: 3, title: "Fly to Da Nang – Hoi An", desc: "Fly to central Vietnam and check in at a My Khe beach resort. Afternoon walk through lantern-lit Hoi An and float a candle on the Thu Bon River." },
  { day: 4, title: "Ba Na Hills & Golden Bridge", desc: "Ride the cable car to Ba Na, photograph the legendary Golden Bridge, and explore the French Village and Fantasy Park." },
  { day: 5, title: "Sa Pa & Departure", desc: "Fly back to Hanoi, then take an overnight train or drive to Sa Pa to see the Muong Hoa terraces before saying goodbye to Vietnam." },
];

function getDestinationById(id) {
  return destinations.find((d) => d.id === id);
}

function formatPrice(price) {
  return price.toLocaleString("en-US") + "K VND";
}

function renderStars(rating) {
  const filled = Math.round(rating);
  let html = `<div class="stars" aria-label="${rating} stars">`;
  for (let i = 0; i < 5; i++) {
    const color = i < filled ? "var(--star)" : "var(--border)";
    const fill = i < filled ? "var(--star)" : "transparent";
    html += `<svg class="stars__icon" viewBox="0 0 24 24" fill="${fill}" stroke="${color}" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }
  html += `<span class="stars__rating">${rating.toFixed(1)}</span></div>`;
  return html;
}
