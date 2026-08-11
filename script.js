/* =========================================================
   CURRÍCULO INTERATIVO — script.js
   Funcionalidades:
   1. Botão que exibe uma saudação com alert()
   2. Botão que mostra/esconde a seção "Sobre" (addEventListener)
   3. Campo de nome que atualiza a saudação no topo (innerText)
   4. Formulário de contato: coleta nome/e-mail e exibe mensagem
   5. Contador de visitas usando localStorage
   6. Desenho de um gráfico simples em <canvas>
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  // Preenche o ano atual no rodapé
  const anoAtual = document.getElementById("anoAtual");
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  /* ---------- 1. Botão "Diga olá" -> alert() ---------- */
  const btnSaudacao = document.getElementById("btnSaudacao");
  if (btnSaudacao) {
    btnSaudacao.addEventListener("click", function () {
      alert("Olá! Obrigado por visitar meu currículo. 👋");
    });
  }

  /* ---------- 2. Mostrar/esconder a seção "Sobre" ---------- */
  const btnToggleSobre = document.getElementById("btnToggleSobre");
  const secaoSobre = document.getElementById("sobre");

  if (btnToggleSobre && secaoSobre) {
    btnToggleSobre.addEventListener("click", function () {
      const estaEscondida = secaoSobre.hidden;

      secaoSobre.hidden = !estaEscondida;

      // Atualiza texto do botão e atributo de acessibilidade
      btnToggleSobre.textContent = estaEscondida
        ? 'Esconder seção "Sobre"'
        : 'Mostrar seção "Sobre"';
      btnToggleSobre.setAttribute("aria-expanded", String(estaEscondida));
    });
  }

  /* ---------- 3. Saudação dinâmica a partir do campo de nome ---------- */
  const campoNome = document.getElementById("nomeVisitante");
  const saudacaoTopo = document.getElementById("saudacao");

  function atualizarSaudacao(nome) {
    if (!saudacaoTopo) return;

    if (nome && nome.trim() !== "") {
      saudacaoTopo.innerText = "Bem-vindo(a), " + nome.trim() + "!";
    } else {
      saudacaoTopo.innerText = "";
    }
  }

  if (campoNome) {
    campoNome.addEventListener("input", function (evento) {
      atualizarSaudacao(evento.target.value);
    });
  }

  /* ---------- 4. Envio do formulário de contato ---------- */
  const formContato = document.getElementById("formContato");
  const mensagemForm = document.getElementById("mensagemForm");

  if (formContato) {
    formContato.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const nome = campoNome ? campoNome.value.trim() : "";
      const email = document.getElementById("emailVisitante").value.trim();

      if (nome === "" || email === "") {
        mensagemForm.innerText = "Preencha nome e e-mail para continuar.";
        return;
      }

      atualizarSaudacao(nome);
      mensagemForm.innerText =
        "Valeu, " + nome + "! Recebi seu contato (" + email + ").";

      formContato.reset();
    });
  }

  /* ---------- 5. Contador de visitas com localStorage ---------- */
  const elementoContador = document.getElementById("contadorVisitas");

  if (elementoContador) {
    const chave = "curriculo_contador_visitas";
    let visitas = parseInt(localStorage.getItem(chave), 10);

    if (isNaN(visitas)) {
      visitas = 0;
    }

    visitas += 1;
    localStorage.setItem(chave, visitas);
    elementoContador.textContent = visitas;
  }

  /* ---------- 6. Gráfico de habilidades em <canvas> ---------- */
  desenharGraficoHabilidades();
});

function desenharGraficoHabilidades() {
  const canvas = document.getElementById("graficoHabilidades");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const largura = canvas.width;
  const altura = canvas.height;

  const habilidades = [
    { nome: "Inglês", nivel: 0.85, cor: "#f2b84b" },
    { nome: "Manut.", nivel: 0.8, cor: "#4fd1c5" },
    { nome: "Prog.", nivel: 0.6, cor: "#e9edf3" },
    { nome: "Senior", nivel: 0.65, cor: "#f2b84b" },
    { nome: "Inglês", nivel: 0.95, cor: "#4fd1c5" },
  ];

  const margemBase = 30; // espaço para os rótulos embaixo
  const margemTopo = 15;
  const alturaUtil = altura - margemBase - margemTopo;
  const larguraBarra = largura / (habilidades.length * 2);

  ctx.clearRect(0, 0, largura, altura);
  ctx.font = "11px monospace";
  ctx.textAlign = "center";

  habilidades.forEach(function (item, indice) {
    const x = larguraBarra + indice * larguraBarra * 2;
    const alturaBarra = item.nivel * alturaUtil;
    const y = altura - margemBase - alturaBarra;

    // Barra
    ctx.fillStyle = item.cor;
    ctx.fillRect(x, y, larguraBarra * 1.1, alturaBarra);

    // Rótulo do nome
    ctx.fillStyle = "#aab2c0";
    ctx.fillText(item.nome, x + larguraBarra * 0.55, altura - 10);

    // Percentual acima da barra
    ctx.fillStyle = "#e9edf3";
    ctx.fillText(
      Math.round(item.nivel * 100) + "%",
      x + larguraBarra * 0.55,
      y - 6
    );
  });

  // Linha de base
  ctx.strokeStyle = "#323b4a";
  ctx.beginPath();
  ctx.moveTo(0, altura - margemBase);
  ctx.lineTo(largura, altura - margemBase);
  ctx.stroke();
}
