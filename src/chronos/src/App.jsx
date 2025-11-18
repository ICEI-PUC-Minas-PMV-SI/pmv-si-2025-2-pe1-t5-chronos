// Arquivo: src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// Importa TODOS os serviços
import * as TarefaService from './services/tarefaService';
import * as MetaService from './services/metaService';
import * as ProjetoService from './services/projetoService'; 

// Importações das Páginas e Componentes
import MenuPrincipal from './components/MenuPrincipal'; 
import MenuRotas from './components/MenuRotas'; 
import TelaDashboard from './pages/TelaDashboard';
import TelaRotina from './pages/TelaRotina';
import TelaMetas from './pages/TelaMetas';
import TelaConquistas from './pages/TelaConquistas';
import TelaProjetos from './pages/TelaProjetos';
import TelaBuscar from './pages/TelaBuscar';
import TelaCalendario from './pages/TelaCalendario'; // Importando o Calendário

function App() {

  // --- Estados (Tarefas, Metas, Projetos) ---
  const [listaTarefas, setListaTarefas] = useState(TarefaService.getTarefas);
  const [listaMetas, setListaMetas] = useState(MetaService.getMetas);
  const [listaProjetos, setListaProjetos] = useState(ProjetoService.getProjetos); // Já tínhamos

  // --- Funções de Tarefas ---
  const handleSalvarTarefa = (tarefaSalva) => {
    const novaLista = TarefaService.salvarTarefa(tarefaSalva, listaTarefas);
    setListaTarefas(novaLista);
  };
  const handleRemoverTarefa = (idTarefa) => {
    const novaLista = TarefaService.removerTarefa(idTarefa, listaTarefas);
    setListaTarefas(novaLista);
  };
  const toggleConcluida = (idTarefa) => {
    const novaLista = TarefaService.toggleConcluida(idTarefa, listaTarefas);
    setListaTarefas(novaLista);
  };
  
  // --- Funções de Metas ---
  const handleSalvarMeta = (metaSalva) => {
    const novaLista = MetaService.salvarMeta(metaSalva, listaMetas);
    setListaMetas(novaLista);
  };
  const handleRemoverMeta = (idMeta) => {
    const novaLista = MetaService.removerMeta(idMeta, listaMetas);
    setListaMetas(novaLista);
  };

  // ==================================================================
  // NOVO: FUNÇÕES DE PROJETOS
  // ==================================================================
  const handleSalvarProjeto = (projetoSalvo) => {
    const novaLista = ProjetoService.salvarProjeto(projetoSalvo, listaProjetos);
    setListaProjetos(novaLista);
  };
  
  const handleRemoverProjeto = (idProjeto) => {
    const novaLista = ProjetoService.removerProjeto(idProjeto, listaProjetos);
    setListaProjetos(novaLista);
  };
  // ==================================================================


  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<MenuRotas />} /> 
        
        <Route path="/inicio" element={
          <TelaDashboard listaTarefas={listaTarefas} />
        }/> 
        
        <Route path="/rotina" element={
          <TelaRotina 
            listaTarefas={listaTarefas}
            onSalvarTarefa={handleSalvarTarefa}
            onRemoverTarefa={handleRemoverTarefa}
            onToggleConcluida={toggleConcluida}
            listaMetas={listaMetas} 
            listaProjetos={listaProjetos}
          />} 
        />
        
        <Route path="/calendario" element={
          <TelaCalendario 
            listaTarefas={listaTarefas} 
          />} 
        />
        
        <Route path="/metas" element={
          <TelaMetas 
            listaTarefas={listaTarefas} 
            listaMetas={listaMetas}
            onSalvarMeta={handleSalvarMeta}
            onRemoverMeta={handleRemoverMeta}
          />} 
        />
        
        <Route path="/conquistas" element={
          <TelaConquistas 
            listaTarefas={listaTarefas} 
            listaMetas={listaMetas}
          />} 
        />

        {/* NOVO: Passando as funções de Salvar/Remover para a TelaProjetos */}
        <Route path="/projetos" element={
          <TelaProjetos 
            listaProjetos={listaProjetos} 
            onSalvarProjeto={handleSalvarProjeto}
            onRemoverProjeto={handleRemoverProjeto}
          />} 
        />
        
        <Route path="/buscar" element={
          <TelaBuscar 
            listaTarefas={listaTarefas}
            listaMetas={listaMetas}
            listaProjetos={listaProjetos}
          />} 
        />
        
        <Route path="*" element={
          <div className="app-layout">
            <MenuPrincipal />
            <main className="main-content">
              <h1>404 | Página Não Encontrada</h1>
              <p>O caminho que você tentou acessar não existe no Chronos.</p>
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;