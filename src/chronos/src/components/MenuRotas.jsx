// Arquivo: src/components/MenuRotas.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function MenuRotas() {
    
    // Lista de todas as rotas do seu sistema Chronos
    const rotasChronos = [
        { path: '/inicio', label: '1. Dashboard (Início)' },
        { path: '/rotina', label: '2. Rotina / Gestão de Tarefas' },
        { path: '/metas', label: '3. Metas e Planejamento' },
        { path: '/conquistas', label: '4. Conquistas (Gamificação)' },
        { path: '/projetos', label: '5. Projetos e Categorias' },
        { path: '/analise', label: '6. Análise e Relatórios' },
        { path: '/lembretes', label: '7. Lembretes e Notificações' },
        { path: '/configuracoes', label: '8. Configurações' },
    ];

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
            <h2>[Chronos - DEV] Menu de Acesso Rápido</h2>
            <p style={{ marginBottom: '20px', color: '#555' }}>
                Clique em uma rota para testar o carregamento da tela.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {rotasChronos.map(rota => (
                    <li key={rota.path} style={{ marginBottom: '10px' }}>
                        <Link 
                            to={rota.path} 
                            style={{ textDecoration: 'none', color: '#6a5af9', fontSize: '1.1rem' }}
                        >
                            {rota.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <hr style={{ margin: '20px 0' }} />
            <p style={{ fontSize: '0.8rem', color: '#777' }}>
                *Este menu é temporário. O fluxo final deve começar em <Link to="/inicio">/inicio</Link>
            </p>
        </div>
    );
}

export default MenuRotas;