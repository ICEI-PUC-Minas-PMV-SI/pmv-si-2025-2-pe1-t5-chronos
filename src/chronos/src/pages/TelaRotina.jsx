// Arquivo: src/pages/TelaRotina.jsx

import React, { useState } from 'react';
import MenuPrincipal from '../components/MenuPrincipal'; 
import ModalTarefa from '../components/ModalTarefa'; 
import TarefaItem from '../components/TarefaItem'; 
// 1. IMPORTAR OS COMPONENTES DE GRÁFICO
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';

// Recebendo as props do App.jsx
function TelaRotina({ 
  listaTarefas, 
  onSalvarTarefa, 
  onRemoverTarefa, 
  onToggleConcluida,
  listaMetas // (Recebido do App.jsx, pronto para o próximo passo)
}) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tarefaParaEditar, setTarefaParaEditar] = useState(null); 

  // --- Funções de Controle do Modal ---
  const handleAbrirModalCriar = () => {
    setTarefaParaEditar(null);
    setIsModalOpen(true);
  };
  const handleAbrirModalEditar = (tarefa) => {
    setTarefaParaEditar(tarefa);
    setIsModalOpen(true);
  };
  const handleFecharModal = () => {
    setIsModalOpen(false);
    setTarefaParaEditar(null);
  };

  // --- Funções de Filtro e Cálculo ---
  const filtrarPorPeriodo = (periodo) => {
    return listaTarefas.filter(t => t.periodo === periodo);
  };
  
  // 2. CÁLCULO DOS DADOS PARA O GRÁFICO
  const totalConcluidas = listaTarefas.filter(t => t.concluida).length;
  const totalPendentes = listaTarefas.filter(t => !t.concluida).length;
  const resumoHeader = `${totalPendentes} tarefas pendentes`;

  // 3. PREPARAÇÃO DOS DADOS (formato que o Recharts espera)
  const dadosGrafico = [
    { name: 'Concluídas', value: totalConcluidas },
    { name: 'Pendentes', value: totalPendentes },
  ];

  // Cores para o gráfico
  const COLORS = ['#6a5af9', '#e0e0e0']; // (Cor Primária e Cor de Borda/Cinza)


  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      
      <main className="main-content">
          
          <header className="rotina-header">
              <div className="rotina-title">
                  <h2>Hoje</h2>
                  <p>{resumoHeader}</p>
              </div>
              <button className="adicionar-btn" onClick={handleAbrirModalCriar}>
                + Adicionar
              </button> 
          </header>

          <div className="rotina">
              
              {/* Cards de Período (Manhã, Tarde, Noite, Notas) */}
              {/* ... (O código dos cards .periodo-card e .notas-card não muda) ... */}
              <div className="periodo-card">
                  <h3>Manhã</h3>
                  <ul>
                      {filtrarPorPeriodo('manhã').map(t => (
                        <TarefaItem 
                          key={t.id} tarefa={t} onToggle={onToggleConcluida}
                          onEditar={handleAbrirModalEditar} onRemover={onRemoverTarefa}
                        />
                      ))}
                  </ul>
              </div>
              <div className="periodo-card">
                  <h3>Tarde</h3>
                  <ul>
                      {filtrarPorPeriodo('tarde').map(t => (
                        <TarefaItem 
                          key={t.id} tarefa={t} onToggle={onToggleConcluida}
                          onEditar={handleAbrirModalEditar} onRemover={onRemoverTarefa}
                        />
                      ))}
                  </ul>
              </div>
              <div className="periodo-card">
                  <h3>Noite</h3>
                  <ul>
                      {filtrarPorPeriodo('noite').map(t => (
                        <TarefaItem 
                          key={t.id} tarefa={t} onToggle={onToggleConcluida}
                          onEditar={handleAbrirModalEditar} onRemover={onRemoverTarefa}
                        />
                      ))}
                  </ul>
              </div>
              <div className="notas-card">
                  <h3>Notas rápidas</h3>
                  <ul>
                      {filtrarPorPeriodo('notas').map(t => (
                        <TarefaItem 
                          key={t.id} tarefa={t} onToggle={onToggleConcluida}
                          onEditar={handleAbrirModalEditar} onRemover={onRemoverTarefa}
                        />
                      ))}
                  </ul>
              </div>

              
              {/* 4. ATUALIZAÇÃO DO CARD DE GRÁFICO */}
              <div className="graph-card">
                  <h3>Progresso do Dia</h3>
                  
                  {/* Substituímos o placeholder pelo gráfico dinâmico */}
                  <div className="grafico-rotina-container">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={dadosGrafico}
                          cx="50%" // Posição X (centro)
                          cy="50%" // Posição Y (centro)
                          innerRadius={50} // Raio interno (para fazer um "Donut")
                          outerRadius={80} // Raio externo
                          fill="#8884d8"
                          paddingAngle={5} // Espaço entre as fatias
                          dataKey="value" // O valor a ser plotado
                        >
                          {/* Mapeia as cores para as fatias */}
                          {dadosGrafico.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
              </div>
          </div>
      </main>

      {/* 5. Modal (Passando listaMetas para o próximo passo) */}
      <ModalTarefa 
        isOpen={isModalOpen} 
        onClose={handleFecharModal} 
        onSalvar={onSalvarTarefa}
        tarefaParaEditar={tarefaParaEditar}
        listaMetas={listaMetas} // Passando as metas para o modal
      />
    </div>
  );
}

export default TelaRotina;