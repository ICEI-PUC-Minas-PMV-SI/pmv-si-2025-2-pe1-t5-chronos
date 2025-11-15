// Arquivo: src/App.jsx

import React, { useState, useEffect } from 'react'; // 1. IMPORTAR HOOKS AQUI
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// Importações dos Componentes e Páginas
import MenuPrincipal from './components/MenuPrincipal'; 
import MenuRotas from './components/MenuRotas'; 
import TelaDashboard from './pages/TelaDashboard';
import TelaRotina from './pages/TelaRotina';
import TelaMetas from './pages/TelaMetas';
import TelaLembretes from './pages/TelaLembretes';
import TelaConquistas from './pages/TelaConquistas';
import TelaProjetos from './pages/TelaProjetos';
import TelaBuscar from './pages/TelaBuscar';
import TelaAnalise from './pages/TelaAnalise';
import TelaConfiguracoes from './pages/TelaConfiguracoes'; // Corrigi o nome do arquivo aqui
import TelaCalendario from './pages/TelaCalendario'; // Corrigi o nome do arquivo aqui

function App() {

  // ==================================================================
  // 2. LÓGICA DAS TAREFAS (MOVIDA DA TELA ROTINA PARA CÁ)
  // ==================================================================
  
  // --- Estado de Persistência (Local Storage) ---
  const getTarefasIniciais = () => {
    // Busca as tarefas salvas
    const storedTarefas = localStorage.getItem('chronos_tarefas_v2'); 
    if (storedTarefas) {
      return JSON.parse(storedTarefas);
    }
    // Se não houver nada salvo, retorna um exemplo
    return [
      { id: 1, texto: 'Estudar para o exame', concluida: false, periodo: 'manhã', isNota: false, dataCriacao: '04/11/2025'},
      { id: 2, texto: 'Exercícios matinais', concluida: false, periodo: 'manhã', isNota: false, dataCriacao: '04/11/2025'},
      { id: 3, texto: 'Reunião de equipe (14h)', concluida: true, periodo: 'tarde', isNota: false, dataCriacao: '03/11/2025'},
      { id: 4, texto: 'Preparar material da aula', concluida: false, periodo: 'notas', isNota: true, dataCriacao: '03/11/2025'},
    ];
  };

  // O estado central das tarefas
  const [listaTarefas, setListaTarefas] = useState(getTarefasIniciais);
  
  // Salva no Local Storage sempre que 'listaTarefas' mudar
  useEffect(() => {
    localStorage.setItem('chronos_tarefas_v2', JSON.stringify(listaTarefas));
  }, [listaTarefas]);
  
  // --- Funções de Lógica (CRUD das Tarefas) ---
  const handleSalvarTarefa = (tarefaSalva) => {
    if (tarefaSalva.id) { // Se tem ID, é Edição
      // Mapeia a lista e substitui a tarefa antiga pela nova (tarefaSalva)
      const novaLista = listaTarefas.map(t => 
        t.id === tarefaSalva.id ? tarefaSalva : t
      );
      setListaTarefas(novaLista);
    } else { // Se não tem ID, é Criação
      setListaTarefas(prevTarefas => [
        ...prevTarefas, 
        // Adiciona a tarefa com um novo ID e data
        { ...tarefaSalva, id: Date.now(), dataCriacao: new Date().toLocaleDateString() } 
      ]);
    }
  };

  const handleRemoverTarefa = (idTarefa) => {
    // Filtra a lista, removendo a tarefa com o ID correspondente
    const novaLista = listaTarefas.filter(t => t.id !== idTarefa);
    setListaTarefas(novaLista);
  };
  
  const toggleConcluida = (idTarefa) => {
    // Encontra a tarefa e inverte o status 'concluida'
    const novaLista = listaTarefas.map(tarefa => {
      if (tarefa.id === idTarefa) {
        return { ...tarefa, concluida: !tarefa.concluida }; 
      }
      return tarefa;
    });
    setListaTarefas(novaLista);
  };
  // ==================================================================

  // (Aqui, no futuro, adicionaremos o Estado das Metas)

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<MenuRotas />} /> 
        
        {/* 3. PASSANDO O ESTADO PARA AS PÁGINAS (Props) */}
        
        <Route path="/inicio" element={
          <TelaDashboard 
            listaTarefas={listaTarefas} // Dashboard agora pode ler as tarefas
          />} 
        /> 
        
        {/* TelaRotina agora recebe o estado E as funções de manipulação */}
        <Route path="/rotina" element={
          <TelaRotina 
            listaTarefas={listaTarefas}
            onSalvarTarefa={handleSalvarTarefa}
            onRemoverTarefa={handleRemoverTarefa}
            onToggleConcluida={toggleConcluida}
            // listaMetas={...} (será adicionado no próximo passo)
          />} 
        />
        
        {/* TelaMetas agora pode LER o estado das tarefas */}
        <Route path="/metas" element={
          <TelaMetas 
            listaTarefas={listaTarefas} 
            // listaMetas={...} (será adicionado no próximo passo)
          />} 
        />
        
        <Route path="/conquistas" element={
          <TelaConquistas 
            listaTarefas={listaTarefas} 
            // listaMetas={...} (será adicionado no próximo passo)
          />} 
        />

        {/* Rotas restantes */}
        <Route path="/projetos" element={<TelaProjetos />} />
        <Route path="/lembretes" element={<TelaLembretes />} />
        <Route path="/buscar" element={<TelaBuscar />} />
        <Route path="/analise" element={<TelaAnalise />} />
        <Route path="/calendario" element={<TelaCalendario />} />
        <Route path="/configuracoes" element={<TelaConfiguracoes />} />
        
        <Route path="*" element={
          <div className="app-layout">
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