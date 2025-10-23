import React from 'react';
import MenuPrincipal from '../components/MenuPrincipal';

function TelaLembretes() {
  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      <main className="page-content">
        <h1>[CHRONOS] - Lembretes e Notificações</h1>
        <p>Lista centralizada de todos os lembretes automáticos e manuais gerados pelo sistema.</p>
      </main>
    </div>
  );
}
export default TelaLembretes;