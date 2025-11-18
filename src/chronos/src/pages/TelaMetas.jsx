// Arquivo: src/pages/TelaMetas.jsx

import React from 'react';
import MenuPrincipal from '../components/MenuPrincipal'; 
import { Link } from 'react-router-dom';

// 1. IMPORTAR O SERVIÇO DE METAS (para o cálculo)
import * as MetaService from '../services/metaService'; 

// 2. IMPORTAR OS GRÁFICOS (Recharts)
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer 
} from 'recharts';

// 3. RECEBENDO AS PROPS DO App.jsx
// (onSalvarMeta e onRemoverMeta estão prontos para o próximo passo)
function TelaMetas({ 
  listaTarefas, 
  listaMetas, 
  onSalvarMeta, 
  onRemoverMeta 
}) {
  
  // --- Lógica de Conquistas (Dinâmica, baseada nas tarefas) ---
  const totalTarefasConcluidas = listaTarefas.filter(t => t.concluida).length;
  
  const conquistas = [
    { 
      titulo: 'Primeira Tarefa Concluída', 
      descricao: 'Você começou sua jornada de produtividade!', 
      desbloqueada: totalTarefasConcluidas >= 1 
    },
    { 
      titulo: 'Semana Produtiva', 
      descricao: 'Completou mais de 10 tarefas.', 
      desbloqueada: totalTarefasConcluidas >= 10
    },
    // (Esta lógica será baseada no progresso das metas)
    { 
      titulo: 'Meta Conquistada', 
      descricao: 'Atingiu o objetivo de uma meta importante.', 
      desbloqueada: false // (Lógica pendente)
    },
  ];
  // Filtra as 3 primeiras conquistas (para o resumo)
  const conquistasRecentes = conquistas.slice(0, 3);


  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      
      <main className="main-content">
          <header>
              <h2>Metas e Conquistas</h2>
              <p>Acompanhe seu progresso e celebre suas vitórias.</p>
          </header>

          {/* Seção de Conquistas (Agora dinâmica) */}
          <section className="achievements-section">
              <h3>Conquistas Recentes</h3>
              <div className="achievements-grid">
                  {conquistasRecentes.map(conquista => (
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

          {/* Seção de Metas (Agora 100% dinâmica) */}
          <section className="goals-section">
              <h3>Minhas Metas</h3>
              
              {/* (Botão para o próximo passo) */}
              {/* <button className="adicionar-btn">+ Adicionar Meta</button> */}
              
              {/* 4. Renderizando metas DINÂMICAS (lendo a prop listaMetas) */}
              {listaMetas.map(meta => {
                
                // 5. O CÁLCULO MÁGICO
                // Chama o serviço para calcular o progresso desta meta
                // 
                const progresso = MetaService.calcularProgressoMeta(meta, listaTarefas);
                
                // 6. Prepara dados para o gráfico (para Recharts)
                const dadosGrafico = [
                  { 
                    name: 'Progresso', // Nome da barra
                    Concluídas: progresso.concluidas, 
                    Pendentes: progresso.pendentes 
                  }
                ];

                return (
                  // Container para cada item de Meta (Cabeçalho + Gráfico)
                  <div className="goal-item-container" key={meta.id}>
                    
                    {/* Cabeçalho da Meta (Barra de Progresso) */}
                    <div className="goal-item-header">
                      <h4>{meta.titulo} (Alvo: {meta.alvo} tarefas)</h4>
                      <span>{progresso.percentual}%</span>
                    </div>
                    <div className="progress-bar">
                        <div 
                            className="progress" 
                            style={{ width: `${progresso.percentual}%` }}
                        ></div>
                    </div>
                    
                    {/* 7. O GRÁFICO (Recharts) */}
                    <div className="goal-chart-container">
                      <ResponsiveContainer width="100%" height={150}>
                        <BarChart
                          layout="vertical" // Gráfico de barra horizontal (empilhado)
                          data={dadosGrafico}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          {/* O eixo X vai de 0 até o Alvo da meta */}
                          <XAxis type="number" domain={[0, progresso.alvo]} allowDecimals={false} /> 
                          <YAxis type="category" dataKey="name" hide />
                          <Tooltip />
                          <Legend />
                          {/* Barras empilhadas */}
                          {/*  */}
                          <Bar dataKey="Concluídas" stackId="a" fill="var(--primary-color)" />
                          <Bar dataKey="Pendentes" stackId="a" fill="var(--border-color)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* TODO: Adicionar botões de Editar/Remover Meta */}
                  </div>
                )
              })}
          </section>
      </main>
    </div>
  );
}
export default TelaMetas;