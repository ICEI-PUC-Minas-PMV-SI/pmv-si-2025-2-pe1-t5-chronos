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
  return (
    <div className="flex flex-col w-full h-full p-6 bg-white rounded-xl">
      {/* Título */}
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 flex items-center justify-center gap-2">
        🥅 Conquistas
      </h1>

      {/* Layout horizontal responsivo */}
      <div className="flex flex-wrap justify-center gap-6">
        {conquistas.map((c, index) => (
          <div
            key={index}
            className="bg-gray-50 border-2 border-blue-300 rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:border-blue-500 hover:shadow-md transition-all duration-200 w-[280px] sm:w-[280px] md:w-[280px]"
          >
            {c.icone}
            <h2 className="font-semibold mt-3 text-lg text-gray-800">
              {c.titulo}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">{c.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
