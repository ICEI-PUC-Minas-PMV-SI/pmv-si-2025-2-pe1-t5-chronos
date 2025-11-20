// src/utils/dateUtils.js

// Retorna a data de hoje no formato ISO: "YYYY-MM-DD"
export const getHojeLocal = () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
};
