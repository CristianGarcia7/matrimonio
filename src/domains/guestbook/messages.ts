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
    bookAriaLabel: 'Libro de firmas de los invitados',
    bookRoleDescription: 'libro',
    pageAriaLabel: (page: number) => `Página ${page}`,
    pageListAriaLabel: (page: number) => `Firmas de la página ${page}`,
    pageIndicator: (page: number, total: number) =>
      `Página ${page} de ${total}`,
    spreadIndicator: (left: number, right: number, total: number) =>
      `Páginas ${left} y ${right} de ${total}`,
    previousPage: 'Página anterior',
    nextPage: 'Página siguiente',
    readMore: 'Leer más',
    readMoreAriaLabel: (name: string) => `Leer el mensaje completo de ${name}`,
    closeMessage: 'Cerrar',
    messageDialogTitle: (name: string) => `Mensaje de ${name}`,
    emptyTitle: 'Sé el primero en dejarnos unas palabras…',
    emptyBody:
      'Este libro guarda los buenos deseos de quienes nos acompañan. Su primera página te espera.',
    loading: 'Cargando firmas…',
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
