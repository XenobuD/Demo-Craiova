import React, { useEffect,useState } from 'react';
import { Camera, MapPin, Search, Star, QrCode, BarChart3, Edit, Plus, Eye, Scan, Heart, Clock, Tag, ArrowLeft, Menu, Home, User, Grid, Sparkles } from 'lucide-react';

// Demo data for Craiova businesses
const DEMO_BUSINESSES = [
  {
    id: 1,
    name: "Mercur Restaurant",
    category: "restaurant",
    subcategory: "restaurant",
    description: "Traditional Romanian cuisine in the heart of Craiova. Experience authentic flavors from Oltenia region.",
    address: "Str. Alexandru Ioan Cuza 15, Craiova",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    rating: 4.8,
    offers: 2,
    views: 1243,
    studentDiscount: true
  },
  {
    id: 2,
    name: "Café Romantik",
    category: "cafe",
    subcategory: "cafe",
    description: "Cozy café with specialty coffee and homemade pastries. Free WiFi and outdoor seating.",
    address: "Calea Unirii 45, Craiova",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
    rating: 4.6,
    offers: 1,
    views: 876,
    studentDiscount: true
  },
  {
    id: 3,
    name: "Oltenia Fashion Boutique",
    category: "shop",
    subcategory: "clothing",
    description: "Curated fashion from local and international designers. New collections every season.",
    address: "Bulevardul Carol I 28, Craiova",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    rating: 4.5,
    offers: 3,
    views: 654,
    studentDiscount: true
  },
  {
    id: 4,
    name: "Art Craiova Gallery",
    category: "museum",
    subcategory: "museum",
    description: "Contemporary art exhibitions featuring local Romanian artists. Open vernissages every Friday.",
    address: "Str. Mihail Kogălniceanu 7, Craiova",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    rating: 4.9,
    offers: 1,
    views: 432,
    studentDiscount: true
  },
  {
    id: 5,
    name: "Salon Elegance",
    category: "service",
    subcategory: "beauty",
    description: "Premium hair salon and spa services. Book your appointment online or walk in.",
    address: "Str. George Enescu 34, Craiova",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    rating: 4.7,
    offers: 2,
    views: 789,
    studentDiscount: false
  },
  {
    id: 6,
    name: "Mega Image Craiova",
    category: "shop",
    subcategory: "grocery",
    description: "Fresh products daily. Wide selection of Romanian and international brands.",
    address: "Str. Unirii 102, Craiova",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800",
    rating: 4.3,
    offers: 2,
    views: 1567,
    studentDiscount: false
  },
  {
    id: 7,
    name: "Fashion Days Store",
    category: "shop",
    subcategory: "clothing",
    description: "Latest fashion trends at affordable prices. Shoes, accessories, and more.",
    address: "Electroputere Mall, Craiova",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
    rating: 4.4,
    offers: 1,
    views: 892,
    studentDiscount: true
  },
  {
    id: 8,
    name: "Instalator Pro Craiova",
    category: "service",
    subcategory: "plumbing",
    description: "Professional plumbing services. Emergency repairs 24/7. Licensed and insured.",
    address: "Str. Dezrobirii 45, Craiova",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800",
    rating: 4.9,
    offers: 1,
    views: 456,
    studentDiscount: false
  },
  {
    id: 9,
    name: "Electric Solutions SRL",
    category: "service",
    subcategory: "electrician",
    description: "Certified electricians for home and business. Installation, repair, and maintenance.",
    address: "Calea București 78, Craiova",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800",
    rating: 4.7,
    offers: 0,
    views: 623,
    studentDiscount: false
  },
  {
    id: 10,
    name: "Muzeul de Artă Craiova",
    category: "museum",
    subcategory: "museum",
    description: "Historic museum featuring Romanian art from 18th-20th century. Beautiful palace architecture.",
    address: "Str. Unirii 15, Craiova",
    image: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=800",
    rating: 4.8,
    offers: 1,
    views: 2134,
    studentDiscount: true
  },
  {
    id: 11,
    name: "Muzeul Olteniei",
    category: "museum",
    subcategory: "museum",
    description: "Natural history, ethnography, and regional history. Perfect for families and students.",
    address: "Bulevardul Decebal 14, Craiova",
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b6970a3b?w=800",
    rating: 4.6,
    offers: 1,
    views: 1876,
    studentDiscount: true
  }
];

