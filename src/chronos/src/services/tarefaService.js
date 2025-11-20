// Arquivo: src/services/tarefaService.js

import { getHojeLocal } from "../utils/dateUtils";

const STORAGE_KEY = "chronos_tarefas_v2";

/**
 * Normaliza uma tarefa para garantir que todas as propriedades existam.
 */
const normalizarTarefa = (t) => {
  return {
    id: t.id,
    texto: t.texto ?? "",
    concluida: Boolean(t.concluida),
    periodo: t.periodo ?? "manhã",
    isNota: t.isNota ?? false,
    data: t.data || getHojeLocal(),
    metaId: t.metaId ?? null,
    dataCriacao: t.dataCriacao ?? new Date().toLocaleDateString(),
  };
};

/**
 * Carrega as tarefas do Local Storage.
 */
export const getTarefas = () => {
  const storedTarefas = localStorage.getItem(STORAGE_KEY);

  if (storedTarefas) {
    try {
      const lista = JSON.parse(storedTarefas);
      // Garante que a lista seja um array e normaliza cada item
      if (Array.isArray(lista)) {
        return lista.map(normalizarTarefa);
      }
      return [];
    } catch (e) {
      console.error("Erro ao parsear tarefas do storage:", e);
      return [];
    }
  }

  // Exemplo inicial (sem caracteres estranhos)
  return [
    {
      id: 1,
      texto: "Estudar para o exame",
      concluida: false,
      periodo: "manhã",
      isNota: false,
      data: getHojeLocal(),
      metaId: null,
    },
    {
      id: 2,
      texto: "Exercícios matinais",
      concluida: false,
      periodo: "manhã",
      isNota: false,
      data: getHojeLocal(),
      metaId: null,
    },
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
    // Edição
    const tarefaNormalizada = normalizarTarefa(tarefaSalva);
    novaLista = listaTarefasAtual.map((t) =>
      t.id === tarefaSalva.id ? tarefaNormalizada : t
    );
  } else {
    // Criação
    const novaTarefa = normalizarTarefa({
      ...tarefaSalva,
      id: Date.now(),
      dataCriacao: new Date().toLocaleDateString(),
      data: tarefaSalva.data || getHojeLocal(),
    });

    novaLista = [...listaTarefasAtual, novaTarefa];
  }

  salvarNoStorage(novaLista);
  return novaLista;
};

/**
 * Remove uma tarefa.
 */
export const removerTarefa = (idTarefa, listaTarefasAtual) => {
  const novaLista = listaTarefasAtual.filter((t) => t.id !== idTarefa);
  salvarNoStorage(novaLista);
  return novaLista;
};

/**
 * Marca / desmarca tarefa como concluída.
 */
export const toggleConcluida = (idTarefa, listaTarefasAtual) => {
  const novaLista = listaTarefasAtual.map((tarefa) => {
    if (tarefa.id === idTarefa) {
      return { ...tarefa, concluida: !tarefa.concluida };
    }
    return tarefa;
  });
  salvarNoStorage(novaLista);
  return novaLista;
};
