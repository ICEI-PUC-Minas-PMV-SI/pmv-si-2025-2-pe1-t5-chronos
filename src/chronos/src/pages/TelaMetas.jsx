// Arquivo: src/pages/TelaMetas.jsx

import React from 'react';
import MenuPrincipal from '../components/MenuPrincipal'; 
import { Link } from 'react-router-dom';

function TelaMetas() {
  
  // MOCKS para Metas e Conquistas
  const metasMock = [
    { titulo: 'Aprender um novo idioma', progresso: 60 },
    { titulo: 'Concluir projeto final da faculdade', progresso: 25 },
  ];

  const conquistasMock = [
    { titulo: 'Primeira Tarefa Concluída', descricao: 'Você começou sua jornada de produtividade!', desbloqueada: true },
    { titulo: 'Semana Produtiva', descricao: 'Completou mais de 10 tarefas em uma semana.', desbloqueada: true },
    { titulo: 'Meta Conquistada', descricao: 'Atingiu o objetivo de uma meta importante.', desbloqueada: false },
  ];

  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      
      <main className="main-content"> {/* Uso da classe principal do CSS */}
          <header>
              <h2>Metas e Conquistas</h2>
              <p>Acompanhe seu progresso e celebre suas vitórias.</p>
          </header>

          <section className="achievements-section">
              <h3>Conquistas Recentes</h3>
              <div className="achievements-grid">
                  {/* Renderizando conquistas */}
                  {conquistasMock.map(conquista => (
                      <div 
                          key={conquista.titulo}
                          className={`achievement-card ${!conquista.desbloqueada ? 'locked' : ''}`}
                      >
                          <h4>{conquista.titulo}</h4>
                          <p>{conquista.descricao}</p>
                      </div>
                  ))}
              </div>
              {/* Adicionar link para a tela de Conquistas completa */}
              <p><Link to="/conquistas" style={{ color: 'var(--primary-color)' }}>Ver todas as conquistas</Link></p>
          </section>

          <section className="goals-section">
              <h3>Minhas Metas</h3>
              {/* Renderizando metas */}
              {metasMock.map(meta => (
                  <div className="goal-item" key={meta.titulo}>
                      <h4>{meta.titulo}</h4>
                      <div className="progress-bar">
                          {/* Uso do style para definir o progresso via React */}
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