const DEMO_OFFERS = [
  { id: 1, businessId: 1, title: "20% Off Lunch Menu", description: "Valid Monday-Friday 12:00-15:00", validUntil: "2026-02-28", scans: 45, studentOnly: false },
  { id: 2, businessId: 1, title: "Student Discount 10%", description: "Show your student ID card", validUntil: "2026-12-31", scans: 134, studentOnly: true },
  { id: 3, businessId: 2, title: "Buy 2 Get 1 Free", description: "On all specialty coffees", validUntil: "2026-02-20", scans: 67, studentOnly: false },
  { id: 4, businessId: 2, title: "Student Special 10% Off", description: "Valid with student ID", validUntil: "2026-12-31", scans: 98, studentOnly: true },
  { id: 5, businessId: 3, title: "Spring Sale 30% Off", description: "All winter collection items", validUntil: "2026-03-31", scans: 89, studentOnly: false },
  { id: 6, businessId: 3, title: "Student Discount 10%", description: "Show your legitimație de student", validUntil: "2026-12-31", scans: 156, studentOnly: true },
  { id: 7, businessId: 5, title: "First Visit 25% Off", description: "New clients only", validUntil: "2026-04-30", scans: 56, studentOnly: false },
  { id: 8, businessId: 4, title: "Student Entry 10% Off", description: "Present student card at entrance", validUntil: "2026-12-31", scans: 287, studentOnly: true },
  { id: 9, businessId: 6, title: "Weekly Fresh Deals", description: "Check in-store for special prices", validUntil: "2026-03-31", scans: 234, studentOnly: false },
  { id: 10, businessId: 7, title: "Student Fashion 10%", description: "Discount on all items with student ID", validUntil: "2026-12-31", scans: 145, studentOnly: true },
  { id: 11, businessId: 10, title: "Student Museum Pass 10% Off", description: "Valid for all exhibitions", validUntil: "2026-12-31", scans: 456, studentOnly: true },
  { id: 12, businessId: 11, title: "Student Discount 10%", description: "Education first - show your ID", validUntil: "2026-12-31", scans: 389, studentOnly: true },
  { id: 13, businessId: 8, title: "First Repair Discount", description: "10% off your first service call", validUntil: "2026-06-30", scans: 23, studentOnly: false }
];

