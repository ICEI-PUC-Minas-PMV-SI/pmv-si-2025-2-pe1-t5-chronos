<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chronos - Início</title>

    <!-- TailwindCSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>

  <body class="bg-gray-100 min-h-screen flex">
    <!-- ========== MENU LATERAL ========== -->
    <aside class="w-60 bg-white shadow-md p-5 flex flex-col">
      <h1 class="text-2xl font-bold mb-8">Menu Principal</h1>

      <nav class="flex flex-col space-y-4 text-gray-700">
        <a
          href="#"
          class="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 font-semibold text-indigo-600"
        >
          <span>🏠</span><span>Início</span>
        </a>
        <a href="#" class="flex items-center space-x-2 hover:text-indigo-600">
          <span>🔍</span><span>Buscar</span>
        </a>
        <a href="#" class="flex items-center space-x-2 hover:text-indigo-600">
          <span>📅</span><span>Calendário</span>
        </a>
        <a href="#" class="flex items-center space-x-2 hover:text-indigo-600">
          <span>🗓️</span><span>Rotina</span>
        </a>
        <a href="#" class="flex items-center space-x-2 hover:text-indigo-600">
          <span>🎯</span><span>Metas</span>
        </a>
        <a href="#" class="flex items-center space-x-2 hover:text-indigo-600">
          <span>🔔</span><span>Lembretes</span>
        </a>
        <a href="#" class="flex items-center space-x-2 hover:text-indigo-600">
          <span>🏆</span><span>Conquistas</span>
        </a>
        <a href="#" class="flex items-center space-x-2 hover:text-indigo-600">
          <span>📁</span><span>Projetos</span>
        </a>
      </nav>
    </aside>

    <!-- ========== CONTEÚDO PRINCIPAL ========== -->
    <main class="flex-1 p-8">
      <!-- Logo -->
      <div class="flex justify-center items-center mb-10">
        <img
          src="https://img.icons8.com/ios-filled/100/000000/spiral-bound-booklet.png"
          alt="logo"
          class="w-10 h-10 mr-3"
        />
        <h1 class="text-4xl font-bold text-indigo-700">CHRONOS</h1>
      </div>

      <!-- Criar nota e atividade -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Criar nota -->
        <div class="bg-white rounded-2xl p-4 shadow">
          <h2 class="font-semibold mb-2">📝 Criar nota</h2>
          <textarea
            class="w-full border rounded-md p-2 text-sm"
            placeholder="Escreva uma nota rápida..."
          ></textarea>
          <button
            class="mt-2 bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700"
          >
            Adicionar
          </button>
        </div>

        <!-- Criar atividade -->
        <div class="bg-white rounded-2xl p-4 shadow">
          <h2 class="font-semibold mb-2">📋 Criar atividade</h2>
          <input
            type="text"
            placeholder="Título da atividade"
            class="w-full border rounded-md p-2 text-sm mb-2"
          />
          <input
            type="date"
            class="w-full border rounded-md p-2 text-sm mb-2"
          />
          <button
            class="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700"
          >
            Adicionar
          </button>
        </div>
      </div>

      <!-- Cards de resumo -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-5 shadow">
          <h3 class="font-semibold">📅 Atividades</h3>
          <p class="text-gray-600 text-sm mt-1">0 em atraso</p>
          <div class="w-full bg-gray-200 h-2 rounded mt-2">
            <div class="bg-indigo-600 h-2 w-[0%] rounded"></div>
          </div>
          <p class="text-gray-500 text-xs mt-1">0% concluídas</p>
        </div>

        <div class="bg-white rounded-2xl p-5 shadow">
          <h3 class="font-semibold">🗒️ Notas</h3>
          <p class="text-gray-600 text-sm mt-1">0</p>
          <p class="text-gray-500 text-xs">Anotações rápidas para não esquecer</p>
        </div>

        <div class="bg-white rounded-2xl p-5 shadow">
          <h3 class="font-semibold">🎯 Metas</h3>
          <p class="text-gray-600 text-sm mt-1">3</p>
          <p class="text-gray-500 text-xs">Acompanhe seu progresso</p>
        </div>
      </div>

      <!-- Gráfico e resumo rápido -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl p-5 shadow">
          <h3 class="font-semibold mb-4">📊 Produtividade na semana</h3>
          <canvas id="graficoProdutividade"></canvas>
        </div>

        <div class="bg-white rounded-2xl p-5 shadow">
          <h3 class="font-semibold mb-4">📈 Resumo rápido</h3>
          <p class="text-gray-600 text-sm">
            Acompanhe aqui suas métricas e desempenho semanal.
          </p>
        </div>
      </div>
    </main>

    <!-- ========== SCRIPT DO GRÁFICO ========== -->
    <script>
      const ctx = document.getElementById("graficoProdutividade");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
          datasets: [
            {
              label: "Tarefas concluídas",
              data: [6, 8, 7, 9, 5, 3, 4],
              borderWidth: 2,
              borderColor: "#4f46e5",
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 3 } },
          },
        },
      });
    </script>
  </body>
</html>

