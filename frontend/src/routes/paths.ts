// Endereço de cada tela. Use sempre daqui em vez de escrever a URL na mão.
export const paths = {
  // Públicas
  criarConta: '/criar-conta',
  entrar: '/entrar',
  termos: '/termos',
  politicaPrivacidade: '/politica-de-privacidade',

  // Área logada
  inicio: '/inicio',
  pets: '/pets',
  novoPet: '/pets/novo',
  pet: (id: number | string) => `/pets/${id}`,
  saude: '/saude',
  agenda: '/agenda',
  mapaPet: '/mapa-pet',
  alertas: '/alertas',
  causaAnimal: '/causa-animal',
  notificacoes: '/notificacoes',
  privacidade: '/privacidade',
  configuracoes: '/configuracoes',
} as const
