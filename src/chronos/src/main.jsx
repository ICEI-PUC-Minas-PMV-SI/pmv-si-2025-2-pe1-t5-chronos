import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Importando os estilos globais (do SEU app)
import './styles/style.css'
import './styles/dashboard.css'
import './styles/rotina.css'
import './styles/metas.css'
import './styles/projetos.css'

// 1. As importações do FullCalendar ('@fullcalendar/core/main.css', etc.)
//    foram REMOVIDAS daqui.
//
// 2. Por quê? Porque os plugins que você importa DENTRO do 
//    'TelaCalendario.jsx' (como dayGridPlugin) já cuidam disso.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)