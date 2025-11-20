// src/pages/TelaDashboard.jsx

import React, { useEffect, useState } from "react";
import MenuPrincipal from "../components/MenuPrincipal";
import "../styles/dashboard.css";

import {
  getTarefas,
  salvarTarefa,
  toggleConcluida,
} from "../services/tarefaService";
import { calcularResumoDashboard } from "../services/dashboardService";

export default function TelaDashboard() {
  // Estado das tarefas
  const [tarefas, setTarefas] = useState([]);

  // Estado do resumo (dicionário)
  const [resumo, setResumo] = useState({
    totalItens: 0,
    totalAtividades: 0,
    totalNotas: 0,
    totalMetasVinculadas: 0,
    concluidas: 0,
    pendentes: 0,
    porData: {},
  });

  // Estado dos inputs
  const [notaTexto, setNotaTexto] = useState("");
  const [atividadeTitulo, setAtividadeTitulo] = useState("");
  const [atividadeData, setAtividadeData] = useState("");

  // Carrega tarefas e resumo ao montar
  useEffect(() => {
    const lista = getTarefas();
    setTarefas(lista);
    setResumo(calcularResumoDashboard(lista));
  }, []);

  const atualizarResumo = (listaAtualizada) => {
    setResumo(calcularResumoDashboard(listaAtualizada));
  };

  // Handlers de Adicionar
  const handleAdicionarNota = () => {
    if (!notaTexto.trim()) return;

    const novaLista = salvarTarefa(
      {
        texto: notaTexto.trim(),
        concluida: false,
        isNota: true,
        periodo: "manhã",
        metaId: null,
      },
      tarefas
    );

    setTarefas(novaLista);
    atualizarResumo(novaLista);
    setNotaTexto("");
  };

  const handleAdicionarAtividade = () => {
    if (!atividadeTitulo.trim()) return;

    const novaLista = salvarTarefa(
      {
        texto: atividadeTitulo.trim(),
        concluida: false,
        isNota: false,
        periodo: "manhã",
        data: atividadeData || undefined, // se vier vazio, o service usa getHojeLocal()
        metaId: null,
      },
      tarefas
    );

    setTarefas(novaLista);
    atualizarResumo(novaLista);
    setAtividadeTitulo("");
    setAtividadeData("");
  };

  const handleToggleConcluida = (idTarefa) => {
    const novaLista = toggleConcluida(idTarefa, tarefas);
    setTarefas(novaLista);
    atualizarResumo(novaLista);
  };

  // Listas derivadas
  const notas = tarefas.filter((t) => t.isNota);
  const atividades = tarefas.filter((t) => !t.isNota);

  const percentualConcluidas =
    resumo.totalAtividades > 0
      ? Math.round((resumo.concluidas / resumo.totalAtividades) * 100)
      : 0;

  // Dados para o gráfico de produtividade
  const dadosProdutividade = Object.entries(resumo.porData)
    .map(([data, info]) => ({
      data,
      total: info.total,
      concluidas: info.concluidas,
      pendentes: info.pendentes,
      percentual:
        info.total > 0
          ? Math.round((info.concluidas / info.total) * 100)
          : 0,
    }))
    .sort((a, b) => a.data.localeCompare(b.data));

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
            <textarea
              className="input-area"
              placeholder="Escreva uma nota rápida..."
              value={notaTexto}
              onChange={(e) => setNotaTexto(e.target.value)}
            ></textarea>
            <button className="btn" onClick={handleAdicionarNota}>
              Adicionar
            </button>
            <p className="info-text">
              {resumo.totalNotas === 0
                ? "Sem notas ainda."
                : `Você tem ${resumo.totalNotas} nota(s).`}
            </p>
          </div>

          {/* Criar Atividade */}
          <div className="card">
            <h2 className="card-title">Criar atividade</h2>
            <input
              className="input"
              placeholder="Título da atividade"
              value={atividadeTitulo}
              onChange={(e) => setAtividadeTitulo(e.target.value)}
            />
            <input
              className="input"
              placeholder="dd/mm/aaaa"
              value={atividadeData}
              onChange={(e) => setAtividadeData(e.target.value)}
            />
            <button className="btn" onClick={handleAdicionarAtividade}>
              Adicionar
            </button>
            <p className="info-text">
              {resumo.totalAtividades === 0
                ? "Sem atividades ainda."
                : `Você tem ${resumo.totalAtividades} atividade(s).`}
            </p>
          </div>
        </div>

        {/* CARDS MÉDIOS */}
        <div className="dashboard-row">
          <div className="small-card">
            <h3 className="small-title">Atividades</h3>
            <p className="small-number">{resumo.totalAtividades}</p>
            <p className="info-text">
              {atividades.length === 0
                ? "Nenhuma atividade cadastrada."
                : `${resumo.concluidas} concluída(s), ${resumo.pendentes} pendente(s)`}
            </p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentualConcluidas}%` }}
              ></div>
            </div>
            <p className="info-text">{percentualConcluidas}% concluídas</p>
          </div>

          <div className="small-card">
            <h3 className="small-title">Notas</h3>
            <p className="small-number">{resumo.totalNotas}</p>
            <p className="info-text">
              Anotações rápidas para não esquecer
            </p>
          </div>

          <div className="small-card">
            <h3 className="small-title">Metas</h3>
            <p className="small-number">{resumo.totalMetasVinculadas}</p>
            <p className="info-text">Acompanhe seu progresso</p>
          </div>
        </div>

        {/* GRÁFICO + RESUMO */}
        <div className="dashboard-row">
          <div className="chart-card">
            <h3 className="small-title">Produtividade por dia</h3>

            {dadosProdutividade.length === 0 ? (
              <p className="info-text">Sem dados para exibir ainda.</p>
            ) : (
              <div className="chart-body">
                {dadosProdutividade.map((d) => (
                  <div key={d.data} className="chart-row">
                    <span className="chart-date">{d.data}</span>
                    <div className="chart-bar-bg">
                      <div
                        className="chart-bar-fill"
                        style={{ width: `${d.percentual}%` }}
                      ></div>
                    </div>
                    <span className="chart-percentage">
                      {d.percentual}% ({d.concluidas}/{d.total})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="chart-card">
            <h3 className="small-title">Resumo rápido</h3>
            <p className="info-text">Total de itens: {resumo.totalItens}</p>
            <p className="info-text">
              Atividades: {resumo.totalAtividades} • Notas:{" "}
              {resumo.totalNotas}
            </p>
            <p className="info-text">
              Metas vinculadas: {resumo.totalMetasVinculadas}
            </p>
            <p className="info-text">
              Concluídas: {resumo.concluidas} • Pendentes:{" "}
              {resumo.pendentes}
            </p>
          </div>
        </div>

        {/* LISTA DE NOTAS E ATIVIDADES */}
        <div className="dashboard-row">
          {/* Lista de Notas */}
          <div className="card">
            <h3 className="card-title">Notas</h3>
            {notas.length === 0 ? (
              <p className="info-text">Nenhuma nota cadastrada.</p>
            ) : (
              <ul className="item-list">
                {notas.map((nota) => (
                  <li key={nota.id} className="item-row">
                    <div>
                      <p className="item-title">{nota.texto}</p>
                      {nota.data && (
                        <p className="info-text">Data: {nota.data}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Lista de Atividades */}
          <div className="card">
            <h3 className="card-title">Atividades</h3>
            {atividades.length === 0 ? (
              <p className="info-text">Nenhuma atividade cadastrada.</p>
            ) : (
              <ul className="item-list">
                {atividades.map((atv) => (
                  <li key={atv.id} className="item-row">
                    <div>
                      <p
                        className="item-title"
                        style={{
                          textDecoration: atv.concluida
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {atv.texto}
                      </p>
                      <p className="info-text">
                        {atv.data && `Data: ${atv.data} • `}
                        Status: {atv.concluida ? "Concluída" : "Pendente"}
                      </p>
                    </div>
                    <button
                      className="btn btn-small"
                      onClick={() => handleToggleConcluida(atv.id)}
                    >
                      {atv.concluida ? "Reabrir" : "Concluir"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
