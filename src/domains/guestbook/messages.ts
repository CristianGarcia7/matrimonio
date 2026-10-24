export const guestbookMessages = {
  section: {
    title: 'Libro de firmas',
    subtitle:
      'Déjanos tus buenos deseos y palabras de cariño para esta nueva etapa'
  },
  form: {
    nameLabel: 'Tu nombre',
    namePlaceholder: 'Ej.: María Fernanda',
    messageLabel: 'Tu mensaje',
    messagePlaceholder: 'Escribe unas palabras para los novios…',
    honeypotLabel: 'Deja este campo vacío',
    submit: 'Firmar el libro',
    submitting: 'Enviando…',
    success:
      '¡Gracias por tu mensaje! Tu firma ya forma parte de nuestro libro.'
  },
  signatures: {
    title: 'Mensajes de cariño',
    listAriaLabel: 'Firmas de los invitados',
    loading: 'Cargando firmas…',
    empty:
      'Aún no hay firmas. ¡Sé la primera persona en dejarnos tus buenos deseos!',
    loadFailed:
      'No pudimos cargar las firmas en este momento. Inténtalo de nuevo más tarde.'
  },
  errors: {
    invalidInput: 'Revisa los datos del formulario e inténtalo de nuevo.',
    rateLimited:
      'Has enviado varios mensajes seguidos. Espera unos minutos antes de volver a firmar.',
    saveFailed:
      'No pudimos guardar tu firma. Inténtalo de nuevo en unos momentos.',
    unexpected: 'Ocurrió un error inesperado. Inténtalo de nuevo.'
  }
} as const;
