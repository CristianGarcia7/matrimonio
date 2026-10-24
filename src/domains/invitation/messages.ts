export const invitationMessages = {
  hero: {
    eyebrow: 'Nos casamos',
    groomName: 'Jose Ignacio',
    brideName: 'Patricia',
    ampersand: '&',
    fullNames: 'Jose Ignacio Garcia Rincon · Patricia Yaima Rodriguez',
    date: 'Sábado 9 de enero de 2027',
    invitation:
      'Con inmensa alegría queremos compartir contigo el día en que uniremos nuestras vidas. Nada nos haría más felices que celebrarlo a tu lado.'
  },
  countdown: {
    title: 'Falta muy poco',
    subtitle: 'Cada segundo nos acerca al gran día',
    ariaLabel: 'Cuenta regresiva para la boda',
    placeholder: '--',
    units: {
      days: 'Días',
      hours: 'Horas',
      minutes: 'Minutos',
      seconds: 'Segundos'
    },
    eventDay: '¡Hoy es el gran día!',
    eventDayDetail: 'Te esperamos con el corazón lleno de alegría.',
    finished: '¡Gracias por acompañarnos!',
    finishedDetail:
      'Fue un honor compartir contigo el día más especial de nuestras vidas.'
  },
  events: {
    title: 'Celebremos juntos',
    subtitle: 'Te esperamos en estos momentos tan especiales',
    timeLabel: 'Hora',
    mapsLinkLabel: 'Ver ubicación',
    mapsLinkAriaLabel: (venue: string) =>
      `Ver ubicación de ${venue} en Google Maps (se abre en una nueva pestaña)`,
    calendarLinkLabel: 'Agregar al calendario',
    calendarLinkAriaLabel:
      'Agregar la boda a Google Calendar (se abre en una nueva pestaña)',
    ceremony: {
      title: 'Ceremonia religiosa',
      venue: 'Parroquia Juan Pablo II',
      place: 'Barrio Margaritas',
      time: '5:30 p. m.'
    },
    reception: {
      title: 'Recepción',
      venue: 'Eventos Adonais',
      time: '6:40 p. m.'
    }
  },
  calendar: {
    eventTitle: 'Boda de Jose Ignacio & Patricia',
    details:
      'Ceremonia religiosa a las 5:30 p. m. en la Parroquia Juan Pablo II (Barrio Margaritas). Recepción a las 6:40 p. m. en Eventos Adonais.',
    location: 'Parroquia Juan Pablo II, Barrio Margaritas'
  },
  blessing: {
    title: 'Con la bendición de nuestros padres',
    conjunction: 'y',
    groomParents: {
      label: 'Padres del novio',
      names: ['Jose Agustin Garcia', 'Quintina Rincon']
    },
    brideParents: {
      label: 'Padres de la novia',
      names: ['Vicente Yaima', 'Blanca Alcira Rodriguez']
    }
  },
  closing: {
    message: 'Tu presencia es el regalo más grande que podemos recibir.',
    signature: 'Jose Ignacio & Patricia'
  }
} as const;
