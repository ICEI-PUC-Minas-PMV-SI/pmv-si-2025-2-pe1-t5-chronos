// Arquivo: src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// Adicione esta linha:
import MenuPrincipal from './components/MenuPrincipal'; 
// E garanta que esta linha que criamos no passo anterior também está lá:
import MenuRotas from './components/MenuRotas';

// IMPORTANDO TODAS AS PÁGINAS DO CHRONOS
import TelaDashboard from './pages/TelaDashboard';
// ... todas as outras importações de páginas ...
import TelaRotina from './pages/TelaRotina';
import TelaMetas from './pages/TelaMetas';
import TelaLembretes from './pages/TelaLembretes';
import TelaConquistas from './pages/TelaConquistas';
import TelaProjetos from './pages/TelaProjetos';
import TelaBuscar from './pages/TelaBuscar';
import TelaAnalise from './pages/TelaAnalise';
import TelaConfiguracoes from './pages/TelaConfiguracoes';


function App() {
  return (
    <Router>
      <Routes>
        
        {/* NOVA ROTA RAIZ: Carrega o Menu de Seleção de Rota */}
        <Route path="/" element={<MenuRotas />} /> 
        
        {/* Mapeamento das Rotas do Menu Principal (mantendo o Dashboard em /inicio) */}
        <Route path="/inicio" element={<TelaDashboard />} /> 
        <Route path="/rotina" element={<TelaRotina />} />
        <Route path="/metas" element={<TelaMetas />} />
        <Route path="/lembretes" element={<TelaLembretes />} />
        <Route path="/conquistas" element={<TelaConquistas />} />
        <Route path="/projetos" element={<TelaProjetos />} />

        {/* Mapeamento das Rotas Auxiliares */}
        <Route path="/buscar" element={<TelaBuscar />} />
        <Route path="/analise" element={<TelaAnalise />} />
        <Route path="/configuracoes" element={<TelaConfiguracoes />} />
        
        {/* Rota Curinga (404 Not Found) */}
        <Route path="*" element={
          <div className="app-layout">
            {/* O Menu Principal precisa ser importado aqui também */}
            <MenuPrincipal />
            <main className="page-content">
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