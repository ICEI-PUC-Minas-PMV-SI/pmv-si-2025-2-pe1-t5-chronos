// Arquivo: src/pages/TelaProjetos.jsx

import React from 'react';
import MenuPrincipal from '../components/MenuPrincipal'; 

function TelaProjetos() {
  
  // No futuro, esta lista viria do estado ou de uma API
  const projetosMock = [
    { nome: 'Projeto', descricao: 'Tarefas relacionadas ao desenvolvimento do Chronos.', tarefas: 5 },
    { nome: 'Estudante', descricao: 'Prazos, trabalhos e estudos da faculdade.', tarefas: 8 },
    { nome: 'Trabalho', descricao: 'Compromissos e demandas profissionais.', tarefas: 12 },
    { nome: 'Rotina', descricao: 'Atividades diárias e hábitos pessoais.', tarefas: 7 },
  ];

  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      
      <main class="main-content">
          <header>
              <h2>Meus Projetos</h2>
              <p>Organize suas tarefas em categorias personalizadas.</p>
          </header>

          <section className="add-entry-section">
              <h3>Adicionar Nova Tarefa</h3>
              {/* Este formulário seria substituído por um componente reutilizável */}
              <form className="entry-form"> 
                  <input type="text" placeholder="Descrição da nova tarefa..." required />
                  <select required>
                      <option value="" disabled selected>Selecione o Projeto</option>
                      {/* Renderizando as opções com base nos dados mock */}
                      {projetosMock.map(proj => (
                          <option key={proj.nome} value={proj.nome.toLowerCase()}>{proj.nome}</option>
                      ))}
                  </select>
                  <button type="submit">+ Adicionar</button>
              </form>
          </section>

          <section className="projects-section">
              <div className="projects-grid">
                  {/* Renderizando os cartões de projeto com .map() */}
                  {projetosMock.map(proj => (
                      <div className="project-card" key={proj.nome}>
                          <h3>{proj.nome}</h3>
                          <p>{proj.descricao}</p>
                          <span>{proj.tarefas} tarefas</span>
                      </div>
                  ))}
              </div>
          </section>
      </main>
    </div>
  );
}
export default TelaProjetos;