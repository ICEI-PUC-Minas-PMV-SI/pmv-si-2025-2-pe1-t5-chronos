import React from "react";
import {
  FaTrophy,
  FaCalendarCheck,
  FaFire,
  FaLightbulb,
  FaCheckSquare,
} from "react-icons/fa";

const conquistas = [
  {
    titulo: "Primeira Tarefa Concluída",
    descricao:
      "Parabéns! Você concluiu sua primeira atividade na Agenda Inteligente.",
    icone: <FaCheckSquare className="text-green-500 text-4xl" />,
  },
  {
    titulo: "Semana Produtiva",
    descricao:
      "Você concluiu todas as tarefas planejadas da semana!",
    icone: <FaCalendarCheck className="text-red-500 text-4xl" />,
  },
  {
    titulo: "7 Dias Seguidos",
    descricao:
      "Você manteve sua rotina por 7 dias consecutivos.",
    icone: <FaFire className="text-orange-500 text-4xl" />,
  },
  {
    titulo: "Meta Conquistada",
    descricao:
      "Você atingiu uma de suas metas pessoais!",
    icone: <FaTrophy className="text-yellow-500 text-4xl" />,
  },
  {
    titulo: "Planejamento Efetivo",
    descricao:
      "Você organizou todas as atividades do mês com sucesso.",
    icone: <FaLightbulb className="text-yellow-400 text-4xl" />,
  },
];

export default function Conquistas() {
  
}
