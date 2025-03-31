
import { VillageProps } from "@/components/VillageCard";

export const villages: VillageProps[] = [
  {
    id: "1",
    name: "Hallstatt",
    location: "Upper Austria",
    country: "Austria",
    description: "Hallstatt is a charming village nestled between mountains and a crystal clear lake. Known for its salt production since prehistoric times, it's now a UNESCO World Heritage site with picturesque wooden houses and alpine views.",
    population: 780,
    imageUrl: "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Alpine", "Lakeside", "Historical", "UNESCO"]
  },
  {
    id: "2",
    name: "Oia",
    location: "Santorini",
    country: "Greece",
    description: "Perched on the cliffs of Santorini, Oia is famous for its stunning sunset views, white-washed buildings with blue domes, and narrow winding streets. The village overlooks the vast Aegean Sea and the volcanic caldera.",
    population: 1500,
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Coastal", "Scenic", "Mediterranean", "Island"]
  },
  {
    id: "3",
    name: "Shirakawa-go",
    location: "Gifu Prefecture",
    country: "Japan",
    description: "Shirakawa-go is known for its traditional gassho-zukuri farmhouses, some of which are more than 250 years old. The steep thatched roofs are designed to withstand heavy snow, creating a fairy-tale landscape, especially in winter.",
    population: 1630,
    imageUrl: "https://images.unsplash.com/photo-1579260146297-ceb5e2235f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Traditional", "UNESCO", "Mountain", "Historical"]
  },
  {
    id: "4",
    name: "Bibury",
    location: "Gloucestershire",
    country: "United Kingdom",
    description: "Described by William Morris as 'the most beautiful village in England', Bibury is a charming Cotswold village. Its honey-colored stone cottages along Arlington Row are among the most photographed scenes in the Cotswolds.",
    population: 627,
    imageUrl: "https://images.unsplash.com/photo-1621682372775-533449e550ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Countryside", "Historical", "Quaint", "Scenic"]
  },
  {
    id: "5",
    name: "Manarola",
    location: "Cinque Terre",
    country: "Italy",
    description: "Manarola is one of the five villages that make up the Cinque Terre on the Italian Riviera. It's characterized by colorful houses perched on a cliff overlooking the Mediterranean. The village is surrounded by vineyards and has a small harbor with crystal clear waters.",
    population: 450,
    imageUrl: "https://images.unsplash.com/photo-1596627118123-de3a54d640a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Coastal", "Colorful", "Mediterranean", "UNESCO"]
  },
  {
    id: "6",
    name: "Giethoorn",
    location: "Overijssel",
    country: "Netherlands",
    description: "Often referred to as the 'Venice of the North', Giethoorn is a car-free village where transportation happens via waterways and bicycles. Thatched-roof cottages sit on small private islands connected by over 170 wooden bridges.",
    population: 2620,
    imageUrl: "https://images.unsplash.com/photo-1584637906893-5a492635a70a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Waterways", "Peaceful", "Car-free", "Scenic"]
  },
  {
    id: "7",
    name: "Reine",
    location: "Lofoten Islands",
    country: "Norway",
    description: "Nestled in the Lofoten archipelago, Reine is a fishing village surrounded by dramatic mountain peaks and Arctic waters. Its red and white fishermen's huts (rorbuer) are set against a backdrop of clear blue waters and snow-capped mountains.",
    population: 314,
    imageUrl: "https://images.unsplash.com/photo-1516375733604-a53b0071098e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Arctic", "Fishing", "Mountains", "Scenic"]
  },
  {
    id: "8",
    name: "Alberobello",
    location: "Puglia",
    country: "Italy",
    description: "Alberobello is known for its unique trulli - whitewashed stone huts with conical roofs. These distinctive structures, now UNESCO-protected, create an otherworldly landscape that draws visitors from around the globe.",
    population: 10735,
    imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Trulli", "UNESCO", "Unique", "Historical"]
  }
];

export const getVillageById = (id: string): VillageProps | undefined => {
  return villages.find(village => village.id === id);
};

export const searchVillages = (query: string): VillageProps[] => {
  const lowercaseQuery = query.toLowerCase();
  return villages.filter(village => 
    village.name.toLowerCase().includes(lowercaseQuery) ||
    village.location.toLowerCase().includes(lowercaseQuery) ||
    village.country.toLowerCase().includes(lowercaseQuery) ||
    village.description.toLowerCase().includes(lowercaseQuery) ||
    village.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
