# 🚀 Projeto Chronos (Aplicação React)

O **Chronos** é uma aplicação web de agenda inteligente desenvolvida para auxiliar usuários na organização de atividades, compromissos e metas.  
O projeto foi migrado de um protótipo estático (**HTML/CSS**) para uma aplicação **SPA** dinâmica construída com **React + Vite**.

---

## ⚙️ Tecnologias Utilizadas

### 📌 Node.js (v18+)
Ambiente que permite executar JavaScript fora do navegador. Obrigatório para rodar React e Vite.

### 📌 NPM (Node Package Manager)
Gerencia as bibliotecas do projeto.

### 📌 Vite  
Ferramenta de build e servidor de desenvolvimento (`npm run dev`).

### 📌 React.js (v18+)
Biblioteca principal para construção dos componentes da interface.

### 📌 React Hooks
- **useState** – gerencia o estado dos componentes (tarefas, modals, campos, etc.).
- **useEffect** – salva dados no LocalStorage e executa efeitos colaterais.

### 📌 React Router DOM
Controla a navegação entre as páginas **sem recarregar a aplicação**.

### 📌 Recharts
Usado para criar gráficos de progresso nas telas de **Rotina** e **Metas**.

---

## 📋 Pré-requisitos

Para rodar o Projeto Chronos você precisa ter:

✔️ **Node.js LTS instalado**  
✔️ **NPM** (instalado automaticamente com o Node)

⚠️ O projeto **não roda** abrindo o arquivo `index.html`.  
É obrigatório usar:

```bash
npm run dev
```

para que o Vite sirva a aplicação corretamente.

---
## 🔧 Como Executar o Projeto


### 1️⃣ Clonar o Repositório

```bash
git clone git@github.com:ICEI-PUC-Minas-PMV-SI/pmv-si-2025-2-pe1-t5-chronos.git
```

### 2️⃣ Entrar na Pasta
```bash
cd pmv-si-2025-2-pe1-t5-chronos
```

### 3️⃣ Instalar Dependências

⚠️ Caso o repositório já venha com node_modules, não é necessário executar este passo.

Se precisar instalar:
```bash
npm install
```

### 4️⃣ Executar o Projeto
```bash
npm run dev
```

Após isso, o Vite abrirá em:

👉 http://localhost:5173/

### ⚠️ Problema Comum no Windows

"A execução de scripts foi desabilitada neste sistema."

Isso ocorre porque o PowerShell possui uma política de segurança padrão Restrita (Restricted).

Para rodar npm run dev sem erros, execute este comando no terminal apenas para a sessão atual:

✅ Comando Correto para o README
```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

✔️ Não altera políticas permanentes.

✔️ Não precisa abrir PowerShell como administrador

✔️ Funciona somente para o terminal atual

Depois disso, execute novamente:
``` bash
npm run dev
```