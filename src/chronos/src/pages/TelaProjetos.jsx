// Arquivo: src/pages/TelaProjetos.jsx

import React, { useState } from 'react'; // 1. Importar o useState
import MenuPrincipal from '../components/MenuPrincipal'; 
import ModalProjeto from '../components/ModalProjeto'; // 2. Importar o novo Modal

// 3. Recebendo as props do App.jsx
function TelaProjetos({ 
  listaProjetos, 
  onSalvarProjeto, 
  onRemoverProjeto 
}) {
  
  // 4. Estado local para controlar o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projetoParaEditar, setProjetoParaEditar] = useState(null);

  // --- Funções de Controle do Modal ---
  const handleAbrirModalCriar = () => {
    setProjetoParaEditar(null);
    setIsModalOpen(true);
  };
  const handleAbrirModalEditar = (projeto) => {
    setProjetoParaEditar(projeto);
    setIsModalOpen(true);
  };
  const handleFecharModal = () => {
    setIsModalOpen(false);
    setProjetoParaEditar(null);
  };

  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      
      <main className="main-content">
          <header>
              <h2>Meus Projetos</h2>
              <p>Organize suas tarefas em categorias personalizadas.</p>
          </header>

          {/* 5. Seção de Adicionar (Agora é um botão) */}
          <section className="add-entry-section">
              {/* Removemos o formulário daqui */}
              <button className="adicionar-btn" onClick={handleAbrirModalCriar}>
                + Adicionar Novo Projeto
              </button>
          </section>

          <section className="projects-section">
              <div className="projects-grid">
                  
                  {/* 6. Renderizando os cards dinamicamente com a prop 'listaProjetos' */}
                  {listaProjetos.map(proj => (
                      <div className="project-card" key={proj.id}>
                          {/* 7. Botões de Ação (Editar/Remover) */}
                          <div className="project-card-actions">
                            <button onClick={() => handleAbrirModalEditar(proj)}>✏️</button>
                            <button onClick={() => onRemoverProjeto(proj.id)}>❌</button>
                          </div>
                          
                          <h3>{proj.nome}</h3>
                          
                          {/* (No futuro, podemos calcular o total de tarefas) */}
                          {/* <p>{proj.descricao}</p> */}
                          {/* <span>{proj.tarefas} tarefas</span> */}
                      </div>
                  ))}

                  {/* Mensagem se não houver projetos */}
                  {listaProjetos.length === 0 && (
                    <p>Nenhum projeto criado. Clique em "Adicionar" para começar.</p>
                  )}
              </div>
          </section>
      </main>

      {/* 8. Renderização do Modal */}
      <ModalProjeto
        isOpen={isModalOpen}
        onClose={handleFecharModal}
        onSalvar={onSalvarProjeto}
        projetoParaEditar={projetoParaEditar}
      />
    </div>
  );
}
export default TelaProjetos;