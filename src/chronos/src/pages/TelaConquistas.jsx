// Arquivo: src/pages/TelaConquistas.jsx

import React from 'react';
import MenuPrincipal from '../components/MenuPrincipal'; 

function TelaConquistas() {
  
  // No futuro, esta lista viria do estado ou de uma API
  const conquistasMock = [
    { titulo: 'Primeira Tarefa Concluída', descricao: 'Você começou sua jornada de produtividade!', desbloqueada: true },
    { titulo: 'Semana Produtiva', descricao: 'Completou mais de 10 tarefas em uma semana.', desbloqueada: true },
    { titulo: 'Meta Conquistada', descricao: 'Atingiu o objetivo de uma meta importante.', desbloqueada: false },
    { titulo: '7 Dias Seguidos', descricao: 'Usou o Chronos por uma semana consecutiva.', desbloqueada: false },
    { titulo: 'Planejamento Efetivo', descricao: 'Planejou uma semana inteira com antecedência.', desbloqueada: false },
  ];

  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      
      <main class="main-content">
          <header>
              <h2>Minhas Conquistas</h2>
              <p>Todo o seu esforço e dedicação registrados.</p>
          </header>

          <section className="achievements-section">
              <div className="achievements-grid">
                  {/* Renderizando os cartões de conquista dinamicamente */}
                  {conquistasMock.map(conquista => (
                      <div 
                          key={conquista.titulo}
                          // Adicionando a classe 'locked' se a conquista não estiver desbloqueada
                          className={`achievement-card ${!conquista.desbloqueada ? 'locked' : ''}`}
                      >
                          <h4>{conquista.titulo}</h4>
                          <p>{conquista.descricao}</p>
                      </div>
                  ))}
              </div>
          </section>
      </main>
    </div>
  );
}
export default TelaConquistas;