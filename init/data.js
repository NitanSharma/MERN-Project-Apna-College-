// init folder is use for initialize database or data containing file

const sampleListings = [
    {
      title: "Beachfront Villa",
      description: "A luxurious villa with stunning ocean views.",
      image: "https://images.unsplash.com/photo-1737991959098-abdff2d5bb7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
      price: 500000,
      location: "Malibu",
      country: "USA"
    },
    {
      title: "Mountain Cabin",
      description: "Cozy cabin nestled in the scenic mountains.",
      image: "https://images.unsplash.com/photo-1738162571972-d8337de941e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
      price: 250000,
      location: "Aspen",
      country: "USA"
    },
    {
      title: "Urban Apartment",
      description: "Modern apartment located in the heart of the city.",
      image: "https://images.unsplash.com/photo-1737898415581-7dea57a1905b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 300000,
      location: "Berlin",
      country: "Germany"
    },
    {
      title: "Lake House",
      description: "Peaceful retreat by the serene lake.",
      image: "https://picsum.photos/200/300?random=4",
      price: 450000,
      location: "Ontario",
      country: "Canada"
    },
    {
      title: "Desert Oasis",
      description: "A unique property in the middle of the desert.",
      image: "https://picsum.photos/200/300?random=5",
      price: 400000,
      location: "Dubai",
      country: "UAE"
    },
    {
      title: "Tropical Bungalow",
      description: "Relax in this tropical paradise near the beach.",
      image: "https://picsum.photos/200/300?random=6",
      price: 350000,
      location: "Bali",
      country: "Indonesia"
    },
    {
      title: "Countryside Cottage",
      description: "Charming cottage surrounded by lush greenery.",
      image: "https://picsum.photos/200/300?random=7",
      price: 220000,
      location: "Somerset",
      country: "UK"
    },
    {
      title: "Historic Chateau",
      description: "Live in a castle with a rich history.",
      image: "https://picsum.photos/200/300?random=8",
      price: 700000,
      location: "Bordeaux",
      country: "France"
    },
    {
      title: "Ski Resort Chalet",
      description: "Luxury chalet at a world-class ski resort.",
      image:"https://picsum.photos/200/300?random=9",
      price: 600000,
      location: "Zermatt",
      country: "Switzerland"
    },
    {
      title: "City Loft",
      description: "Spacious loft with a modern industrial vibe.",
      image: "https://picsum.photos/200/300?random=10",
      price: 320000,
      location: "New York City",
      country: "USA"
    },
    {
      title: "Beachfront Villa",
      description: "A luxurious villa with stunning ocean views.",
      image: "https://picsum.photos/200/300?random=11",
      price: 500000,
      location: "Malibu",
      country: "USA"
    },
    {
      title: "Mountain Cabin",
      description: "Cozy cabin nestled in the scenic mountains.",
      image: "https://picsum.photos/200/300?random=12",
      price: 250000,
      location: "Aspen",
      country: "USA"
    },
    {
      title: "Urban Apartment",
      description: "Modern apartment located in the heart of the city.",
      image: "https://picsum.photos/200/300?random=13",
      price: 300000,
      location: "Berlin",
      country: "Germany"
    },
    {
      title: "Lake House",
      description: "Peaceful retreat by the serene lake.",
      image: "https://picsum.photos/200/300?random=14",
      price: 450000,
      location: "Ontario",
      country: "Canada"
    },
    {
      title: "Desert Oasis",
      description: "A unique property in the middle of the desert.",
      image:"https://picsum.photos/200/300?random=15",
      price: 400000,
      location: "Dubai",
      country: "UAE"
    },
    {
      title: "Tropical Bungalow",
      description: "Relax in this tropical paradise near the beach.",
      image: "https://picsum.photos/200/300?random=16",
      price: 350000,
      location: "Bali",
      country: "Indonesia"
    },
    {
      title: "Countryside Cottage",
      description: "Charming cottage surrounded by lush greenery.",
      image: "https://picsum.photos/200/300?random=17",
      price: 220000,
      location: "Somerset",
      country: "UK"
    },
    {
      title: "Historic Chateau",
      description: "Live in a castle with a rich history.",
      image: "https://picsum.photos/200/300?random=18",
      price: 700000,
      location: "Bordeaux",
      country: "France"
    },
    {
      title: "Ski Resort Chalet",
      description: "Luxury chalet at a world-class ski resort.",
      image: "https://picsum.photos/200/300?random=19",
      price: 600000,
      location: "Zermatt",
      country: "Switzerland"
    },
    {
      title: "City Loft",
      description: "Spacious loft with a modern industrial vibe.",
      image: "https://picsum.photos/200/300?random=20",
      price: 320000,
      location: "New York City",
      country: "USA"
    },
    {
      title: "Luxury Penthouse",
      description: "A high-rise penthouse with breathtaking city views.",
      image: "https://picsum.photos/200/300?random=21",
      price: 850000,
      location: "Tokyo",
      country: "Japan"
    },
    {
      title: "Private Island",
      description: "Own a private island with white sandy beaches.",
      image: "https://picsum.photos/200/300?random=22",
      price: 5000000,
      location: "Maldives",
      country: "Maldives"
    },
    {
      title: "Modern Townhouse",
      description: "Stylish townhouse in a vibrant neighborhood.",
      image: "https://picsum.photos/200/300?random=23",
      price: 400000,
      location: "Sydney",
      country: "Australia"
    },
    {
      title: "Hilltop Retreat",
      description: "A peaceful home with panoramic hilltop views.",
      image:"https://picsum.photos/200/300?random=24",
      price: 380000,
      location: "Wellington",
      country: "New Zealand"
    },
    {
      title: "Rustic Farmhouse",
      description: "Charming farmhouse surrounded by farmland.",
      image: "https://picsum.photos/200/300?random=25",
      price: 275000,
      location: "Texas",
      country: "USA"
    },
    {
      title: "Seaside Cottage",
      description: "A picturesque cottage by the sea.",
      image:"https://picsum.photos/200/300?random=26",
      price: 350000,
      location: "Cornwall",
      country: "UK"
    },
    {
      title: "Luxury Mansion",
      description: "An extravagant mansion with top-tier amenities.",
      image: "https://picsum.photos/200/300?random=27",
      price: 2000000,
      location: "Los Angeles",
      country: "USA"
    },
    {
      title: "Eco-Friendly Home",
      description: "Sustainable living with solar power and green tech.",
      image: "https://picsum.photos/200/300?random=28",
      price: 450000,
      location: "Stockholm",
      country: "Sweden"
    },
    {
      title: "Jungle Treehouse",
      description: "A unique treehouse in a lush jungle setting.",
      image:"https://picsum.photos/200/300?random=29",
      price: 180000,
      location: "Amazon Rainforest",
      country: "Brazil"
    },
    {
      title: "Bohemian Studio",
      description: "A stylish, artsy studio in the heart of the city.",
      image: "https://picsum.photos/200/300?random=30",
      price: 280000,
      location: "Barcelona",
      country: "Spain"
    },
    {
      title: "Luxury Yurt",
      description: "A traditional yet luxurious yurt in the countryside.",
      image: "https://picsum.photos/200/300?random=31",
      price: 120000,
      location: "Mongolia",
      country: "Mongolia"
    },
    {
      title: "Skyline Apartment",
      description: "A high-rise apartment with breathtaking city views.",
      image: "https://picsum.photos/200/300?random=32",
      price: 750000,
      location: "Dubai",
      country: "UAE"
    },
    {
      title: "Lakeside Cabin",
      description: "A cozy cabin with direct lake access.",
      image: "https://picsum.photos/200/300?random=33",
      price: 280000,
      location: "Lake Tahoe",
      country: "USA"
    },
    {
      title: "Gothic Castle",
      description: "A historic castle with medieval architecture.",
      image: "https://picsum.photos/200/300?random=34",
      price: 900000,
      location: "Edinburgh",
      country: "Scotland"
    },
    {
      title: "Modern Glass House",
      description: "A futuristic home with a sleek glass design.",
      image: "https://images.unsplash.com/photo-1737991878092-d3be52a76735?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D",
      price: 950000,
      location: "San Francisco",
      country: "USA"
    },
    {
      title: "Sailing Yacht Home",
      description: "Live on a luxury yacht with ocean views.",
      image: "https://images.unsplash.com/photo-1735252723552-138dc3fb6f14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
      price: 3500000,
      location: "Monaco",
      country: "Monaco"
    },
    {
      title: "Hidden Jungle Villa",
      description: "A tranquil villa deep in the jungle.",
      image: "https://plus.unsplash.com/premium_photo-1738090991182-dd746e5da0c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D",
      price: 320000,
      location: "Borneo",
      country: "Malaysia"
    },
    {
      title: "Rooftop Condo",
      description: "A modern condo with an expansive rooftop terrace.",
      image: "https://images.unsplash.com/photo-1736890722772-97aab67379a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
      price: 600000,
      location: "Miami",
      country: "USA"
    },
    {
      title: "Futuristic Pod Home",
      description: "An innovative pod home with smart technology.",
      image: "https://images.unsplash.com/photo-1737991878092-d3be52a76735?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
      price: 500000,
      location: "Seoul",
      country: "South Korea"
    }
  ];
  
// export data
module.exports = {data : sampleListings}
  