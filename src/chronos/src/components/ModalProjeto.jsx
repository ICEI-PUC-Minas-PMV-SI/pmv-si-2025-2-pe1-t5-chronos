// Arquivo: src/components/ModalProjeto.jsx

import React, { useState, useEffect } from 'react';

// Recebe as mesmas props do ModalTarefa
function ModalProjeto({ isOpen, onClose, onSalvar, projetoParaEditar }) {
    
    // Estado local simples: apenas o nome do projeto
    const [nome, setNome] = useState('');

    // Efeito para preencher o formulário (Modo Edição)
    useEffect(() => {
        if (isOpen) {
            if (projetoParaEditar) {
                // Modo Edição: Preenche o nome
                setNome(projetoParaEditar.nome);
            } else {
                // Modo Criação: Limpa o nome
                setNome('');
            }
        }
    }, [projetoParaEditar, isOpen]); // Roda quando o modal abre

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome.trim()) {
            alert('O nome do projeto é obrigatório.');
            return;
        }

        const dadosProjeto = {
            nome: nome.trim(),
        };

        if (projetoParaEditar) {
            onSalvar({ ...projetoParaEditar, ...dadosProjeto });
        } else {
            onSalvar(dadosProjeto);
        }
        onClose(); // Fecha o modal
    };

    return (
        // Usando as classes CSS do modal que já existem em 'rotina.css'
        <div className="modal" style={{ display: 'block' }}> 
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                
                <h3>{projetoParaEditar ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</h3>
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Nome do Projeto (ex: Estudante, Trabalho...)" 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <button type="submit">Salvar Projeto</button>
                </form>
            </div>
        </div>
    );
}

export default ModalProjeto;