// Arquivo: src/services/tarefaService.js

// 1. Importa a função do nosso novo helper
import { getHojeLocal } from '../utils/dateUtils';

const STORAGE_KEY = 'chronos_tarefas_v2';

// 2. Removemos a definição duplicada de getHojeLocal() daqui

/**
 * Carrega as tarefas do Local Storage.
 */
export const getTarefas = () => {
  const storedTarefas = localStorage.getItem(STORAGE_KEY);
  if (storedTarefas) {
    return JSON.parse(storedTarefas);
  }
  // Exemplo usa a função importada
  return [
    { id: 1, texto: 'Estudar para o exame', concluida: false, periodo: 'manhã', isNota: false, data: getHojeLocal(), metaId: null },
    { id: 2, texto: 'Exercícios matinais', concluida: false, periodo: 'manhã', isNota: false, data: getHojeLocal(), metaId: null },
  ];
};

const salvarNoStorage = (listaTarefas) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listaTarefas));
};

/**
 * Adiciona ou Edita uma tarefa.
 */
export const salvarTarefa = (tarefaSalva, listaTarefasAtual) => {
  let novaLista;

  if (tarefaSalva.id) { 
    novaLista = listaTarefasAtual.map(t => 
      t.id === tarefaSalva.id ? tarefaSalva : t
    );
  } else { 
    const novaTarefa = { 
      ...tarefaSalva, 
      id: Date.now(), 
      dataCriacao: new Date().toLocaleDateString(),
      data: tarefaSalva.data || getHojeLocal() // Usa a função importada
    };
    novaLista = [...listaTarefasAtual, novaTarefa];
  }
  
  salvarNoStorage(novaLista);
  return novaLista;
};

// ... (Restante do arquivo: removerTarefa e toggleConcluida não mudam) ...
export const removerTarefa = (idTarefa, listaTarefasAtual) => {
  const novaLista = listaTarefasAtual.filter(t => t.id !== idTarefa);
  salvarNoStorage(novaLista);
  return novaLista;
};
export const toggleConcluida = (idTarefa, listaTarefasAtual) => {
  const novaLista = listaTarefasAtual.map(tarefa => {
    if (tarefa.id === idTarefa) {
      return { ...tarefa, concluida: !tarefa.concluida }; 
    }
    return tarefa;
  });
  salvarNoStorage(novaLista);
  return novaLista;
};