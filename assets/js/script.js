/* =========================================================
   Studio Aurora — configuração e comportamento
   ---------------------------------------------------------
   EDITE APENAS O BLOCO "CONFIGURACAO" ABAIXO.
   ========================================================= */
const CONFIGURACAO = {
  // Telefone do WhatsApp: código do país + DDD + número, só dígitos.
  whatsapp: "5531900000000",

  // Mensagem inicial do botão verde flutuante.
  mensagemPadrao: "Olá! Vim pelo site e gostaria de agendar um horário.",

  // Links externos (deixe vazio para esconder).
  instagram: "https://instagram.com/seu_perfil",

  // Cole aqui o link do seu perfil no Google (Google Maps / Google Meu Negócio).
  googleAvaliacoes: "https://www.google.com/maps",
  googleMapa: "https://www.google.com/maps"
};

/* --------- montagem de links do WhatsApp --------- */
function linkWhatsApp(mensagem) {
  return "https://wa.me/" + CONFIGURACAO.whatsapp + "?text=" + encodeURIComponent(mensagem);
}

/* --------- fotos com aviso quando o arquivo não existe --------- */
function prepararFotos() {
  document.querySelectorAll(".foto[data-foto]").forEach(function (caixa) {
    const caminho = caixa.dataset.foto;
    const imagem = new Image();
    imagem.alt = caixa.dataset.legenda || "";

    imagem.onload = function () {
      caixa.innerHTML = "";
      caixa.appendChild(imagem);
      caixa.classList.add("com-foto");
    };
    imagem.onerror = function () {
      caixa.innerHTML =
        '<div class="aviso"><span class="icone">&#10057;</span>' +
        "<span>Adicione a foto em</span>" +
        "<code>" + caminho + "</code></div>";
    };
    imagem.src = caminho;
  });

  // Fundo do hero: usa a foto se ela existir.
  const fundo = document.querySelector(".hero-fundo[data-foto]");
  if (fundo) {
    const teste = new Image();
    teste.onload = function () {
      fundo.style.backgroundImage = "url('" + fundo.dataset.foto + "')";
      fundo.classList.add("com-foto");
    };
    teste.src = fundo.dataset.foto;
  }
}

/* --------- menu mobile --------- */
function prepararMenu() {
  const botao = document.getElementById("menu-botao");
  const navegacao = document.getElementById("navegacao");
  if (!botao || !navegacao) return;

  botao.addEventListener("click", function () {
    const aberto = navegacao.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", String(aberto));
  });
  navegacao.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navegacao.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
    });
  });
}

/* --------- sombra do cabeçalho ao rolar --------- */
function prepararCabecalho() {
  const cabecalho = document.getElementById("cabecalho");
  if (!cabecalho) return;
  const atualizar = function () {
    cabecalho.classList.toggle("rolado", window.scrollY > 20);
  };
  atualizar();
  window.addEventListener("scroll", atualizar, { passive: true });
}

/* --------- botões "Agendar" dos cards --------- */
function prepararBotoesAgendar() {
  const campoProcedimento = document.getElementById("campo-procedimento");
  document.querySelectorAll(".agendar").forEach(function (botao) {
    botao.addEventListener("click", function () {
      if (campoProcedimento) campoProcedimento.value = botao.dataset.procedimento || "";
      document.getElementById("agendamento").scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* --------- formulário -> WhatsApp --------- */
function prepararFormulario() {
  const formulario = document.getElementById("formulario-agendamento");
  if (!formulario) return;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const dados = new FormData(formulario);
    const nome = (dados.get("nome") || "").trim();
    const procedimento = dados.get("procedimento") || "";

    let invalido = false;
    [["nome", nome], ["procedimento", procedimento]].forEach(function (par) {
      const campo = formulario.elements[par[0]];
      const vazio = !par[1];
      campo.classList.toggle("campo-invalido", vazio);
      if (vazio && !invalido) { campo.focus(); invalido = true; }
    });
    if (invalido) return;

    const dataEscolhida = dados.get("data");
    const dataFormatada = dataEscolhida
      ? dataEscolhida.split("-").reverse().join("/")
      : "a combinar";

    const partes = [
      "Olá! Gostaria de agendar um horário.",
      "",
      "Nome: " + nome,
      "Procedimento: " + procedimento,
      "Data preferida: " + dataFormatada,
      "Período: " + (dados.get("periodo") || "-")
    ];
    const observacoes = (dados.get("observacoes") || "").trim();
    if (observacoes) partes.push("Observações: " + observacoes);

    window.open(linkWhatsApp(partes.join("\n")), "_blank", "noopener");
  });
}

/* --------- lightbox da galeria --------- */
function prepararLightbox() {
  const lightbox = document.getElementById("lightbox");
  const imagemGrande = document.getElementById("lightbox-imagem");
  const fechar = document.getElementById("lightbox-fechar");
  if (!lightbox) return;

  const fecharLightbox = function () { lightbox.classList.remove("aberto"); };

  document.querySelectorAll(".galeria-item").forEach(function (item) {
    item.addEventListener("click", function () {
      const imagem = item.querySelector("img");
      if (!imagem) return; // ainda sem foto
      imagemGrande.src = imagem.src;
      imagemGrande.alt = imagem.alt;
      lightbox.classList.add("aberto");
    });
  });

  fechar.addEventListener("click", fecharLightbox);
  lightbox.addEventListener("click", function (evento) {
    if (evento.target === lightbox) fecharLightbox();
  });
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") fecharLightbox();
  });
}

/* --------- links dinâmicos --------- */
function prepararLinks() {
  const flutuante = document.getElementById("whatsapp-flutuante");
  const contatoWhats = document.getElementById("link-whatsapp");
  if (flutuante) flutuante.href = linkWhatsApp(CONFIGURACAO.mensagemPadrao);
  if (contatoWhats) contatoWhats.href = linkWhatsApp(CONFIGURACAO.mensagemPadrao);

  const instagram = document.getElementById("link-instagram");
  if (instagram) instagram.href = CONFIGURACAO.instagram;

  const google = document.getElementById("link-google");
  if (google) google.href = CONFIGURACAO.googleAvaliacoes;

  const mapa = document.getElementById("link-mapa");
  if (mapa) mapa.href = CONFIGURACAO.googleMapa;

  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", function () {
  prepararFotos();
  prepararMenu();
  prepararCabecalho();
  prepararBotoesAgendar();
  prepararFormulario();
  prepararLightbox();
  prepararLinks();
});
