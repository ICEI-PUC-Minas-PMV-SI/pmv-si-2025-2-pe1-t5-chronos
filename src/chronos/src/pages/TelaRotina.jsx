// Arquivo: src/pages/TelaRotina.jsx

import React from 'react'; // Removendo useState e useEffect por enquanto
import MenuPrincipal from '../components/MenuPrincipal'; 

// Mocks para simular os dados agrupados por período
const rotinaMock = {
    manhã: ['Estudar para o exame', 'Exercícios matinais'],
    tarde: ['Reunião de equipe (14h)', 'Desenvolvimento do Módulo 6'],
    noite: ['Leitura técnica', 'Planejamento do dia seguinte'],
    notas: ['Preparar material da aula', 'Comprar leite e pão'],
    resumo: '3 tarefas, 1 reunião, 1 lembrete',
};

function TelaRotina() {
  
  // NOTE: A lógica avançada (useState, useEffect, adicionarTarefa, toggleConcluida)
  // será reintroduzida AQUI, mas adaptada para a estrutura de cards.
  // Por agora, usamos apenas o mockup estático para testar o CSS.

  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      
      <main className="main-content">
          
          <header className="rotina-header">
              <div className="rotina-title">
                  <h2>Hoje</h2>
                  <p>{rotinaMock.resumo}</p>
              </div>
              {/* O botão de adicionar seria ligado a um modal de criação de tarefas */}
              <button className="adicionar-btn">+ Adicionar</button> 
          </header>

          <div className="rotina"> {/* Classe que define o Grid */}
              
              {/* Cartão Manhã */}
              <div className="periodo-card">
                  <h3>Manhã</h3>
                  <ul>
                      {rotinaMock.manhã.map(tarefa => <li key={tarefa}>{tarefa}</li>)}
                  </ul>
              </div>
              
              {/* Cartão Tarde */}
              <div className="periodo-card">
                  <h3>Tarde</h3>
                  <ul>
                      {rotinaMock.tarde.map(tarefa => <li key={tarefa}>{tarefa}</li>)}
                  </ul>
              </div>
              
              {/* Cartão Noite */}
              <div className="periodo-card">
                  <h3>Noite</h3>
                  <ul>
                      {rotinaMock.noite.map(tarefa => <li key={tarefa}>{tarefa}</li>)}
                  </ul>
              </div>
              
              {/* Cartão Notas Rápidas */}
              <div className="notas-card">
                  <h3>Notas rápidas</h3>
                  <ul>
                      {rotinaMock.notas.map(nota => <li key={nota}>{nota}</li>)}
                  </ul>
              </div>
              
              {/* Cartão Gráfico (Ocupa duas colunas no desktop, conforme rotina.css) */}
              <div className="graph-card">
                  <h3>Progresso do Dia</h3>
                  <div className="progress-placeholder"></div>
              </div>
          </div>
      </main>
    </div>
  );
}
export default TelaRotina;