// Arquivo: src/pages/TelaDashboard.jsx

import React from 'react';
import MenuPrincipal from '../components/MenuPrincipal'; // 1. Importando o Menu

function TelaDashboard() {
  return (
    // O div principal da tela
    <div className="dashboard-layout"> 
      
      {/* 2. Incluindo o Menu no Layout */}
      <MenuPrincipal /> 
      
      {/* 3. Área de Conteúdo Específica do Dashboard */}
      <main className="dashboard-content">
        <h1>[CHRONOS] - Início (Dashboard)</h1>
        <p>Visão geral de hoje:</p>
        
        {/* TODO: Adicionar o Resumo Semanal */}
        {/* TODO: Adicionar Metas em Progresso (Cards) */}
        {/* TODO: Botão de Criação Rápida de Tarefa (+) */}
        
        <section className="resumo-produtividade">
          <h2>Seu Foco Diário:</h2>
          {/* Card: Próxima Tarefa */}
          {/* Card: Metas em Risco */}
        </section>
        
      </main>
    </div>
  );
}

export default TelaDashboard;