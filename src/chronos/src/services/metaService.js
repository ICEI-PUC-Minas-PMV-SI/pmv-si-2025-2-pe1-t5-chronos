const STORAGE_KEY = 'chronos_metas_v1';

/**
 * Carrega as Metas do Local Storage.
 */
export const getMetas = () => {
  const storedMetas = localStorage.getItem(STORAGE_KEY);
  if (storedMetas) {
    return JSON.parse(storedMetas);
  }
  // Dados de exemplo se o storage estiver vazio
  return [
    { id: 100, titulo: 'Concluir projeto da faculdade', alvo: 10 }, // Alvo: 10 tarefas
    { id: 101, titulo: 'Aprender um novo idioma', alvo: 20 }, // Alvo: 20 tarefas
  ];
};

/**
 * Função "privada" para salvar no storage
 */
const salvarNoStorage = (metas) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
};

/**
 * Adiciona ou Edita uma Meta.
 * Retorna a nova lista de metas.
 */
export const salvarMeta = (metaSalva, listaMetasAtual) => {
  let novaLista;
  if (metaSalva.id) { 
    // Edição
    novaLista = listaMetasAtual.map(m => 
      m.id === metaSalva.id ? metaSalva : m
    );
  } else { 
    // Criação
    const novaMeta = { 
      ...metaSalva, 
      id: Date.now() 
    };
    novaLista = [...listaMetasAtual, novaMeta];
  }
  salvarNoStorage(novaLista);
  return novaLista;
};

/**
 * Remove uma Meta.
 * Retorna a nova lista de metas.
 */
export const removerMeta = (idMeta, listaMetasAtual) => {
  const novaLista = listaMetasAtual.filter(m => m.id !== idMeta);
  salvarNoStorage(novaLista);
  return novaLista;
};

/**
 * A LÓGICA DE NEGÓCIO (O que você pediu!)
 * Calcula o progresso de UMA meta, baseado na lista de TODAS as tarefas.
 */
export const calcularProgressoMeta = (meta, listaTarefas) => {
  // 1. Filtra tarefas VINCULADAS a esta meta específica
  const tarefasDaMeta = listaTarefas.filter(t => t.metaId === meta.id);
  
  // 2. Define o alvo (ex: 20 tarefas)
  const alvo = meta.alvo; 
  if (!alvo || alvo === 0) {
    // Evita divisão por zero
    return { percentual: 0, concluidas: 0, pendentes: 0, alvo: 0 };
  }
  
  // 3. Calcula quantas das tarefas VINCULADAS estão concluídas
  const concluidas = tarefasDaMeta.filter(t => t.concluida).length;

  // 4. Calcula o percentual (limitado a 100%)
  const percentual = Math.min((concluidas / alvo) * 100, 100);
  
  return {
    percentual: Math.round(percentual),
    concluidas: concluidas,
    pendentes: alvo - concluidas > 0 ? alvo - concluidas : 0,
    alvo: alvo
  };
};