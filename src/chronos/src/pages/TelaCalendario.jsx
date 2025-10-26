import MenuPrincipal from '../components/MenuPrincipal'; 
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';



function TelaCalendario() {
    const [events] = useState([
    { title: 'Café em equpe', start: '2025-10-20T08:00:00', color: '#a5b4fc' }, // lilás suave
    { title: 'Reunião comercial', start: '2025-10-20T09:00:00', color: '#93c5fd' }, // azul claro
    { title: 'Reunião TI', start: '2025-10-20T10:00:00', color: '#fcd34d' }, // amarelo
    { title: 'Alinhamento Marketing', start: '2025-10-20T14:00:00', color: '#fca5a5' }, // vermelho claro
    { title: 'Aplicação B2B', start: '2025-10-21T13:00:00', color: '#6ee7b7' }, // verde água
    { title: '1:1 Paulo', start: '2025-10-22T09:00:00', color: '#bae6fd' }, // azul bebê
    { title: 'Almoço', start: '2025-10-22T13:00:00', color: '#c4b5fd' }, // lilás
  ]);
  // NOTE: A lógica avançada (useState, useEffect, adicionarTarefa, toggleConcluida)
  // será reintroduzida AQUI, mas adaptada para a estrutura de cards.
  // Por agora, usamos apenas o mockup estático para testar o CSS.

  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      
      <main className="main-content">
        <div className="p-8 bg-gray-50 min-h-screen">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">📅 Calendário de Atividades</h1>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              timeZone="America/Sao_Paulo"
              locale={ptBrLocale}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              slotMinTime="07:00:00"
              slotMaxTime="20:00:00"
              allDaySlot={false}
              events={events}
              height="auto"
              eventDisplay="block"
              nowIndicator={true}
              selectable={true}
              eventTextColor="#1f2937"
            />
          </div>
        </div>          

          
      </main>
    </div>
  );
}
export default TelaCalendario;