// Serviços de agendamento e WhatsApp
export const bookingService = {
  // Função para criar um agendamento
  createBooking: async (bookingData) => {
    const booking = {
      id: Date.now(),
      clientName: bookingData.clientName,
      clientPhone: bookingData.clientPhone,
      clientEmail: bookingData.clientEmail,
      salonId: bookingData.salonId,
      salonName: bookingData.salonName,
      service: bookingData.service,
      date: bookingData.date,
      time: bookingData.time,
      price: bookingData.price,
      status: 'pending',
      createdAt: new Date().toISOString(),
      notes: bookingData.notes || ''
    };

    // Simular salvamento no banco de dados
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    return booking;
  },

  // Função para buscar agendamentos
  getBookings: () => {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  },

  // Função para buscar agendamentos por salão
  getBookingsBySalon: (salonId) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings.filter(booking => booking.salonId === salonId);
  }
};

export const whatsappService = {
  // Função para enviar mensagem via WhatsApp Web
  sendBookingNotification: (booking, salon) => {
    const message = `🗓️ *NOVO AGENDAMENTO - Elite & Estilo*

📋 *Detalhes do Agendamento:*
• Cliente: ${booking.clientName}
• Telefone: ${booking.clientPhone}
• Email: ${booking.clientEmail}
• Serviço: ${booking.service}
• Data: ${booking.date}
• Horário: ${booking.time}
• Valor: R$ ${booking.price}

🏪 *Salão:* ${salon.name}
📍 *Endereço:* ${salon.address}

${booking.notes ? `📝 *Observações:* ${booking.notes}` : ''}

*ID do Agendamento:* #${booking.id}

Acesse o sistema para confirmar ou gerenciar este agendamento.`;

    // Criar URL para WhatsApp Web
    const whatsappUrl = `https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp Web em nova aba
    window.open(whatsappUrl, '_blank');
    
    return { success: true, url: whatsappUrl };
  },

  // Função para enviar confirmação para o cliente
  sendClientConfirmation: (booking, salon) => {
    const message = `✅ *AGENDAMENTO CONFIRMADO - Elite & Estilo*

Olá ${booking.clientName}! Seu agendamento foi realizado com sucesso:

📋 *Detalhes:*
• Salão: ${salon.name}
• Serviço: ${booking.service}
• Data: ${booking.date}
• Horário: ${booking.time}
• Valor: R$ ${booking.price}

📍 *Local:*
${salon.address}

📞 *Contato do Salão:*
${salon.phone}

*ID do Agendamento:* #${booking.id}

Em caso de dúvidas ou necessidade de reagendamento, entre em contato conosco!`;

    const clientPhone = booking.clientPhone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/55${clientPhone}?text=${encodeURIComponent(message)}`;
    
    return { success: true, url: whatsappUrl, message };
  }
};

// Função para gerar horários disponíveis
export const generateAvailableSlots = (date) => {
  const slots = [];
  const startHour = 9;
  const endHour = 18;
  
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  
  // Simular alguns horários ocupados (em um sistema real, isso viria do banco de dados)
  const occupiedSlots = ['10:30', '14:00', '16:30'];
  
  return slots.filter(slot => !occupiedSlots.includes(slot));
};

// Função para validar dados do agendamento
export const validateBookingData = (data) => {
  const errors = {};
  
  if (!data.clientName || data.clientName.trim().length < 2) {
    errors.clientName = 'Nome deve ter pelo menos 2 caracteres';
  }
  
  if (!data.clientPhone || data.clientPhone.replace(/\D/g, '').length < 10) {
    errors.clientPhone = 'Telefone deve ter pelo menos 10 dígitos';
  }
  
  if (!data.clientEmail || !/\S+@\S+\.\S+/.test(data.clientEmail)) {
    errors.clientEmail = 'Email deve ser válido';
  }
  
  if (!data.service) {
    errors.service = 'Selecione um serviço';
  }
  
  if (!data.date) {
    errors.date = 'Selecione uma data';
  }
  
  if (!data.time) {
    errors.time = 'Selecione um horário';
  }
  
  // Validar se a data não é no passado
  const selectedDate = new Date(data.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    errors.date = 'A data deve ser hoje ou no futuro';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
