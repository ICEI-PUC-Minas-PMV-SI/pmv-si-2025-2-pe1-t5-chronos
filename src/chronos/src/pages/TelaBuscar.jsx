// Arquivo: src/pages/TelaBuscar.jsx

import React, { useState } from 'react';
import MenuPrincipal from '../components/MenuPrincipal';
import TarefaItem from '../components/TarefaItem'; // Reutiliza o componente de item!

// 1. Recebendo as listas do App.jsx
function TelaBuscar({ listaTarefas, listaMetas, listaProjetos }) {
    
    // 2. Estado local para o texto da busca
    const [termoBusca, setTermoBusca] = useState('');

    // 3. Lógica de Filtro (só executa se houver termo de busca)
    const termo = termoBusca.toLowerCase();
    
    const tarefasEncontradas = termo ? listaTarefas.filter(t => 
        t.texto.toLowerCase().includes(termo)
    ) : [];
    
    const metasEncontradas = termo ? listaMetas.filter(m => 
        m.titulo.toLowerCase().includes(termo)
    ) : [];

    const projetosEncontrados = termo ? listaProjetos.filter(p => 
        p.nome.toLowerCase().includes(termo)
    ) : [];

    // Verificador se encontrou algo
    const encontrouResultados = 
      tarefasEncontradas.length > 0 || 
      metasEncontradas.length > 0 || 
      projetosEncontrados.length > 0;

    return (
        <div className="app-layout">
            <MenuPrincipal />
            
            <main className="main-content">
                <header>
                    <h2>Buscar</h2>
                    <p>Encontre tarefas, metas ou projetos em todo o Chronos.</p>
                </header>
                
                {/* 4. O Campo de Busca (Input) */}
                <div className="search-bar-container">
                    <input 
                        type="search" // tipo "search" dá um 'x' para limpar
                        placeholder="Digite o que você procura..."
                        className="search-input" // (Estilo será criado na Etapa 4)
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                    />
                </div>

                {/* 5. A Lista de Resultados */}
                <div className="search-results">
                    
                    {/* Mensagem de "Nada encontrado" */}
                    {termo && !encontrouResultados && (
                        <p>Nenhum resultado encontrado para "{termoBusca}".</p>
                    )}

                    {/* Resultados de Tarefas */}
                    {tarefasEncontradas.length > 0 && (
                        <section className="results-section">
                            <h4>Tarefas Encontradas:</h4>
                            <ul>
                                {tarefasEncontradas.map(t => (
                                    // Reutilizamos o TarefaItem, mas desabilitamos as funções de clique
                                    <TarefaItem 
                                        key={t.id} 
                                        tarefa={t} 
                                        onToggle={() => {}}
                                        onEditar={() => {}}
                                        onRemover={() => {}}
                                    />
                                ))}
                            </ul>
                        </section>
                    )}
                    
                    {/* Resultados de Metas */}
                    {metasEncontradas.length > 0 && (
                        <section className="results-section">
                            <h4>Metas Encontradas:</h4>
                            <ul>
                                {metasEncontradas.map(m => (
                                    <li key={m.id} className="goal-result-item">
                                      {m.titulo}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Resultados de Projetos */}
                    {projetosEncontrados.length > 0 && (
                        <section className="results-section">
                            <h4>Projetos Encontrados:</h4>
                            <ul>
                                {projetosEncontrados.map(p => (
                                    <li key={p.id} className="project-result-item">
                                      {p.nome}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}
export default TelaBuscar;