import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";

export default function PaginaInicial() {
  const [notas, setNotas] = useState<string[]>([]);
  const [novaNota, setNovaNota] = useState("");

  const [atividades, setAtividades] = useState<{ titulo: string; data: string }[]>([]);
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

  const removerNota = (index: number) => {
    const novaLista = [...notas];
    novaLista.splice(index, 1);
    setNotas(novaLista);
  };

  const adicionarAtividade = () => {
    if (tituloAtividade.trim() === "") return;
    setAtividades([...atividades, { titulo: tituloAtividade, data: dataAtividade }]);
    setTituloAtividade("");
    setDataAtividade("");
  };

  const removerAtividade = (index: number) => {
    const novaLista = [...atividades];
    novaLista.splice(index, 1);
    setAtividades(novaLista);
  };

  return (
    <div className="dashboard-page">
      <h1>Chronos - Página Inicial</h1>
      
      <section>
        <h2>Notas</h2>
        <input
          value={novaNota}
          onChange={(e) => setNovaNota(e.target.value)}
          placeholder="Digite uma nota"
        />
        <button onClick={adicionarNota}>Adicionar Nota</button>

        <ul>
          {notas.map((nota, index) => (
            <li key={index}>
              {nota} 
              <button onClick={() => removerNota(index)}>Excluir</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Atividades</h2>
        <input
          value={tituloAtividade}
          onChange={(e) => setTituloAtividade(e.target.value)}
          placeholder="Título da atividade"
        />
        <input
          type="date"
          value={dataAtividade}
          onChange={(e) => setDataAtividade(e.target.value)}
        />
        <button onClick={adicionarAtividade}>Adicionar Atividade</button>

        <ul>
          {atividades.map((atividade, index) => (
            <li key={index}>
              {atividade.titulo} - {atividade.data}
              <button onClick={() => removerAtividade(index)}>Excluir</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
