const MockData = {
  routes: [
    {
      id: 1,
      name: 'Mont Blanc Circuit',
      description: 'Classic multi-day trek around Europe\'s highest peak',
      difficulty_level: 'intermediate',
      distance_km: 170,
      elevation_gain_m: 9500,
      estimated_days: 10,
      verification_status: 'verified',
      region: 'French Alps',
      season: 'summer',
      best_month: 'July-August',
      guides_available: 8,
      max_group_size: 12
    },
    {
      id: 2,
      name: 'Gran Paradiso',
      description: 'Alpine climbing experience in the Italian Alps',
      difficulty_level: 'advanced',
      distance_km: 45,
      elevation_gain_m: 2200,
      estimated_days: 4,
      verification_status: 'verified',
      region: 'Italian Alps',
      season: 'summer',
      best_month: 'June-September',
      guides_available: 5,
      max_group_size: 8
    },
    {
      id: 3,
      name: 'Säntis Loop',
      description: 'Family-friendly hiking in the Appenzell Alps',
      difficulty_level: 'beginner',
      distance_km: 28,
      elevation_gain_m: 1100,
      estimated_days: 2,
      verification_status: 'verified',
      region: 'Swiss Alps',
      season: 'spring-fall',
      best_month: 'May-September',
      guides_available: 12,
      max_group_size: 20
    },
    {
      id: 4,
      name: 'Ecrins Haute Route',
      description: 'Technical glacier traverse in the Ecrins massif',
      difficulty_level: 'advanced',
      distance_km: 195,
      elevation_gain_m: 11200,
      estimated_days: 12,
      verification_status: 'verified',
      region: 'French Alps',
      season: 'summer',
      best_month: 'July-August',
      guides_available: 6,
      max_group_size: 10
    },
    {
      id: 5,
      name: 'Matterhorn Challenge',
      description: 'Iconic Alpine summit with stunning views',
      difficulty_level: 'intermediate',
      distance_km: 15,
      elevation_gain_m: 1500,
      estimated_days: 2,
      verification_status: 'verified',
      region: 'Swiss-Italian border',
      season: 'summer',
      best_month: 'July-September',
      guides_available: 15,
      max_group_size: 8
    }
  ],

  products: [
    {
      id: 1,
      name: 'Weekend Escape - Mont Blanc',
      description: 'A perfect introduction to Alpine hiking with spectacular views',
      route_id: 1,
      price_base: 450,
      duration_days: 3,
      group_size_min: 4,
      group_size_max: 12,
      season: 'Summer',
      status: 'available',
      included: ['Accommodation', 'Meals', 'Guide']
    },
    {
      id: 2,
      name: 'Summit Quest - Matterhorn',
      description: 'Challenge yourself on one of the Alps\' most iconic peaks',
      route_id: 5,
      price_base: 650,
      duration_days: 2,
      group_size_min: 2,
      group_size_max: 8,
      season: 'Summer',
      status: 'available',
      included: ['Accommodation', 'Meals', 'Equipment', 'Guide']
    },
    {
      id: 3,
      name: 'Family Adventure - Säntis',
      description: 'Gentle alpine experience perfect for families and beginners',
      route_id: 3,
      price_base: 280,
      duration_days: 2,
      group_size_min: 2,
      group_size_max: 20,
      season: 'Spring-Fall',
      status: 'available',
      included: ['Accommodation', 'Meals', 'Guide']
    },
    {
      id: 4,
      name: 'Expert Glacier Tour - Ecrins',
      description: 'Advanced technical climbing for experienced mountaineers',
      route_id: 4,
      price_base: 1200,
      duration_days: 12,
      group_size_min: 4,
      group_size_max: 10,
      season: 'Summer',
      status: 'available',
      included: ['Accommodation', 'Meals', 'All Equipment', 'Expert Guide']
    }
  ],

  customers: [
    {
      id: 1,
      name: 'Anna Bergström',
      email: 'anna.bergstrom@email.com',
      country: 'Sweden',
      phone: '+46 701 234567',
      experience_level: 'intermediate',
      verification_status: 'verified',
      joined_date: '2024-02-15',
      completed_trips: 5
    },
    {
      id: 2,
      name: 'Marco Rossi',
      email: 'marco.rossi@email.com',
      country: 'Italy',
      phone: '+39 334 5678901',
      experience_level: 'advanced',
      verification_status: 'verified',
      joined_date: '2023-11-03',
      completed_trips: 12
    },
    {
      id: 3,
      name: 'Sophia Mueller',
      email: 'sophia.mueller@email.com',
      country: 'Switzerland',
      phone: '+41 44 1234567',
      experience_level: 'beginner',
      verification_status: 'verified',
      joined_date: '2024-06-20',
      completed_trips: 2
    },
    {
      id: 4,
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      country: 'France',
      phone: '+33 1 2345 6789',
      experience_level: 'intermediate',
      verification_status: 'pending',
      joined_date: '2024-07-01',
      completed_trips: 0
    }
  ],

  departures: [
    {
      id: 1,
      product_id: 1,
      route_id: 1,
      start_date: '2024-07-15',
      end_date: '2024-07-18',
      guide_id: 101,
      status: 'confirmed',
      current_participants: 8,
      max_participants: 12,
      price_per_person: 450
    },
    {
      id: 2,
      product_id: 2,
      route_id: 5,
      start_date: '2024-07-22',
      end_date: '2024-07-24',
      guide_id: 102,
      status: 'confirmed',
      current_participants: 6,
      max_participants: 8,
      price_per_person: 650
    },
    {
      id: 3,
      product_id: 3,
      route_id: 3,
      start_date: '2024-08-10',
      end_date: '2024-08-12',
      guide_id: 103,
      status: 'open',
      current_participants: 3,
      max_participants: 20,
      price_per_person: 280
    },
    {
      id: 4,
      product_id: 4,
      route_id: 4,
      start_date: '2024-08-01',
      end_date: '2024-08-13',
      guide_id: 104,
      status: 'confirmed',
      current_participants: 7,
      max_participants: 10,
      price_per_person: 1200
    }
  ],

  guides: [
    {
      id: 101,
      name: 'Carlos Montoya',
      specialization: 'High altitude',
      experience_years: 15,
      certifications: ['IFMGA', 'ASSE'],
      languages: ['Spanish', 'English', 'French'],
      rating: 4.9
    },
    {
      id: 102,
      name: 'Elena Karpov',
      specialization: 'Rock climbing',
      experience_years: 12,
      certifications: ['IFMGA', 'ASSE', 'IRATA'],
      languages: ['Russian', 'English', 'German'],
      rating: 4.8
    },
    {
      id: 103,
      name: 'Thomas Weber',
      specialization: 'Family hiking',
      experience_years: 8,
      certifications: ['SBV', 'ASSE'],
      languages: ['German', 'English', 'French'],
      rating: 4.7
    },
    {
      id: 104,
      name: 'Amélie Rousseau',
      specialization: 'Glacier touring',
      experience_years: 18,
      certifications: ['IFMGA', 'ASSE', 'UIAGM'],
      languages: ['French', 'English', 'Italian'],
      rating: 4.95
    }
  ],

  stats: {
    total_routes: 5,
    total_customers: 4,
    active_departures: 4,
    total_guides: 4,
    avg_customer_rating: 4.85,
    total_trips_completed: 19
  }
};