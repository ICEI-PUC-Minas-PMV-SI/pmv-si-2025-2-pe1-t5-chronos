// Arquivo: src/components/TarefaItem.jsx

import React from 'react';

// Recebe a tarefa e as funções que o App.jsx definiu
function TarefaItem({ tarefa, onToggle, onEditar, onRemover }) {
  
  // Função para parar a propagação de eventos
  // Evita que ao clicar no botão de "Remover", o 'onClick' de 'concluir' (no <li>) dispare junto.
  const handleActionClick = (e) => {
    e.stopPropagation(); 
  };
  
  // Estilo CSS inline para os botões (para não criar outro arquivo CSS)
  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    marginLeft: '8px',
    padding: '2px',
    width: 'auto' // Sobrescreve o 'width: 100%' do style.css
  };

  return (
    <li 
      key={tarefa.id} 
      // Adiciona a classe CSS se a tarefa estiver concluída
      className={tarefa.concluida ? 'tarefa-concluida' : ''}
      onClick={() => onToggle(tarefa.id)} // Clicar no <li> marca como concluído
      style={{ cursor: 'pointer' }}
    >
      <span 
        style={{ flexGrow: 1 }} // O texto ocupa o espaço
      >
        {tarefa.texto}
      </span>
      
      {/* Container para os botões de ação */}
      <div className="tarefa-acoes" onClick={handleActionClick}>
        {/* Botão de Editar */}
        <button 
          style={buttonStyle} 
          onClick={() => onEditar(tarefa)} // Chama a função de editar
          title="Editar Tarefa" // Dica de acessibilidade
        >
          ✏️
        </button>
        
        {/* Botão de Remover */}
        <button 
          style={buttonStyle} 
          onClick={() => onRemover(tarefa.id)} // Chama a função de remover
          title="Remover Tarefa" // Dica de acessibilidade
        >
          ❌
        </button>
      </div>
    </li>
  );
}

export default TarefaItem;