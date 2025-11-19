

import React from "react";
import MenuPrincipal from "../components/MenuPrincipal";
import "../styles/dashboard.css"; // 🔥 IMPORT ABSOLUTO — FUNCIONA EM QUALQUER CAMINHO

export default function TelaDashboard() {
  return (
    <div className="dashboard-container">
      {/* MENU LATERAL */}
      <MenuPrincipal />

      {/* ÁREA PRINCIPAL */}
      <main className="dashboard-content">
        {/* LOGO */}
        <div className="dashboard-logo-box">
          <h1 className="logo-title">CHRONOS</h1>
        </div>

        {/* LINHA SUPERIOR */}
        <div className="dashboard-row">
          {/* Criar Nota */}
          <div className="card">
            <h2 className="card-title">Criar nota</h2>
            <textarea className="input-area" placeholder="Escreva uma nota rápida..."></textarea>
            <button className="btn">Adicionar</button>
            <p className="info-text">Sem notas ainda.</p>
          </div>

          {/* Criar Atividade */}
          <div className="card">
            <h2 className="card-title">Criar atividade</h2>
            <input className="input" placeholder="Título da atividade" />
            <input className="input" placeholder="dd/mm/aaaa" />
            <button className="btn">Adicionar</button>
            <p className="info-text">Sem atividades ainda.</p>
          </div>
        </div>

        {/* CARDS MÉDIOS */}
        <div className="dashboard-row">
          <div className="small-card">
            <h3 className="small-title">Atividades</h3>
            <p className="small-number">0</p>
            <p className="info-text">0 em atraso</p>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p className="info-text">0% concluídas</p>
          </div>

          <div className="small-card">
            <h3 className="small-title">Notas</h3>
            <p className="small-number">0</p>
            <p className="info-text">Anotações rápidas para não esquecer</p>
          </div>

          <div className="small-card">
            <h3 className="small-title">Metas</h3>
            <p className="small-number">3</p>
            <p className="info-text">Acompanhe seu progresso</p>
          </div>
        </div>

        {/* GRÁFICO + RESUMO */}
        <div className="dashboard-row">
          <div className="chart-card">
            <h3 className="small-title">Produtividade na semana</h3>
          </div>

          <div className="chart-card">
            <h3 className="small-title">Resumo rápido</h3>
          </div>
        </div>
      </main>
    </div>
  );
}


