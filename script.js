document.addEventListener("DOMContentLoaded", function () {
  // Preenche o ano atual no rodapé
  const anoAtual = document.getElementById("anoAtual");
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }
 
  const btnSaudacao = document.getElementById("btnSaudacao");
  if (btnSaudacao) {
    btnSaudacao.addEventListener("click", function () {
      alert("Olá! Obrigado por visitar meu currículo. 👋");
    });
  }
 
  const btnToggleSobre = document.getElementById("btnToggleSobre");
  const secaoSobre = document.getElementById("sobre");
 
  if (btnToggleSobre && secaoSobre) {
    btnToggleSobre.addEventListener("click", function () {
      const estaEscondida = secaoSobre.hidden;
 
      secaoSobre.hidden = !estaEscondida;
 
      btnToggleSobre.textContent = estaEscondida
        ? 'Esconder seção "Sobre"'
        : 'Mostrar seção "Sobre"';
      btnToggleSobre.setAttribute("aria-expanded", String(estaEscondida));
    });
  }
 
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
 
  desenharGraficoHabilidades();
});
 
function desenharGraficoHabilidades() {
  const canvas = document.getElementById("graficoHabilidades");
  if (!canvas || !canvas.getContext) return;
 
  const ctx = canvas.getContext("2d");
  const largura = canvas.width;
  const altura = canvas.height;
 
  const habilidades = [
    { nome: "Senior", nivel: 0.85, cor: "#b794f6" },
    { nome: "Manut.", nivel: 0.8, cor: "#8b5cf6" },
    { nome: "Redes", nivel: 0.6, cor: "#f0ece4" },
    { nome: "Prog.", nivel: 0.65, cor: "#b794f6" },
    { nome: "Inglês", nivel: 0.95, cor: "#8b5cf6" },
  ];
 
  const margemBase = 30; 
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
 
    ctx.fillStyle = item.cor;
    ctx.fillRect(x, y, larguraBarra * 1.1, alturaBarra);
 
    ctx.fillStyle = "#b6afa4";
    ctx.fillText(item.nome, x + larguraBarra * 0.55, altura - 10);
 
    ctx.fillStyle = "#f0ece4";
    ctx.fillText(
      Math.round(item.nivel * 100) + "%",
      x + larguraBarra * 0.55,
      y - 6
    );
  });
 
  ctx.strokeStyle = "#3a3a3a";
  ctx.beginPath();
  ctx.moveTo(0, altura - margemBase);
  ctx.lineTo(largura, altura - margemBase);
  ctx.stroke();
}