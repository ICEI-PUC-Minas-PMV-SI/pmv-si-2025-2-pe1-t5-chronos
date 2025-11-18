// Arquivo: src/components/TarefaItem.jsx

import React from 'react';

// 1. CORREÇÃO: Padronizando os nomes das props (onToggle, onEditar, onRemover)
function TarefaItem({ tarefa, onToggle, onEditar, onRemover }) {
  
  // Evita que ao clicar no botão "Remover", o <li> (concluir) dispare junto
  const handleActionClick = (e) => {
    e.stopPropagation(); 
  };
  
  // Estilos (mantidos)
  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    marginLeft: '8px',
    padding: '2px',
    width: 'auto'
  };

  return (
    <li 
      key={tarefa.id} 
      className={tarefa.concluida ? 'tarefa-concluida' : ''}
      // 2. CORREÇÃO: Chamando a prop 'onToggle'
      onClick={() => onToggle(tarefa.id)} 
      style={{ cursor: 'pointer' }}
      title={`Clique para ${tarefa.concluida ? 'marcar como pendente' : 'concluir'}`}
    >
      <span style={{ flexGrow: 1 }}>
        {tarefa.texto}
      </span>
      
      <div className="tarefa-acoes" onClick={handleActionClick}>
        <button 
          style={buttonStyle} 
          className="btn-acao"
          // 3. CORREÇÃO: Chamando a prop 'onEditar'
          onClick={() => onEditar(tarefa)} 
          title="Editar Tarefa"
        >
          ✏️
        </button>
        
        <button 
          style={buttonStyle} 
          className="btn-acao"
          // 4. CORREÇÃO: Chamando a prop 'onRemover'
          onClick={() => onRemover(tarefa.id)} 
          title="Remover Tarefa"
        >
          ❌
        </button>
      </div>
    </li>
  );
}

export default TarefaItem;