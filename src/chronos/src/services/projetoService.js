const STORAGE_KEY = 'chronos_projetos_v1';

/**
 * Carrega os Projetos (Categorias) do Local Storage.
 */
export const getProjetos = () => {
  const storedProjetos = localStorage.getItem(STORAGE_KEY);
  if (storedProjetos) {
    return JSON.parse(storedProjetos);
  }
  // Dados de exemplo
  return [
    { id: 'proj-1', nome: 'Projeto' },
    { id: 'proj-2', nome: 'Estudante' },
    { id: 'proj-3', nome: 'Trabalho' },
    { id: 'proj-4', nome: 'Rotina' },
  ];
};

/**
 * Salva a lista completa no storage.
 */
const salvarNoStorage = (projetos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projetos));
};

/**
 * Adiciona ou Edita um Projeto.
 * Retorna a nova lista de projetos.
 */
export const salvarProjeto = (projetoSalvo, listaProjetosAtual) => {
  let novaLista;
  if (projetoSalvo.id) { 
    // Edição
    novaLista = listaProjetosAtual.map(p => 
      p.id === projetoSalvo.id ? projetoSalvo : p
    );
  } else { 
    // Criação
    const novoProjeto = { 
      ...projetoSalvo, 
      id: `proj-${Date.now()}` // Cria um ID único
    };
    novaLista = [...listaProjetosAtual, novoProjeto];
  }
  salvarNoStorage(novaLista);
  return novaLista;
};

/**
 * Remove um Projeto.
 * Retorna a nova lista de projetos.
 */
export const removerProjeto = (idProjeto, listaProjetosAtual) => {
  const novaLista = listaProjetosAtual.filter(p => p.id !== idProjeto);
  salvarNoStorage(novaLista);
  return novaLista;
};