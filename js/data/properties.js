/**
 * properties.js
 * Source-of-truth dataset for all property listings.
 * Every filter, search, sort, and detail view reads from this array —
 * nothing about a property is inferred from filenames or markup.
 */

export const properties = [
  {
    id: "property-001",
    title: "4 Bedroom Luxury Duplex",
    type: "duplex",
    purpose: "sale",
    location: { city: "Awka", state: "Anambra", area: "Ifite" },
    price: 85000000,
    bedrooms: 4,
    bathrooms: 5,
    area: 500,
    features: [
      "Swimming Pool",
      "BQ",
      "Fitted Kitchen",
      "Security",
      "Parking",
      "Garden",
    ],
    description:
      "A beautifully finished 4 bedroom duplex in the heart of Ifite, Awka. The home features a private swimming pool, a fully fitted kitchen, a boys' quarters, and round-the-clock estate security. Ideal for a family that wants space, comfort and a quiet, well-connected neighbourhood.",
    featured: true,
    dateListed: "2026-08-20",
    images: {
      cover: "/assets/images/properties/property-001/OO1-Cover.webp",
      gallery: [
        "/assets/images/properties/property-001/exterior-living-room.webp",
        "/assets/images/properties/property-001/OO1-Cover.webp",
        "/assets/images/properties/property-001/kitchen.webp",
        "/assets/images/properties/property-001/OO1-Cover.webp",
        "/assets/images/properties/property-001/exterior-living-room.webp",
      ],
    },
  },
  {
    id: "property-002",
    title: "3 Bedroom Terrace Duplex",
    type: "duplex",
    purpose: "rent",
    location: { city: "Awka", state: "Anambra", area: "Okpuno" },
    price: 3500000,
    bedrooms: 3,
    bathrooms: 4,
    area: 320,
    features: ["Fitted Kitchen", "Parking", "Security", "Prepaid Meter"],
    description:
      "Modern terrace duplex in a serene Okpuno close, available for rent. Comes with a fitted kitchen, ample parking, prepaid electricity meter and gated estate security — perfect for a young family or working professional.",
    featured: true,
    dateListed: "2026-08-15",
    images: {
      cover: "/assets/images/properties/property-002/office-Space.webp",
      gallery: [
        "/assets/images/properties/property-002/1-bedroom.webp",
        "/assets/images/properties/property-002/office-Space.webp",
        "/assets/images/properties/property-002/kitchen.svg",
        "/assets/images/properties/property-002/bedroom-02.svg",
      ],
    },
  },
  {
    id: "property-003",
    title: "2 Bedroom Serviced Apartment",
    type: "apartment",
    purpose: "rent",
    location: { city: "Awka", state: "Anambra", area: "Aroma" },
    price: 2200000,
    bedrooms: 2,
    bathrooms: 2,
    area: 110,
    features: ["Fitted Kitchen", "Elevator", "Security", "Water Treatment"],
    description:
      "A tastefully finished 2 bedroom serviced apartment near Aroma Roundabout. Close to shopping, banks and major roads, with an in-building water treatment plant and lift access.",
    featured: true,
    dateListed: "2026-08-25",
    images: {
      cover: "/assets/images/properties/property-003/2-bedroom.webp",
      gallery: [
        "/assets/images/properties/property-003/2-bedrooma.webp",
        "/assets/images/properties/property-003/2-bedroom.webp",
      ],
    },
  },
  {
    id: "property-004",
    title: "Half Plot of Land",
    type: "land",
    purpose: "sale",
    location: { city: "Awka", state: "Anambra", area: "Amawbia" },
    price: 15000000,
    bedrooms: 0,
    bathrooms: 0,
    area: 300,
    features: ["Fenced", "C of O", "Dry Land", "Motorable Road"],
    description:
      "A dry, fenced half plot in a fast-developing part of Amawbia, with a registered Certificate of Occupancy and direct access via a motorable road. Suitable for residential development.",
    featured: false,
    dateListed: "2026-07-30",
    images: {
      cover: "/assets/images/properties/property-004/half-plot.webp",
      gallery: [
        "/assets/images/properties/property-004/exterior-living-room.webp",
        "/assets/images/properties/property-004/sub-half-plot.webp",
      ],
    },
  },
  {
    id: "property-005",
    title: "Full Plot of Land",
    type: "land",
    purpose: "sale",
    location: { city: "Awka", state: "Anambra", area: "Nibo" },
    price: 22000000,
    bedrooms: 0,
    bathrooms: 0,
    area: 600,
    features: ["Fenced", "C of O", "Corner Piece", "Estate Layout"],
    description:
      "A full plot corner piece within an organised Nibo estate layout, fully fenced with a valid title. A strong option for a family home or long-term investment.",
    featured: false,
    dateListed: "2026-07-18",
    images: {
      cover: "/assets/images/properties/property-005/sub-half-plot.webp",
      gallery: [
        "/assets/images/properties/property-005/exterior-living-room.webp",
        "/assets/images/properties/property-005/kitchen.webp",
      ],
    },
  },
  {
    id: "property-006",
    title: "Commercial Shop Complex",
    type: "commercial",
    purpose: "rent",
    location: { city: "Awka", state: "Anambra", area: "Aroma" },
    price: 4800000,
    bedrooms: 0,
    bathrooms: 2,
    area: 250,
    features: ["Roadside Frontage", "Parking", "Security", "Generator House"],
    description:
      "A multi-unit shop complex directly on a busy Aroma road, with strong pedestrian and vehicle traffic, dedicated parking, and an on-site generator house.",
    featured: true,
    dateListed: "2026-08-10",
    images: {
      cover: "/assets/images/properties/property-006/commercial-shop.webp",
      gallery: [
        "/assets/images/properties/property-006/OO1-Cover.webp",
        "/assets/images/properties/property-006/exterior-living-room.webp",
      ],
    },
  },
  {
    id: "property-007",
    title: "5 Bedroom Detached House",
    type: "house",
    purpose: "sale",
    location: { city: "Awka", state: "Anambra", area: "Ifite" },
    price: 120000000,
    bedrooms: 5,
    bathrooms: 6,
    area: 650,
    features: [
      "Swimming Pool",
      "BQ",
      "Study Room",
      "Security",
      "Garden",
      "Parking",
    ],
    description:
      "An expansive 5 bedroom detached home in Ifite GRA with a private pool, dedicated study room, staff quarters and a mature garden — built for entertaining and long-term family living.",
    featured: true,
    dateListed: "2026-08-01",
    images: {
      cover: "/assets/images/properties/property-007/4-Bedroom-Duplex.webp",
      gallery: [
        "/assets/images/properties/property-007/4-Bedroom-Duplex.webp",
        "/assets/images/properties/property-007/exterior-living-room.webp",
      ],
    },
  },
  {
    id: "property-008",
    title: "1 Bedroom Mini Flat",
    type: "apartment",
    purpose: "rent",
    location: { city: "Awka", state: "Anambra", area: "Okpuno" },
    price: 900000,
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    features: ["Fitted Kitchen", "Parking", "Prepaid Meter"],
    description:
      "A compact, well-priced mini flat in Okpuno, ideal for a student or young professional starting out. Comes with a fitted kitchenette and prepaid electricity meter.",
    featured: false,
    dateListed: "2026-08-27",
    images: {
      cover: "/assets/images/properties/property-008/1-bedroom.webp",
      gallery: [
        "/assets/images/properties/property-008/exterior-living-room.webp",
        "/assets/images/properties/property-008/1-bedroom.webp",
      ],
    },
  },
  {
    id: "property-009",
    title: "3 Bedroom Bungalow",
    type: "house",
    purpose: "sale",
    location: { city: "Awka", state: "Anambra", area: "Amawbia" },
    price: 45000000,
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    features: ["Fitted Kitchen", "BQ", "Parking", "Fenced"],
    description:
      "A solidly built 3 bedroom bungalow on a fenced plot in Amawbia, with a boys' quarters and generous compound space — a comfortable, single-storey family home.",
    featured: false,
    dateListed: "2026-07-22",
    images: {
      cover: "/assets/images/properties/property-009/1-bedroom.webp",
      gallery: [
        "/assets/images/properties/property-009/exterior-living-room.webp",
        "/assets/images/properties/property-009/1-bedroom.webp",
      ],
    },
  },
  {
    id: "property-010",
    title: "Office Space in Business Complex",
    type: "commercial",
    purpose: "rent",
    location: { city: "Awka", state: "Anambra", area: "Awka" },
    price: 3200000,
    bedrooms: 0,
    bathrooms: 1,
    area: 90,
    features: ["Elevator", "Security", "Generator House", "Parking"],
    description:
      "A ready-to-use office suite within a modern Awka business complex, offering lift access, on-site security and backup power for uninterrupted work.",
    featured: false,
    dateListed: "2026-08-05",
    images: {
      cover: "/assets/images/properties/property-010/office-Space.webp",
      gallery: [
        "/assets/images/properties/property-010/1-bedroom.webp",
        "/assets/images/properties/property-010/office-Space.webp",
      ],
    },
  },
  {
    id: "property-011",
    title: "4 Bedroom Semi-Detached Duplex",
    type: "duplex",
    purpose: "sale",
    location: { city: "Awka", state: "Anambra", area: "Nibo" },
    price: 68000000,
    bedrooms: 4,
    bathrooms: 5,
    area: 420,
    features: ["Fitted Kitchen", "BQ", "Security", "Parking", "Estate Layout"],
    description:
      "A spacious semi-detached duplex within a secured Nibo estate, offering four generous bedrooms, a boys' quarters and dedicated parking for two vehicles.",
    featured: false,
    dateListed: "2026-08-12",
    images: {
      cover: "/assets/images/properties/property-011/4-Bedroom-Duplex.webp",
      gallery: [
        "/assets/images/properties/property-011/exterior-living-room.webp",
        "/assets/images/properties/property-011/kitchen.webp",
      ],
    },
  },
  {
    id: "property-012",
    title: "Quarter Plot of Land",
    type: "land",
    purpose: "sale",
    location: { city: "Awka", state: "Anambra", area: "Okpuno" },
    price: 8000000,
    bedrooms: 0,
    bathrooms: 0,
    area: 150,
    features: ["Dry Land", "C of O", "Motorable Road"],
    description:
      "An affordable, dry quarter plot in a growing Okpuno neighbourhood with a clean title and easy road access — a practical entry point into property ownership.",
    featured: false,
    dateListed: "2026-08-29",
    images: {
      cover: "/assets/images/properties/property-012/quarter-plot.webp",
      gallery: [
        "/assets/images/properties/property-012/quarter-plot.webp",
        "/assets/images/properties/property-012/sub-half-plot.webp",
      ],
    },
  },
];

/** Returns a single property by its id, or undefined if not found. */
export function getPropertyById(id) {
  return properties.find((p) => p.id === id);
}

/** Returns only the properties flagged as featured. */
export function getFeaturedProperties() {
  return properties.filter((p) => p.featured);
}

/**
 * Returns up to `limit` properties related to the given property,
 * scored by shared area, type and price proximity — never hand-picked.
 */
export function getRelatedProperties(property, limit = 3) {
  return properties
    .filter((p) => p.id !== property.id)
    .map((p) => {
      let score = 0;
      if (p.location.area === property.location.area) score += 3;
      if (p.type === property.type) score += 2;
      const priceDiff = Math.abs(p.price - property.price) / property.price;
      if (priceDiff < 0.35) score += 2;
      else if (priceDiff < 0.75) score += 1;
      if (p.purpose === property.purpose) score += 1;
      return { property: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.property);
}

/** Distinct list of areas present in the dataset, for filter dropdowns. */
export function getAvailableAreas() {
  return [...new Set(properties.map((p) => p.location.area))].sort();
}

/** Count of properties matching a given type, for category cards. */
export function countByType(type) {
  return properties.filter((p) => p.type === type).length;
}