// Logo Component for Craiova - Professional Blue/White Design
const CraiovaLogo = ({ size = 'large' }) => {
  const dimensions = size === 'large' ? 'w-32 h-32' : 'w-16 h-16';
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${dimensions} relative`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
          {/* Gradient background */}
          <defs>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          
          {/* Main circle - gradient blue */}
          <circle cx="100" cy="100" r="95" fill="url(#blueGrad)" />
          
          {/* White inner circle */}
          <circle cx="100" cy="100" r="75" fill="white" />
          
          {/* Stylized 'C' for Craiova - blue */}
          <path d="M 100 35 A 65 65 0 1 0 100 165" fill="none" stroke="url(#blueGrad)" strokeWidth="14" strokeLinecap="round" />
          
          {/* Crown symbol - gold */}
          <g transform="translate(100, 90)">
            <path d="M -25 -15 L -20 -5 L -15 -15 L -10 -5 L 0 -20 L 10 -5 L 15 -15 L 20 -5 L 25 -15 L 25 0 L -25 0 Z" 
                  fill="url(#goldGrad)" stroke="#1e40af" strokeWidth="1.5" />
            {/* Crown jewels */}
            <circle cx="-15" cy="-8" r="2" fill="#1e40af" />
            <circle cx="0" cy="-12" r="2.5" fill="#1e40af" />
            <circle cx="15" cy="-8" r="2" fill="#1e40af" />
          </g>
          
          {/* Decorative stars */}
          <path d="M 50 50 L 51.5 54 L 55.5 54 L 52.5 56.5 L 54 60.5 L 50 58 L 46 60.5 L 47.5 56.5 L 44.5 54 L 48.5 54 Z" fill="white" opacity="0.3" />
          <path d="M 150 50 L 151.5 54 L 155.5 54 L 152.5 56.5 L 154 60.5 L 150 58 L 146 60.5 L 147.5 56.5 L 144.5 54 L 148.5 54 Z" fill="white" opacity="0.3" />
        </svg>
      </div>
      {size === 'large' && (
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
            Discover Craiova
          </h1>
          <p className="text-sm text-gray-600 font-medium">Orașul tău. Ofertele tale.</p>
        </div>
      )}
    </div>
  );
};

// Subcategory definitions
const SUBCATEGORIES = {
  shop: [
    { id: 'all', label: 'All Shops', icon: '🏪' },
    { id: 'grocery', label: 'Alimentar', icon: '🛒' },
    { id: 'clothing', label: 'Haine', icon: '👔' }
  ],
  service: [
    { id: 'all', label: 'All Services', icon: '🔧' },
    { id: 'beauty', label: 'Înfrumusețare', icon: '💇' },
    { id: 'plumbing', label: 'Instalator', icon: '🚰' },
    { id: 'electrician', label: 'Electrician', icon: '⚡' }
  ],
  museum: [
    { id: 'all', label: 'All Museums', icon: '🏛️' }
  ],
  restaurant: [
    { id: 'all', label: 'All Restaurants', icon: '🍽️' }
  ],
  cafe: [
    { id: 'all', label: 'All Cafés', icon: '☕' }
  ]
};

// Category Filter Component with subcategories
const CategoryFilter = ({ activeCategory, activeSubcategory, onCategoryChange, onSubcategoryChange }) => {
  const categories = [
    { id: 'all', label: 'All', icon: Grid },
    { id: 'student', label: 'Student Offers', icon: '🎓' },
    { id: 'restaurant', label: 'Restaurants', icon: '🍽️' },
    { id: 'cafe', label: 'Cafés', icon: '☕' },
    { id: 'shop', label: 'Shops', icon: '🛍️' },
    { id: 'service', label: 'Services', icon: '🔧' },
    { id: 'museum', label: 'Muzee', icon: '🏛️' }
  ];

  const hasSubcategories = activeCategory !== 'all' && activeCategory !== 'student' && SUBCATEGORIES[activeCategory];

  return (
    <div className="bg-white border-b border-gray-100">
      {/* Main Categories */}
      <div className="flex gap-2 overflow-x-auto pb-3 pt-3 px-4 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              onCategoryChange(cat.id);
              onSubcategoryChange('all');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all shadow-sm ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md scale-105'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {typeof cat.icon === 'string' ? (
              <span className="text-base">{cat.icon}</span>
            ) : (
              <cat.icon size={16} />
            )}
            <span className="text-sm font-semibold">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Subcategories */}
      {hasSubcategories && (
        <div className="flex gap-2 overflow-x-auto pb-3 px-4 scrollbar-hide border-t border-gray-100 pt-2 bg-gray-50">
          {SUBCATEGORIES[activeCategory].map(subcat => (
            <button
              key={subcat.id}
              onClick={() => onSubcategoryChange(subcat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-xs ${
                activeSubcategory === subcat.id
                  ? 'bg-blue-100 text-blue-700 font-semibold border border-blue-200'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{subcat.icon}</span>
              <span>{subcat.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Business Card Component
const BusinessCard = ({ business, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-all transform hover:scale-[1.01] border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={business.image} 
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {business.offers > 0 && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Sparkles size={12} />
              {business.offers} {business.offers === 1 ? 'Offer' : 'Offers'}
            </div>
          )}
          {business.studentDiscount && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              🎓 Student 10%
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg text-gray-800 flex-1">{business.name}</h3>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full ml-2">
            <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
            <span className="text-sm font-semibold text-gray-700">{business.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{business.description}</p>
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <MapPin size={14} className="text-blue-600" />
          <span className="truncate">{business.address}</span>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function Craiova() {

  const [currentScreen, setCurrentScreen] = useState('splash'); // splash, home, detail, qr, b2b, b2b-edit, student
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  // Simulate splash screen
  React.useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('home'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Filter businesses
  const filteredBusinesses = DEMO_BUSINESSES.filter(b => {
    // Student filter - show only businesses with student discounts
    if (activeCategory === 'student') {
      return b.studentDiscount && 
             (b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    // Category filter
    const matchesCategory = activeCategory === 'all' || b.category === activeCategory;
    
    // Subcategory filter
    const matchesSubcategory = activeSubcategory === 'all' || b.subcategory === activeSubcategory;
    
    // Search filter
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  // SPLASH SCREEN
  if (currentScreen === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="text-center animate-pulse z-10">
          <CraiovaLogo size="large" />
          <div className="mt-8">
            <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-white via-blue-200 to-white rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
            </div>
            <p className="text-white/80 text-sm mt-4 font-medium">Loading your city...</p>
          </div>
        </div>
        <style>{`
          @keyframes loading {
            0% { width: 0%; margin-left: 0%; }
            50% { width: 75%; margin-left: 25%; }
            100% { width: 0%; margin-left: 100%; }
          }
        `}</style>
      </div>
    );
  }

  // HOME SCREEN - PUBLIC (NO LOGIN)
  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white px-4 pt-12 pb-6 shadow-xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <CraiovaLogo size="small" />
              <button 
                onClick={() => setCurrentScreen('b2b')}
                className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-all flex items-center gap-2 border border-white/30 shadow-lg"
              >
                <User size={16} />
                Business Login
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Caută restaurante, cafenele, magazine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg font-medium"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="sticky top-0 z-20 shadow-sm">
          <CategoryFilter 
            activeCategory={activeCategory} 
            activeSubcategory={activeSubcategory}
            onCategoryChange={setActiveCategory}
            onSubcategoryChange={setActiveSubcategory}
          />
        </div>

        {/* Business Grid */}
        <div className="px-4 pb-24 pt-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-700">
              {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'} 
              {activeCategory === 'student' && ' with student discounts'}
            </div>
            {activeCategory === 'student' && (
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-amber-200">
                🎓 Student Mode
              </div>
            )}
          </div>
          <div className="grid gap-4">
            {filteredBusinesses.map(business => (
              <BusinessCard
                key={business.id}
                business={business}
                onClick={() => {
                  setSelectedBusiness(business);
                  setCurrentScreen('detail');
                }}
              />
            ))}
          </div>
          
          {filteredBusinesses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-around items-center shadow-xl z-30">
          <button className="flex flex-col items-center gap-1 text-blue-600">
            <Home size={24} />
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button 
            onClick={() => {
              setActiveCategory('student');
              setActiveSubcategory('all');
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeCategory === 'student' ? 'text-amber-600' : 'text-gray-400 hover:text-blue-600'
            }`}
          >
            <div className="text-2xl">🎓</div>
            <span className="text-xs font-semibold">Student</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('qr')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <QrCode size={24} />
            <span className="text-xs font-semibold">Scan QR</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors">
            <MapPin size={24} />
            <span className="text-xs font-semibold">Map</span>
          </button>
        </div>
      </div>
    );
  }

  // BUSINESS DETAIL SCREEN
  if (currentScreen === 'detail' && selectedBusiness) {
    const businessOffers = DEMO_OFFERS.filter(o => o.businessId === selectedBusiness.id);
    const studentOffers = businessOffers.filter(o => o.studentOnly);
    const regularOffers = businessOffers.filter(o => !o.studentOnly);
    
    return (
      <div className="min-h-screen bg-white">
        {/* Header Image */}
        <div className="relative h-80">
          <img 
            src={selectedBusiness.image} 
            alt={selectedBusiness.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <button
            onClick={() => setCurrentScreen('home')}
            className="absolute top-6 left-4 bg-white/95 backdrop-blur-md p-2.5 rounded-full shadow-xl hover:bg-white transition-all border border-gray-100"
          >
            <ArrowLeft size={24} className="text-gray-800" />
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">{selectedBusiness.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                <span className="text-sm font-bold text-gray-800">{selectedBusiness.rating}</span>
              </div>
              <span className="text-white text-sm capitalize bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md font-semibold border border-white/30">
                {selectedBusiness.category}
              </span>
              {selectedBusiness.studentDiscount && (
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center gap-1">
                  🎓 Student Friendly
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 space-y-6 pb-8">
          {/* Description */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-2xl border border-blue-100">
            <h2 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
              About
            </h2>
            <p className="text-gray-700 leading-relaxed">{selectedBusiness.description}</p>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
              Location
            </h2>
            <div className="flex items-start gap-3 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <MapPin size={20} className="text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{selectedBusiness.address}</p>
                <button className="text-blue-600 text-sm font-semibold mt-2 hover:text-blue-700 transition-colors">
                  Get Directions →
                </button>
              </div>
            </div>
          </div>

          {/* Student Offers - Priority display */}
          {studentOffers.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                🎓 Student Offers ({studentOffers.length})
              </h2>
              <div className="space-y-3">
                {studentOffers.map(offer => (
                  <div 
                    key={offer.id}
                    onClick={() => {
                      setSelectedOffer(offer);
                      setCurrentScreen('qr');
                    }}
                    className="bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500 text-white p-5 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all transform hover:scale-[1.02] border-2 border-amber-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">
                          LEGITIMAȚIE DE STUDENT NECESARĂ
                        </div>
                        <h3 className="font-bold text-xl">{offer.title}</h3>
                      </div>
                      <QrCode size={28} className="flex-shrink-0" />
                    </div>
                    <p className="text-white/95 mb-3">{offer.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5 bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Clock size={14} />
                        <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                      </div>
                      <div className="bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-full font-semibold">
                        {offer.scans} scans
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Active Offers */}
          {regularOffers.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                <Sparkles size={20} className="text-blue-600" />
                Active Offers ({regularOffers.length})
              </h2>
              <div className="space-y-3">
                {regularOffers.map(offer => (
                  <div 
                    key={offer.id}
                    onClick={() => {
                      setSelectedOffer(offer);
                      setCurrentScreen('qr');
                    }}
                    className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-5 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all transform hover:scale-[1.02]"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg flex-1">{offer.title}</h3>
                      <QrCode size={24} className="flex-shrink-0" />
                    </div>
                    <p className="text-white/90 mb-3">{offer.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Clock size={12} />
                        <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                      </div>
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full font-semibold">
                        Tap to scan QR
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {businessOffers.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-gray-600 font-medium">No active offers at the moment</p>
              <p className="text-sm text-gray-500 mt-1">Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // QR CODE SCREEN
  if (currentScreen === 'qr') {
    const isStudentOffer = selectedOffer?.studentOnly;
    
    return (
      <div className={`min-h-screen ${
        isStudentOffer 
          ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600' 
          : 'bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800'
      } flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
        {/* Decorative background */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        
        <button
          onClick={() => setCurrentScreen(selectedOffer ? 'detail' : 'home')}
          className="absolute top-6 left-4 bg-white/25 backdrop-blur-md p-2.5 rounded-full border border-white/30 hover:bg-white/35 transition-all z-10"
        >
          <ArrowLeft size={24} className="text-white" />
        </button>

        <div className="text-center mb-8 relative z-10">
          <div className="text-5xl mb-4">{isStudentOffer ? '🎓' : '🎁'}</div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            {selectedOffer ? (isStudentOffer ? 'Student Offer' : 'Your Offer QR Code') : 'Scan QR Code'}
          </h1>
          <p className="text-white/90 font-medium">
            {selectedOffer ? (isStudentOffer ? 'Show legitimație + QR code' : 'Show this to the business') : 'Point your camera at the QR code'}
          </p>
        </div>

        {/* QR Code Display */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl mb-6 relative z-10 border-4 border-white/50">
          <div className="w-64 h-64 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 200 200" className="w-full h-full p-2">
              {/* Simplified QR code pattern */}
              <rect x="0" y="0" width="200" height="200" fill="white"/>
              {[...Array(10)].map((_, i) => 
                [...Array(10)].map((_, j) => (
                  <rect
                    key={`${i}-${j}`}
                    x={i * 20}
                    y={j * 20}
                    width="18"
                    height="18"
                    fill={Math.random() > 0.5 ? "black" : "white"}
                  />
                ))
              )}
              {/* Corner markers */}
              <rect x="10" y="10" width="50" height="50" fill="black"/>
              <rect x="20" y="20" width="30" height="30" fill="white"/>
              <rect x="140" y="10" width="50" height="50" fill="black"/>
              <rect x="150" y="20" width="30" height="30" fill="white"/>
              <rect x="10" y="140" width="50" height="50" fill="black"/>
              <rect x="20" y="150" width="30" height="30" fill="white"/>
              
              {/* Center logo area */}
              <rect x="80" y="80" width="40" height="40" fill="white"/>
              <circle cx="100" cy="100" r="15" fill={isStudentOffer ? "#f59e0b" : "#2563eb"}/>
            </svg>
          </div>
        </div>

        {selectedOffer && (
          <div className={`${
            isStudentOffer 
              ? 'bg-amber-900/30 border-amber-300/30' 
              : 'bg-white/15 border-white/30'
          } backdrop-blur-md text-white p-6 rounded-2xl text-center max-w-sm relative z-10 border-2`}>
            <h3 className="font-bold text-2xl mb-3">{selectedOffer.title}</h3>
            <p className="text-white/95 mb-4 text-lg">{selectedOffer.description}</p>
            {isStudentOffer && (
              <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl mb-3 border border-white/30">
                <p className="text-sm font-semibold flex items-center justify-center gap-2">
                  <span className="text-xl">📖</span>
                  Prezintă legitimația de student
                </p>
              </div>
            )}
            <div className="text-sm bg-white/25 backdrop-blur-sm px-4 py-2.5 rounded-xl inline-block border border-white/30">
              <Clock size={16} className="inline mr-2" />
              Valid until {new Date(selectedOffer.validUntil).toLocaleDateString('ro-RO')}
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-white/80 relative z-10">
          <Scan size={28} className="mx-auto mb-3 animate-pulse" />
          <p className="font-semibold text-lg">Total scans: {selectedOffer ? selectedOffer.scans : '---'}</p>
          {isStudentOffer && (
            <p className="text-sm mt-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
              Student verification required
            </p>
          )}
        </div>
      </div>
    );
  }

  // B2B LOGIN/DASHBOARD SCREEN
  if (currentScreen === 'b2b') {
    const myBusiness = DEMO_BUSINESSES[0]; // Demo: logged in as Mercur Restaurant
    const myOffers = DEMO_OFFERS.filter(o => o.businessId === myBusiness.id);

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white px-4 pt-12 pb-6 shadow-xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentScreen('home')}
                className="bg-white/20 backdrop-blur-md p-2.5 rounded-full border border-white/30 hover:bg-white/30 transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold">Business Dashboard</h1>
              <button className="bg-white/20 backdrop-blur-md p-2.5 rounded-full border border-white/30 hover:bg-white/30 transition-all">
                <Menu size={20} />
              </button>
            </div>
            
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/30 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-lg border-2 border-white/50">
                  <img src={myBusiness.image} alt={myBusiness.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-xl mb-1">{myBusiness.name}</h2>
                  <p className="text-white/80 text-sm mb-2 flex items-center gap-1">
                    <MapPin size={14} />
                    {myBusiness.address}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="bg-white/25 backdrop-blur-sm px-3 py-1 rounded-full font-semibold border border-white/30">
                      📞 +40 251 123 456
                    </div>
                    <div className="bg-green-500/80 backdrop-blur-sm px-3 py-1 rounded-full font-semibold border border-white/30">
                      ✓ Active
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="px-4 py-6 grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Eye size={20} className="text-blue-600" />
              </div>
              <span className="text-sm text-gray-600 font-medium">Total Views</span>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{myBusiness.views.toLocaleString()}</p>
            <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
              <span>↑ 12%</span>
              <span className="text-gray-400">this week</span>
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Scan size={20} className="text-purple-600" />
              </div>
              <span className="text-sm text-gray-600 font-medium">QR Scans</span>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">
              {myOffers.reduce((sum, o) => sum + o.scans, 0)}
            </p>
            <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
              <span>↑ 8%</span>
              <span className="text-gray-400">this week</span>
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Star size={20} className="text-amber-500" />
              </div>
              <span className="text-sm text-gray-600 font-medium">Rating</span>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{myBusiness.rating}</p>
            <p className="text-xs text-gray-500 font-medium">Based on 124 reviews</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                <Tag size={20} className="text-pink-600" />
              </div>
              <span className="text-sm text-gray-600 font-medium">Active Offers</span>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{myOffers.length}</p>
            <p className="text-xs text-gray-500 font-medium">Running now</p>
          </div>
        </div>

        {/* My Offers Section */}
        <div className="px-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
              My Offers
            </h3>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-md">
              <Plus size={16} />
              New Offer
            </button>
          </div>

          <div className="space-y-3">
            {myOffers.map(offer => (
              <div key={offer.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-gray-800">{offer.title}</h4>
                      {offer.studentOnly && (
                        <span className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-bold border border-amber-200">
                          🎓 Student
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{offer.description}</p>
                  </div>
                  <button className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock size={12} />
                    Until {new Date(offer.validUntil).toLocaleDateString('ro-RO')}
                  </span>
                  <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-semibold">
                    <Scan size={12} />
                    {offer.scans} scans
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-24">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-3 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Edit size={24} className="text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Edit Profile</span>
            </button>
            <button className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-3 hover:shadow-md hover:border-purple-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <QrCode size={24} className="text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">QR Codes</span>
            </button>
            <button className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-3 hover:shadow-md hover:border-green-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <BarChart3 size={24} className="text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Analytics</span>
            </button>
            <button className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-3 hover:shadow-md hover:border-pink-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                <Camera size={24} className="text-pink-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Add Photos</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ color: 'red', fontSize: 30 }}>Craiova Merge 🔥
    </div>
  );
}
