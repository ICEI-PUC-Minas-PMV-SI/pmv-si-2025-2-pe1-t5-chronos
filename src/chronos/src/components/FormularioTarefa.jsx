// Arquivo: src/components/FormularioTarefa.jsx

import React, { useState } from 'react';

// O componente recebe 'onAdicionarTarefa' como uma prop (propriedade)
function FormularioTarefa({ onAdicionarTarefa }) {
  
  // Estado local para o texto da nova tarefa
  const [textoTarefa, setTextoTarefa] = useState('');

  // Função para lidar com o envio
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // 1. Validação básica
    if (!textoTarefa.trim()) {
      alert('Por favor, digite o nome da tarefa.');
      return;
    }

    // 2. Criação do objeto da nova tarefa
    const novaTarefa = {
      id: Date.now(), // ID único baseado no timestamp (único para este protótipo)
      texto: textoTarefa.trim(),
      concluida: false,
      dataCriacao: new Date().toLocaleDateString(),
      // Futuramente: categoria, prazo, etc.
    };

    // 3. Chama a função passada pela prop, enviando a nova tarefa
    onAdicionarTarefa(novaTarefa); 

    // 4. Limpa o formulário após o envio
    setTextoTarefa('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-tarefa">
      <input
        type="text"
        placeholder="Adicionar nova atividade..."
        value={textoTarefa} // Campo controlado pelo estado local
        onChange={(e) => setTextoTarefa(e.target.value)} // Atualiza o estado ao digitar
        aria-label="Nova Tarefa"
      />
      <button type="submit" className="btn-adicionar">
        Adicionar
      </button>
    </form>
  );
}

export default FormularioTarefa;