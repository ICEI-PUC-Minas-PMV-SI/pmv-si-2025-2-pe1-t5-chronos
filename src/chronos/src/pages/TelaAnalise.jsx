import React from 'react';
import MenuPrincipal from '../components/MenuPrincipal';

function TelaAnalise() {
  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      <main className="page-content">
        <h1>[CHRONOS] - Análise e Relatórios de Produtividade</h1>
        <p>Gráficos e indicadores sobre o desempenho do usuário (Ex: Taxa de conclusão, tempo gasto por categoria).</p>
      </main>
    </div>
  );
}
export default TelaAnalise;