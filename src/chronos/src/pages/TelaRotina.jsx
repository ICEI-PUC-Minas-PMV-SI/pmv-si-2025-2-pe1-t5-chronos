// Arquivo: src/pages/TelaRotina.jsx

import React, { useState } from 'react';
import MenuPrincipal from '../components/MenuPrincipal'; 
import ModalTarefa from '../components/ModalTarefa'; 
import TarefaItem from '../components/TarefaItem'; 
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend 
} from 'recharts';
import { getHojeLocal } from '../utils/dateUtils';

// 1. Recebendo 'listaProjetos' como prop
function TelaRotina({ 
  listaTarefas, 
  onSalvarTarefa, 
  onRemoverTarefa, 
  onToggleConcluida,
  listaMetas,
  listaProjetos // NOVO
}) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tarefaParaEditar, setTarefaParaEditar] = useState(null); 

  // --- Funções (sem alteração) ---
  const handleAbrirModalCriar = () => { setTarefaParaEditar(null); setIsModalOpen(true); };
  const handleAbrirModalEditar = (tarefa) => { setTarefaParaEditar(tarefa); setIsModalOpen(true); };
  const handleFecharModal = () => { setIsModalOpen(false); setTarefaParaEditar(null); };
  const hoje = getHojeLocal();
  const tarefasDeHoje = listaTarefas.filter(t => t.data === hoje);
  const filtrarPorPeriodo = (periodo) => {
    return tarefasDeHoje.filter(t => t.periodo === periodo);
  };
  const totalConcluidas = tarefasDeHoje.filter(t => t.concluida).length;
  const totalPendentes = tarefasDeHoje.filter(t => !t.concluida).length;
  const resumoHeader = `${totalPendentes} tarefas pendentes hoje`;
  const dadosGrafico = [
    { name: 'Concluídas', value: totalConcluidas },
    { name: 'Pendentes', value: totalPendentes },
  ];
  const COLORS = ['#6a5af9', '#e0e0e0'];

  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      
      <main className="main-content">
          
          <header className="rotina-header">
              {/* ... (cabeçalho sem alteração) ... */}
              <button className="adicionar-btn" onClick={handleAbrirModalCriar}>
                + Adicionar
              </button> 
          </header>

          <div className="rotina">
              
              {/* ... (cards de período sem alteração) ... */}
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


              {/* ... (gráfico sem alteração) ... */}
              <div className="graph-card">
                  <h3>Progresso do Dia</h3>
                  <div className="grafico-rotina-container">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={dadosGrafico} cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
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

      {/* 2. NOVO: Passando 'listaProjetos' para o Modal */}
      <ModalTarefa 
        isOpen={isModalOpen} 
        onClose={handleFecharModal} 
        onSalvar={onSalvarTarefa}
        tarefaParaEditar={tarefaParaEditar}
        listaMetas={listaMetas} 
        listaProjetos={listaProjetos} // NOVO
      />
    </div>
  );
}

export default TelaRotina;