// src/services/dashboardService.js

import { getTarefas } from "./tarefaService";
import { getHojeLocal } from "../utils/dateUtils";

/**
 * Calcula o resumo usado no Dashboard.
 */
export const calcularResumoDashboard = (listaTarefasParam) => {
  const tarefas = listaTarefasParam ?? getTarefas();

  const resumo = {
    totalItens: 0,
    totalAtividades: 0,
    totalNotas: 0,
    totalMetasVinculadas: 0,
    concluidas: 0,
    pendentes: 0,
    porData: {},
  };

  tarefas.forEach((t) => {
    resumo.totalItens += 1;

    if (t.isNota) {
      resumo.totalNotas += 1;
    } else {
      resumo.totalAtividades += 1;
    }

    if (t.concluida) {
      resumo.concluidas += 1;
    } else {
      resumo.pendentes += 1;
    }

    if (t.metaId !== null && t.metaId !== undefined) {
      resumo.totalMetasVinculadas += 1;
    }

    const data = t.data || getHojeLocal();

    if (!resumo.porData[data]) {
      resumo.porData[data] = {
        total: 0,
        concluidas: 0,
        pendentes: 0,
      };
    }

    resumo.porData[data].total += 1;
    if (t.concluida) {
      resumo.porData[data].concluidas += 1;
    } else {
      resumo.porData[data].pendentes += 1;
    }
  });

  return resumo;
};
