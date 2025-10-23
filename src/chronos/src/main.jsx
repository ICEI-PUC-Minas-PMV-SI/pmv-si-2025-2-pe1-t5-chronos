import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Importa o arquivo CSS mestre (ou os arquivos individuais se preferir)
import './styles/App.css';

// Ponto de entrada que conecta o React ao <div id="root"> no index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
);