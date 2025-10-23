// Arquivo: src/components/MenuPrincipal.jsx (AJUSTADO PARA ITEM ATIVO)

import React, { useState } from 'react';
// 1. Importar useLocation
import { Link, useLocation } from 'react-router-dom'; 

function MenuPrincipal() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // 2. Hook para obter a rota atual
    const location = useLocation(); 

    const menuItems = [
        { path: '/inicio', label: 'Início' },
        { path: '/buscar', label: 'Buscar' },
        { path: '/calendario', label: 'Calendário' },
        { path: '/rotina', label: 'Rotina' },
        { path: '/metas', label: 'Metas' },
        { path: '/lembretes', label: 'Lembretes' },
        { path: '/conquistas', label: 'Conquistas' },
        { path: '/projetos', label: 'Projetos' },
    ];

    // ... (restante do componente) ...

    return (
        <nav className={`sidebar ${isMenuOpen ? 'menu-open' : ''}`}> 
            
            
            <ul className="menu">
                {menuItems.map((item) => (
                    <li key={item.path} onClick={() => setIsMenuOpen(false)}> 
                        <Link 
                            to={item.path}
                            // 3. Lógica para aplicar a classe 'active'
                            className={location.pathname.startsWith(item.path) ? 'active' : ''} 
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            
        </nav>
    );
}

export default MenuPrincipal;