import { createBrowserRouter, Navigate } from 'react-router'
import { CriarConta } from '../pages/CriarConta'
import { EmConstrucao } from '../pages/EmConstrucao'
import { NaoEncontrada } from '../pages/NaoEncontrada'
import { NovoPet } from '../pages/NovoPet'
import { PetDetalhe } from '../pages/PetDetalhe'
import { Pets } from '../pages/Pets'
import { paths } from './paths'

// Telas que ainda não têm layout mostram EmConstrucao até ficarem prontas
export const router = createBrowserRouter([
  // Sem login ainda: a entrada do app é o cadastro
  { path: '/', element: <Navigate to={paths.criarConta} replace /> },

  // Públicas
  { path: paths.criarConta, Component: CriarConta },
  { path: paths.entrar, element: <EmConstrucao area="publica" title="Entrar" /> },
  { path: paths.termos, element: <EmConstrucao area="publica" title="Termos de uso" /> },
  { path: paths.politicaPrivacidade, element: <EmConstrucao area="publica" title="Política de Privacidade" /> },

  // Área logada
  { path: paths.inicio, element: <EmConstrucao title="Início" /> },
  {
    path: paths.pets,
    Component: Pets,
    children: [{ path: 'novo', Component: NovoPet }], // modal por cima da lista
  },
  { path: '/pets/:petId', Component: PetDetalhe },
  { path: paths.saude, element: <EmConstrucao title="Saúde" /> },
  { path: paths.agenda, element: <EmConstrucao title="Agenda" /> },
  { path: paths.mapaPet, element: <EmConstrucao title="Mapa Pet" /> },
  { path: paths.alertas, element: <EmConstrucao title="Alertas" /> },
  { path: paths.causaAnimal, element: <EmConstrucao title="Causa animal" /> },
  { path: paths.notificacoes, element: <EmConstrucao title="Notificações" /> },
  { path: paths.privacidade, element: <EmConstrucao title="Privacidade" /> },
  { path: paths.configuracoes, element: <EmConstrucao title="Configurações" /> },

  { path: '*', Component: NaoEncontrada },
])
