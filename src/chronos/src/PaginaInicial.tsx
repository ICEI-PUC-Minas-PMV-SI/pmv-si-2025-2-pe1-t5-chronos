import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";

export default function Paginainicial() {
  const [notas, setNotas] = useState<string[]>([]);
  const [novaNota, setNovaNota] = useState("");

  const [atividades, setAtividades] = useState<
    { titulo: string; data: string }[]
  >([]);
  const [tituloAtividade, setTituloAtividade] = useState("");
  const [dataAtividade, setDataAtividade] = useState("");

  useEffect(() => {
    const notasSalvas = localStorage.getItem("notas");
    const atividadesSalvas = localStorage.getItem("atividades");

    if (notasSalvas) setNotas(JSON.parse(notasSalvas));
    if (atividadesSalvas) setAtividades(JSON.parse(atividadesSalvas));
  }, []);

  useEffect(() => {
    localStorage.setItem("notas", JSON.stringify(notas));
    localStorage.setItem("atividades", JSON.stringify(atividades));
  }, [notas, atividades]);

  const adicionarNota = () => {
    if (novaNota.trim() === "") return;
    setNotas([...notas, novaNota]);
    setNovaNota("");
  };

  const excluirNota = (index: number) => {
    setNotas(notas.filter((_, i) => i !== index));
  };

  const adicionarAtividade = () => {
    if (!tituloAtividade || !dataAtividade) return;

    const nova = { titulo: tituloAtividade, data: dataAtividade };
    setAtividades([...atividades, nova]);

    setTituloAtividade("");
    setDataAtividade("");
  };

  const excluirAtividade = (index: number) => {
    setAtividades(atividades.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      {/* MENU LATERAL */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Chronos</h1>
        </div>

        <ul className="menu">
          <li className="active">🏠 Início</li>
          <li>📅 Calendário</li>
          <li>🎯 Metas</li>
          <li>🔔 Lembretes</li>
          <li>🏆 Conquistas</li>
        </ul>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="content">
        <div className="card">
          <h2>📝 Criar Nota</h2>
          <textarea
            value={novaNota}
            placeholder="Digite sua nota..."
            onChange={(e) => setNovaNota(e.target.value)}
          />
          <button onClick={adicionarNota}>Adicionar</button>

          <ul className="item-list">
            {notas.map((nota, index) => (
              <li key={index}>
                {nota}
                <button onClick={() => excluirNota(index)}>❌</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>📋 Criar Atividade</h2>
          <input
            type="text"
            placeholder="Título"
            value={tituloAtividade}
            onChange={(e) => setTituloAtividade(e.target.value)}
          />
          <input
            type="date"
            value={dataAtividade}
            onChange={(e) => setDataAtividade(e.target.value)}
          />
          <button onClick={adicionarAtividade}>Adicionar</button>

          <ul className="item-list">
            {atividades.map((atividade, i) => (
              <li key={i}>
                {atividade.titulo} — {atividade.data}
                <button onClick={() => excluirAtividade(i)}>❌</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
