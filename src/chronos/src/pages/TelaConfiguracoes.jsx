import React from 'react';
import MenuPrincipal from '../components/MenuPrincipal';

function TelaConfiguracoes() {
  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      <main className="page-content">
        <h1>[CHRONOS] - Configurações</h1>
        <p>Personalização de Cores e Categorias, Configurações de Notificações, Dados de Perfil.</p>
      </main>
    </div>
  );
}
export default TelaConfiguracoes;