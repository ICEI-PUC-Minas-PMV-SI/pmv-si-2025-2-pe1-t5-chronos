// Arquivo: src/pages/TelaCalendario.jsx

// 1. CORREÇÃO: A importação do React DEVE vir primeiro
import React from 'react';
import MenuPrincipal from '../components/MenuPrincipal'; 

// Importações do FullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

// 2. A tela agora recebe 'listaTarefas' do App.jsx
function TelaCalendario({ listaTarefas }) {
  
  // 3. TRANSFORMAÇÃO: Convertendo nossas Tarefas para o formato do Calendário
  const eventosDoCalendario = listaTarefas.map(tarefa => {
    
    // Define um horário padrão baseado no período
    let horaInicio = '09:00:00'; // Manhã
    if (tarefa.periodo === 'tarde') horaInicio = '14:00:00';
    if (tarefa.periodo === 'noite') horaInicio = '19:00:00';
    if (tarefa.isNota) horaInicio = '08:00:00'; // Notas
    
    return {
      id: tarefa.id,
      title: tarefa.texto, // O FullCalendar usa 'title'
      start: `${tarefa.data}T${horaInicio}`, // O FullCalendar usa 'start' (ex: 2025-11-17T09:00:00)
      // Adiciona uma classe CSS se estiver concluída
      className: tarefa.concluida ? 'evento-concluido' : '',
      // (Podemos adicionar cores por projeto no futuro)
    };
  });

  return (
    <div className="app-layout"> 
      <MenuPrincipal /> 
      
      <main className="main-content">
        {/* (Removi as classes de estilização extras por enquanto) */}
        <div> 
          <h1 style={{fontSize: '2rem', fontWeight: 600, marginBottom: '20px'}}>
            📅 Calendário de Atividades
          </h1>

          <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '12px'}}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek" // Visão inicial de Semana
              timeZone="America/Sao_Paulo"
              locale={ptBrLocale} // Tradução
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay', // Botões de visão
              }}
              slotMinTime="07:00:00"
              slotMaxTime="20:00:00"
              allDaySlot={false}
              
              // 4. USANDO OS DADOS DINÂMICOS
              events={eventosDoCalendario} 
              
              height="auto" // Ajusta a altura ao conteúdo
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