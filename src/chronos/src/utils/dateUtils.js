export const getHojeLocal = () => {
    const hoje = new Date(); // Pega a data/hora local
    const ano = hoje.getFullYear();
    // getMonth() começa em 0 (Jan), então +1. padStart garante 2 dígitos (ex: 09)
    const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
    const dia = hoje.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`; // Formato YYYY-MM-DD
};