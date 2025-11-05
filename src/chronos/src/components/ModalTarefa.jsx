// Arquivo: src/components/ModalTarefa.jsx

import React, { useState, useEffect } from 'react';

// Recebe props para funcionar
function ModalTarefa({ isOpen, onClose, onSalvar, tarefaParaEditar }) {
    
    // Estados locais para os campos do formulário
    const [texto, setTexto] = useState('');
    const [periodo, setPeriodo] = useState('manhã');
    const [isNota, setIsNota] = useState(false);
    // (O estado 'metaId' será adicionado no próximo passo)

    // Efeito que preenche o formulário (Modo Edição)
    useEffect(() => {
        if (isOpen) { // Só atualiza quando o modal abre
            if (tarefaParaEditar) {
                // Se estamos editando, preenche os campos com os dados da tarefa
                setTexto(tarefaParaEditar.texto);
                setPeriodo(tarefaParaEditar.periodo);
                setIsNota(tarefaParaEditar.isNota);
            } else {
                // Se estamos criando, limpa os campos
                setTexto('');
                setPeriodo('manhã');
                setIsNota(false);
            }
        }
    }, [tarefaParaEditar, isOpen]); // Roda sempre que a tarefa para editar ou o modal mudam

    if (!isOpen) return null; // Não renderiza nada se estiver fechado

    // Função chamada ao enviar o formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!texto.trim()) {
            alert('A descrição da tarefa é obrigatória.');
            return;
        }

        // 1. Monta o objeto da tarefa
        const dadosTarefa = {
            texto: texto.trim(),
            periodo: isNota ? 'notas' : periodo,
            isNota: isNota,
        };

        // 2. Chama a função onSalvar (do App.jsx)
        if (tarefaParaEditar) {
            // MODO EDIÇÃO: Envia o objeto antigo (com ID) + as novas alterações
            onSalvar({ ...tarefaParaEditar, ...dadosTarefa });
        } else {
            // MODO CRIAÇÃO: Envia apenas os novos dados
            onSalvar(dadosTarefa);
        }

        onClose(); // Fecha o modal
    };

    return (
        // Usando 'display: block' pois o React controla a renderização
        <div className="modal" style={{ display: 'block' }}> 
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                
                {/* Título dinâmico */}
                <h3>{tarefaParaEditar ? 'Editar Tarefa' : 'Adicionar Nova Atividade'}</h3>
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Descrição da atividade..." 
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        required
                    />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                            type="checkbox" 
                            id="isNotaModal" // ID único para o label
                            checked={isNota}
                            onChange={(e) => setIsNota(e.target.checked)}
                            style={{ width: 'auto', marginBottom: '0' }}
                        />
                        <label htmlFor="isNotaModal" style={{ width: 'auto', marginBottom: '0' }}>
                            É uma Nota Rápida (Sem Período Fixo)
                        </label>
                    </div>

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

                    {/* (Aqui entra o dropdown de Metas no próximo passo) */}

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
}

export default ModalTarefa;