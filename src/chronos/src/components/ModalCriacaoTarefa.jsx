// Arquivo: src/components/ModalCriacaoTarefa.jsx

import React, { useState } from 'react';

// O componente recebe 'isOpen' (se está aberto), 'onClose' (para fechar), e a função de adição
function ModalCriacaoTarefa({ isOpen, onClose, onAdicionarTarefa }) {
    
    // 1. Estados locais para capturar os dados do formulário
    const [texto, setTexto] = useState('');
    const [periodo, setPeriodo] = useState('manhã'); // Padrão: Manhã
    const [isNota, setIsNota] = useState(false);     // Se é uma nota rápida

    if (!isOpen) return null; // Se não estiver aberto, não renderiza nada

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!texto.trim()) {
            alert('A descrição da tarefa é obrigatória.');
            return;
        }

        // 2. Criação do objeto da nova tarefa com o campo 'periodo'
        const novaTarefa = {
            id: Date.now(),
            texto: texto.trim(),
            concluida: false,
            dataCriacao: new Date().toLocaleDateString(),
            periodo: isNota ? 'notas' : periodo, // Se for nota, vai para o card 'notas'
            isNota: isNota
        };

        // 3. Envia a tarefa para o componente pai
        onAdicionarTarefa(novaTarefa); 

        // 4. Resetar o formulário e fechar o modal
        setTexto('');
        setPeriodo('manhã');
        setIsNota(false);
        onClose(); 
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h3>Adicionar Nova Atividade</h3>
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Descrição da atividade..." 
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        required
                    />

                    {/* Checkbox para Notas Rápidas */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                            type="checkbox" 
                            id="isNota" 
                            checked={isNota}
                            onChange={(e) => setIsNota(e.target.checked)}
                            style={{ width: 'auto', marginBottom: '0' }}
                        />
                        <label htmlFor="isNota" style={{ width: 'auto', marginBottom: '0' }}>
                            É uma Nota Rápida (Sem Período Fixo)
                        </label>
                    </div>

                    {/* Seleção de Período (Aparece se NÃO for Nota Rápida) */}
                    {!isNota && (
                        <select 
                            value={periodo} 
                            onChange={(e) => setPeriodo(e.target.value)}
                            required
                        >
                            <option value="manhã">Manhã</option>
                            <option value="tarde">Tarde</option>
                            <option value="noite">Noite</option>
                        </select>
                    )}

                    <button type="submit">Salvar Atividade</button>
                </form>
            </div>
        </div>
    );
}

export default ModalCriacaoTarefa;