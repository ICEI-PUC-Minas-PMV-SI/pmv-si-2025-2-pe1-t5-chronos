import React from 'react';
import MenuPrincipal from '../components/MenuPrincipal';

function TelaBuscar() {
  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      <main className="page-content">
        <h1>[CHRONOS] - Buscar Tarefas e Metas</h1>
        <p>Campo de busca principal com filtros avançados para encontrar notas e atividades rapidamente.</p>
      </main>
    </div>
  );
}
export default TelaBuscar;