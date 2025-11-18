// Arquivo: src/components/ModalTarefa.jsx

import React, { useState, useEffect } from 'react';
import { getHojeLocal } from '../utils/dateUtils';

// 1. Recebendo 'listaProjetos'
function ModalTarefa({ 
  isOpen, 
  onClose, 
  onSalvar, 
  tarefaParaEditar, 
  listaMetas, 
  listaProjetos // NOVO
}) {
    
    // Estados locais
    const [texto, setTexto] = useState('');
    const [periodo, setPeriodo] = useState('manhã');
    const [isNota, setIsNota] = useState(false);
    const [data, setData] = useState(getHojeLocal());
    const [metaId, setMetaId] = useState('');
    
    // 2. NOVO: Estado para o dropdown de Projetos
    const [projetoId, setProjetoId] = useState('proj-4'); // Default: 'Rotina'

    // Efeito que preenche o formulário
    useEffect(() => {
        if (isOpen) {
            if (tarefaParaEditar) {
                // Modo Edição
                setTexto(tarefaParaEditar.texto);
                setPeriodo(tarefaParaEditar.periodo);
                setIsNota(tarefaParaEditar.isNota);
                setData(tarefaParaEditar.data || getHojeLocal());
                setMetaId(tarefaParaEditar.metaId || '');
                setProjetoId(tarefaParaEditar.projetoId || 'proj-4'); // 3. NOVO
            } else {
                // Modo Criação
                setTexto('');
                setPeriodo('manhã');
                setIsNota(false);
                setData(getHojeLocal());
                setMetaId('');
                setProjetoId('proj-4'); // 4. NOVO (Default 'Rotina')
            }
        }
    }, [tarefaParaEditar, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!texto.trim()) { alert('A descrição é obrigatória.'); return; }

        const dadosTarefa = {
            texto: texto.trim(),
            periodo: isNota ? 'notas' : periodo,
            isNota: isNota,
            data: data,
            metaId: metaId ? parseInt(metaId) : null,
            projetoId: projetoId // 5. NOVO: Adiciona o ID do projeto
        };

        if (tarefaParaEditar) {
            onSalvar({ ...tarefaParaEditar, ...dadosTarefa });
        } else {
            onSalvar(dadosTarefa);
        }
        onClose();
    };

    return (
        <div className="modal" style={{ display: 'block' }}> 
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h3>{tarefaParaEditar ? 'Editar Tarefa' : 'Adicionar Nova Atividade'}</h3>
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Descrição da atividade..." 
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        required
                    />
                    <input 
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />

                    {/* Checkbox de Nota Rápida */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                            type="checkbox" 
                            id="isNotaModal"
                            checked={isNota}
                            onChange={(e) => setIsNota(e.target.checked)}
                            style={{ width: 'auto', marginBottom: '0' }}
                        />
                        <label htmlFor="isNotaModal" style={{ width: 'auto', marginBottom: '0' }}>
                            É uma Nota Rápida (Sem Período Fixo)
                        </label>
                    </div>

                    {/* Seleção de Período (só aparece se NÃO for nota) */}
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

                    {/* 6. NOVO: Dropdown de Projetos (só aparece se NÃO for nota) */}
                    {!isNota && listaProjetos && (
                        <select
                            value={projetoId} // Controlado pelo estado 'projetoId'
                            onChange={(e) => setProjetoId(e.target.value)}
                            required // Uma tarefa sempre deve ter um projeto
                        >
                            <option value="" disabled>— Selecione um Projeto —</option>
                            {listaProjetos.map(proj => (
                                <option key={proj.id} value={proj.id}>
                                    {proj.nome}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Dropdown de Metas (só aparece se NÃO for nota) */}
                    {!isNota && listaMetas && (
                        <select
                            value={metaId}
                            onChange={(e) => setMetaId(e.target.value)}
                        >
                            <option value="">— Vincular a nenhuma meta (Opcional) —</option>
                            {listaMetas.map(meta => (
                                <option key={meta.id} value={meta.id}>
                                    {meta.titulo}
                                </option>
                            ))}
                        </select>
                    )}

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
}

export default ModalTarefa;