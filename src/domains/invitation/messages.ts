export const invitationMessages = {
  monogram: {
    firstInitial: 'I',
    secondInitial: 'P',
    ampersand: '&',
    ariaLabel: 'Monograma de Ignacio Garcia y Patricia Yaima'
  },
  cover: {
    dialogAriaLabel: 'Invitación de boda de Ignacio Garcia y Patricia Yaima',
    groomName: 'Ignacio Garcia',
    brideName: 'Patricia Yaima',
    ampersand: '&',
    date: 'Sábado 9 de enero de 2027',
    greeting: 'Les invitamos cordialmente',
    openButton: 'Abrir invitación'
  },
  hero: {
    eyebrow: 'Nos casamos',
    groomName: 'Ignacio Garcia',
    brideName: 'Patricia Yaima',
    ampersand: '&',
    fullNames: 'Jose Ignacio Garcia Rincon · Patricia Yaima Rodriguez',
    date: 'Sábado 9 de enero de 2027',
    dateParts: {
      weekday: 'Sábado',
      day: '9',
      month: 'Enero',
      year: '2027'
    },
    invitation:
      'Con inmensa alegría queremos compartir contigo el día en que uniremos nuestras vidas. Nada nos haría más felices que celebrarlo a tu lado.'
  },
  announcement: {
    title: 'Tenemos el honor de invitarte',
    lead: 'a la celebración de nuestro matrimonio, que tendrá lugar el',
    dateBlock: {
      weekday: 'Sábado',
      day: '9',
      month: 'Enero',
      year: '2027'
    }
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
    title: 'Información del evento',
    dateBlock: {
      weekday: 'Sábado',
      day: '9',
      month: 'Enero',
      year: '2027'
    },
    timeLabel: 'Hora',
    mapsLinkLabel: 'Ver ubicación',
    mapsLinkAriaLabel: (venue: string) =>
      `Ver ubicación de ${venue} en Google Maps (se abre en una nueva pestaña)`,
    monthCalendar: {
      title: 'Enero 2027',
      ariaLabel: 'Calendario de enero de 2027',
      weekdays: [
        { short: 'Lu', full: 'lunes' },
        { short: 'Ma', full: 'martes' },
        { short: 'Mi', full: 'miércoles' },
        { short: 'Ju', full: 'jueves' },
        { short: 'Vi', full: 'viernes' },
        { short: 'Sá', full: 'sábado' },
        { short: 'Do', full: 'domingo' }
      ],
      weddingDayLabel: (day: number) => `${day} de enero, día de la boda`
    },
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
      time: '7:00 p. m.'
    }
  },
  gallery: {
    title: 'Nuestra historia',
    subtitle: 'Algunos de los momentos que nos trajeron hasta aquí',
    openPhotoLabel: (position: number, total: number) =>
      `Ampliar foto ${position} de ${total}:`,
    deckLabel: 'Galería de fotos',
    slideLabel: (position: number, total: number) =>
      `Foto ${position} de ${total}`,
    dotsLabel: 'Fotos de la galería',
    goToPhotoLabel: (position: number) => `Ir a la foto ${position}`,
    dialogAriaLabel: 'Visor de fotos',
    closeLabel: 'Cerrar',
    previousLabel: 'Foto anterior',
    nextLabel: 'Foto siguiente',
    counter: (position: number, total: number) => `${position} / ${total}`
  },
  gift: {
    title: 'Lluvia de sobres',
    body: 'Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros, tendremos una lluvia de sobres el día de la recepción.'
  },
  dressCode: {
    title: 'Código de vestimenta',
    guests: {
      title: 'Invitados',
      style: 'Formal',
      body: 'Con cariño les pedimos NO usar estos colores, reservados para los novios, el cortejo y la familia.'
    },
    avoidLabel: 'No usar',
    groups: {
      women: 'Mujeres',
      men: 'Hombres'
    },
    colors: {
      white: 'Blanco',
      champagne: 'Champagne',
      darkGreen: 'Verde oscuro',
      emeraldGreen: 'Verde esmeralda',
      dustyRose: 'Rosa empolvado',
      oldRose: 'Palo de rosa',
      lightGray: 'Gris claro',
      beige: 'Beige',
      darkGray: 'Gris oscuro',
      charcoal: 'Gris carbón'
    }
  },
  calendar: {
    eventTitle: 'Boda de Ignacio Garcia & Patricia Yaima',
    details:
      'Ceremonia religiosa a las 5:30 p. m. en la Parroquia Juan Pablo II (Barrio Margaritas). Recepción a las 7:00 p. m. en Eventos Adonais.',
    location: 'Parroquia Juan Pablo II, Barrio Margaritas'
  },
  blessing: {
    title: 'Con la bendición de Dios y nuestros padres',
    conjunction: 'y',
    groomParents: {
      label: 'Padres del novio',
      parents: [
        { name: 'Quintina Rincon' },
        {
          name: 'Jose Agustin Garcia',
          isInHeaven: true,
          remembranceLabel: '(fallecido)'
        }
      ],
      heavenNote: 'desde el cielo'
    },
    brideParents: {
      label: 'Padres de la novia',
      parents: [
        {
          name: 'Vicente Yaima',
          isInHeaven: true,
          remembranceLabel: '(fallecido)'
        },
        {
          name: 'Blanca Alcira Rodriguez',
          isInHeaven: true,
          remembranceLabel: '(fallecida)'
        }
      ],
      heavenNote: 'nos acompañan desde el cielo'
    },
    remembrance:
      'A quienes nos guían desde el cielo, gracias por seguir caminando con nosotros.'
  },
  closing: {
    message: 'Tu presencia es el regalo más grande que podemos recibir.',
    thanks: 'Gracias por ser parte de nuestra historia',
    signature: 'Ignacio Garcia & Patricia Yaima'
  },
  music: {
    songTitle: 'Que Suerte Tenerte',
    composer: 'Fonseca',
    artist: 'Fonseca',
    playLabel: 'Reproducir música',
    pauseLabel: 'Pausar música',
    nowPlaying: (songTitle: string, artist: string) =>
      `Suena: ${songTitle} · ${artist}`,
    credit: 'Música: “Que Suerte Tenerte” — Fonseca'
  }
} as const;
