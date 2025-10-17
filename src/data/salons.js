// Base de dados de salões cadastrados
export const salonsDatabase = [
  {
    id: 1,
    name: 'Barbearia Elegance',
  image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&h=300&fit=crop&crop=center',
    address: 'Rua das Flores, 123 - Centro',
    city: 'São Paulo',
    rating: 4.8,
    reviews: 127,
    phone: '(11) 98765-4321',
    whatsapp: '5511987654321',
    hours: 'Seg-Sex: 9h-20h | Sáb: 9h-18h',
    services: ['Corte Masculino', 'Barba', 'Coloração'],
    prices: {
      'Corte Masculino': 35,
      'Barba': 25,
      'Coloração': 80
    },
    specialties: ['Cortes clássicos', 'Barbas tradicionais'],
    badge: 'Top Rated',
    color: 'from-blue-500 to-indigo-600',
    description: 'Barbearia tradicional com mais de 15 anos de experiência. Especializada em cortes clássicos e modernos para o público masculino.',
    amenities: ['Estacionamento', 'Ar-condicionado', 'Wi-Fi'],
    owner: 'João Silva'
  },
  {
    id: 2,
    name: 'Salão Beleza Pura',
  image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=300&fit=crop&crop=center',
    address: 'Av. Paulista, 456 - Bela Vista',
    city: 'São Paulo',
    rating: 4.9,
    reviews: 203,
    phone: '(11) 97654-3210',
    whatsapp: '5511976543210',
    hours: 'Seg-Sex: 8h-19h | Sáb: 8h-17h',
    services: ['Corte Feminino', 'Manicure', 'Escova', 'Hidratação'],
    prices: {
      'Corte Feminino': 60,
      'Manicure': 30,
      'Escova': 45,
      'Hidratação': 80
    },
    specialties: ['Tratamentos capilares', 'Coloração feminina'],
    badge: 'Premium',
    color: 'from-purple-500 to-pink-600',
    description: 'Salão feminino completo com atendimento personalizado. Ambiente aconchegante e profissionais altamente qualificados.',
    amenities: ['Estacionamento', 'Ar-condicionado', 'Wi-Fi', 'Café'],
    owner: 'Maria Santos'
  },
  {
    id: 3,
    name: 'Studio Hair Premium',
  image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&h=300&fit=crop&crop=center',
    address: 'Rua Augusta, 789 - Consolação',
    city: 'São Paulo',
    rating: 4.7,
    reviews: 89,
    phone: '(11) 96543-2109',
    whatsapp: '5511965432109',
    hours: 'Seg-Sex: 10h-21h | Sáb: 9h-18h',
    services: ['Corte Unissex', 'Tratamentos', 'Coloração', 'Progressiva'],
    prices: {
      'Corte Unissex': 50,
      'Tratamentos': 120,
      'Coloração': 150,
      'Progressiva': 200
    },
    specialties: ['Transformações capilares', 'Técnicas avançadas'],
    badge: 'Trending',
    color: 'from-emerald-500 to-teal-600',
    description: 'Studio moderno focado em transformações capilares. Utilizamos produtos premium e técnicas avançadas.',
    amenities: ['Estacionamento', 'Ar-condicionado', 'Wi-Fi', 'Área de espera'],
    owner: 'Carlos Oliveira'
  },
  {
    id: 4,
    name: 'Barbearia Vintage',
  image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=300&fit=crop&crop=center',
    address: 'Rua dos Barbeiros, 321 - Vila Madalena',
    city: 'São Paulo',
    rating: 4.6,
    reviews: 156,
    phone: '(11) 95432-1098',
    whatsapp: '5511954321098',
    hours: 'Ter-Sáb: 9h-19h',
    services: ['Corte Clássico', 'Barba Tradicional', 'Bigode', 'Relaxamento'],
    prices: {
      'Corte Clássico': 40,
      'Barba Tradicional': 30,
      'Bigode': 15,
      'Relaxamento': 25
    },
    specialties: ['Estilo vintage', 'Barbas elaboradas'],
    badge: 'Autêntico',
    color: 'from-amber-500 to-orange-600',
    description: 'Barbearia com estilo vintage autêntico. Oferecemos a experiência clássica de barbear com navalha.',
    amenities: ['Ar-condicionado', 'Música ambiente', 'Bebidas'],
    owner: 'Roberto Mendes'
  },
  {
    id: 5,
    name: 'Salão Glamour',
  image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&h=300&fit=crop&crop=center',
    address: 'Av. Rebouças, 987 - Pinheiros',
    city: 'São Paulo',
    rating: 4.8,
    reviews: 234,
    phone: '(11) 94321-0987',
    whatsapp: '5511943210987',
    hours: 'Seg-Sáb: 8h-20h',
    services: ['Corte Feminino', 'Penteados', 'Maquiagem', 'Depilação'],
    prices: {
      'Corte Feminino': 70,
      'Penteados': 90,
      'Maquiagem': 120,
      'Depilação': 45
    },
    specialties: ['Penteados para eventos', 'Maquiagem profissional'],
    badge: 'Especialista',
    color: 'from-rose-500 to-pink-600',
    description: 'Salão especializado em eventos especiais. Oferecemos pacotes completos para noivas e festas.',
    amenities: ['Estacionamento', 'Ar-condicionado', 'Wi-Fi', 'Área VIP'],
    owner: 'Ana Costa'
  },
  {
    id: 6,
    name: 'Corte & Arte',
    image: '/api/placeholder/400/300',
    address: 'Rua da Consolação, 654 - Centro',
    city: 'São Paulo',
    rating: 4.5,
    reviews: 78,
    phone: '(11) 93210-9876',
    whatsapp: '5511932109876',
    hours: 'Seg-Sex: 9h-18h | Sáb: 9h-16h',
    services: ['Corte Moderno', 'Design de Sobrancelhas', 'Barba Desenhada'],
    prices: {
      'Corte Moderno': 45,
      'Design de Sobrancelhas': 25,
      'Barba Desenhada': 35
    },
    specialties: ['Cortes modernos', 'Design facial'],
    badge: 'Inovador',
    color: 'from-cyan-500 to-blue-600',
    description: 'Salão que combina tradição e inovação. Especialistas em cortes modernos e design facial.',
    amenities: ['Wi-Fi', 'Ar-condicionado'],
    owner: 'Pedro Lima'
  },
  {
    id: 7,
    name: 'Beauty Center',
    image: '/api/placeholder/400/300',
    address: 'Shopping Plaza, Loja 45 - Morumbi',
    city: 'São Paulo',
    rating: 4.7,
    reviews: 145,
    phone: '(11) 92109-8765',
    whatsapp: '5511921098765',
    hours: 'Seg-Dom: 10h-22h',
    services: ['Spa Capilar', 'Relaxamento', 'Massagem', 'Estética Facial'],
    prices: {
      'Spa Capilar': 150,
      'Relaxamento': 80,
      'Massagem': 120,
      'Estética Facial': 100
    },
    specialties: ['Spa e relaxamento', 'Tratamentos estéticos'],
    badge: 'Luxo',
    color: 'from-indigo-500 to-purple-600',
    description: 'Centro de beleza completo com foco em relaxamento e bem-estar. Oferecemos tratamentos premium.',
    amenities: ['Estacionamento', 'Ar-condicionado', 'Wi-Fi', 'Sala de relaxamento'],
    owner: 'Lucia Ferreira'
  },
  {
    id: 8,
    name: 'Salão Moderno',
    image: '/api/placeholder/400/300',
    address: 'Rua Oscar Freire, 159 - Jardins',
    city: 'São Paulo',
    rating: 4.9,
    reviews: 312,
    phone: '(11) 91098-7654',
    whatsapp: '5511910987654',
    hours: 'Ter-Sáb: 8h-20h',
    services: ['Corte Tecnológico', 'Coloração Premium', 'Alisamento'],
    prices: {
      'Corte Tecnológico': 85,
      'Coloração Premium': 200,
      'Alisamento': 180
    },
    specialties: ['Técnicas avançadas', 'Produtos premium'],
    badge: 'Premium+',
    color: 'from-violet-500 to-purple-600',
    description: 'Salão de alto padrão com as mais modernas técnicas e produtos exclusivos importados.',
    amenities: ['Estacionamento valet', 'Ar-condicionado', 'Wi-Fi', 'Lounge VIP'],
    owner: 'Rodrigo Alves'
  }
];

// Função para buscar salões
export const searchSalons = (query, salons = salonsDatabase) => {
  if (!query) return salons;
  
  const searchTerm = query.toLowerCase();
  return salons.filter(salon => 
    salon.name.toLowerCase().includes(searchTerm) ||
    salon.address.toLowerCase().includes(searchTerm) ||
    salon.city.toLowerCase().includes(searchTerm) ||
    salon.services.some(service => service.toLowerCase().includes(searchTerm)) ||
    salon.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm))
  );
};

// Função para paginar salões
export const paginateSalons = (salons, page = 1, itemsPerPage = 6) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return {
    salons: salons.slice(startIndex, endIndex),
    totalPages: Math.ceil(salons.length / itemsPerPage),
    currentPage: page,
    totalItems: salons.length
  };
};
