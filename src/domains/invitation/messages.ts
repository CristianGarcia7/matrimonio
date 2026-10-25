export const invitationMessages = {
  monogram: {
    firstInitial: 'J',
    secondInitial: 'P',
    ampersand: '&',
    ariaLabel: 'Monograma de Jose Ignacio y Patricia'
  },
  cover: {
    dialogAriaLabel: 'Invitación de boda de Jose Ignacio y Patricia',
    names: 'Jose Ignacio & Patricia',
    date: 'Sábado 9 de enero de 2027',
    greeting: 'Les invitamos cordialmente',
    openButton: 'Abrir invitación'
  },
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
      body: 'Con cariño les pedimos evitar los colores blanco y negro; el blanco está reservado para la novia.'
    },
    avoidLabel: 'No usar',
    colors: {
      white: 'Blanco',
      black: 'Negro'
    },
    party: {
      title: 'Nuestro cortejo',
      swatchesLabel: (role: string) => `Colores de ${role}`,
      roles: {
        bride: { name: 'Novia', description: 'Vestido marfil de encaje' },
        groom: {
          name: 'Novio',
          description:
            'Traje gris claro, corbata gris oscuro y botonier de rosa blanca'
        },
        bridesmaids: {
          name: 'Damas de honor',
          description: 'Vestido largo de satín verde botella'
        },
        groomsmen: {
          name: 'Caballeros de honor',
          description: 'Traje gris carbón con corbata verde botella'
        },
        flowerGirl: {
          name: 'Pajecita',
          description: 'Vestido de tul rosa palo con lazo verde'
        },
        pageBoy: {
          name: 'Pajecito',
          description:
            'Camisa blanca, moño rosa palo, tirantes verdes y pantalón gris carbón'
        }
      },
      colorNames: {
        ivory: 'Marfil',
        lightGray: 'Gris claro',
        darkGray: 'Gris oscuro',
        roseWhite: 'Blanco rosa',
        bottleGreen: 'Verde botella',
        charcoal: 'Gris carbón',
        blush: 'Rosa palo',
        white: 'Blanco'
      }
    }
  },
  calendar: {
    eventTitle: 'Boda de Jose Ignacio & Patricia',
    details:
      'Ceremonia religiosa a las 5:30 p. m. en la Parroquia Juan Pablo II (Barrio Margaritas). Recepción a las 7:00 p. m. en Eventos Adonais.',
    location: 'Parroquia Juan Pablo II, Barrio Margaritas'
  },
  blessing: {
    title: 'Con la bendición de Dios y nuestros padres',
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
    thanks: 'Gracias por ser parte de nuestra historia',
    signature: 'Jose Ignacio & Patricia'
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
