// Arquivo: src/components/MenuPrincipal.jsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 

function MenuPrincipal() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation(); 

    const menuItems = [
        { path: '/inicio', label: 'Início' },
        { path: '/buscar', label: 'Buscar' },
        { path: '/calendario', label: 'Calendário' },
        { path: '/rotina', label: 'Rotina (Hoje)' },
        { path: '/metas', label: 'Metas' },
        { path: '/conquistas', label: 'Conquistas' },
        { path: '/projetos', label: 'Projetos' },
    ];
    
    const handleSair = () => {
        window.location.href = '/'; 
    };

    return (
        <nav className={`sidebar ${isMenuOpen ? 'menu-open' : ''}`}>
            
            <ul className="menu">
                {menuItems.map((item) => (
                    <li key={item.path} onClick={() => setIsMenuOpen(false)}> 
                        <Link 
                            to={item.path}
                            className={location.pathname.startsWith(item.path) ? 'active' : ''} 
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="sidebar-footer">
                <a onClick={handleSair} style={{ cursor: 'pointer' }}>Sair</a> 
            </div>
        </nav>
    );
}

export default MenuPrincipal;