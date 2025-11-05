// Arquivo: src/pages/TelaMetas.jsx (Versão Dinâmica)

import React from 'react';
import MenuPrincipal from '../components/MenuPrincipal'; 
import { Link } from 'react-router-dom';

// 1. Recebendo 'listaTarefas' do App.jsx (em vez de usar Mocks)
function TelaMetas({ listaTarefas }) {
  
  // ==================================================================
  // Lógica de Conquistas (Derivada do estado das tarefas)
  // ==================================================================
  
  // 2. Calculamos o total de tarefas concluídas lendo a prop
  const totalTarefasConcluidas = listaTarefas.filter(t => t.concluida).length;

  // 3. Verificamos as conquistas dinamicamente
  const conquistas = [
    { 
      titulo: 'Primeira Tarefa Concluída', 
      descricao: 'Você começou sua jornada de produtividade!', 
      // A conquista é desbloqueada se o total de tarefas concluídas for 1 ou mais
      desbloqueada: totalTarefasConcluidas >= 1 
    },
    { 
      titulo: 'Semana Produtiva', 
      descricao: 'Completou mais de 10 tarefas.', 
      desbloqueada: totalTarefasConcluidas >= 10 // Simplificado para 10 tarefas totais
    },
    { 
      titulo: 'Meta Conquistada', 
      descricao: 'Atingiu o objetivo de uma meta importante.', 
      desbloqueada: false // (Isso ainda é estático, vamos arrumar no próximo passo)
    },
  ];

  // ==================================================================
  // Lógica de Metas (Ainda estática, mas pronta para o próximo passo)
  // ==================================================================
  
  // (Este mock será substituído em breve pelo estado vindo do App.jsx)
  const metasMock = [
    { titulo: 'Aprender um novo idioma', progresso: 60 },
    { titulo: 'Concluir projeto final da faculdade', progresso: 25 },
  ];

  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      
      <main className="main-content">
          <header>
              <h2>Metas e Conquistas</h2>
              <p>Acompanhe seu progresso e celebre suas vitórias.</p>
          </header>

          <section className="achievements-section">
              <h3>Conquistas Recentes</h3>
              <div className="achievements-grid">
                  
                  {/* 4. Renderizando conquistas DINÂMICAS */}
                  {conquistas.map(conquista => (
                      <div 
                          key={conquista.titulo}
                          className={`achievement-card ${!conquista.desbloqueada ? 'locked' : ''}`}
                      >
                          <h4>{conquista.titulo}</h4>
                          <p>{conquista.descricao}</p>
                      </div>
                  ))}
              </div>
              <p><Link to="/conquistas" style={{ color: 'var(--primary-color)' }}>Ver todas as conquistas</Link></p>
          </section>

          <section className="goals-section">
              <h3>Minhas Metas</h3>
              {/* 5. Renderizando metas (ainda do Mock) */}
              {metasMock.map(meta => (
                  <div className="goal-item" key={meta.titulo}>
                      <h4>{meta.titulo}</h4>
                      <div className="progress-bar">
                          <div 
                              className="progress" 
                              style={{ width: `${meta.progresso}%` }}
                          ></div>
                      </div>
                      <span>{meta.progresso}%</span>
                  </div>
              ))}
          </section>
      </main>
    </div>
  );
}
export default TelaMetas;