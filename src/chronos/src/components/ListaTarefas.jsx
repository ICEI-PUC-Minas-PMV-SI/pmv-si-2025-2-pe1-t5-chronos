// Arquivo: src/components/ListaTarefas.jsx

import React from 'react';

// Recebe 'tarefas' (o array) e 'onToggle' (a função para marcar como concluída) como props
function ListaTarefas({ tarefas, onToggleConcluida }) {
  
  if (tarefas.length === 0) {
    return (
      <p className="lista-vazia">Nenhuma tarefa por aqui! 🚀 Crie a primeira.</p>
    );
  }

  return (
    <ul className="lista-de-tarefas">
      {tarefas.map((tarefa) => (
        // Renderização de cada item da tarefa
        <li 
          key={tarefa.id} 
          className={`tarefa-item ${tarefa.concluida ? 'concluida' : ''}`}
        >
          <span 
            className="tarefa-texto"
            // Ao clicar no texto, a função onToggleConcluida será chamada
            onClick={() => onToggleConcluida(tarefa.id)} 
          >
            {tarefa.texto} ({tarefa.dataCriacao})
          </span>
          {/* Futuramente: Botão de Editar e Excluir */}
        </li>
      ))}
    </ul>
  );
}

export default ListaTarefas;