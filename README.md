# Site do Estúdio de Beleza

Site de uma página, pronto para publicar no **GitHub Pages**. Sem dependências, sem build:
é só HTML, CSS e JavaScript.

## O que já vem pronto

- Capa com chamada e números do estúdio
- Seção "sobre"
- Grade de **procedimentos** com foto, duração, valor e botão de agendar
- **Galeria do estúdio** com ampliação da foto ao clicar
- **Depoimentos** (blocos para você colar as avaliações reais do Google)
- **Agendamento**: o formulário monta a mensagem e abre no WhatsApp
- Contato, horários, botão flutuante do WhatsApp
- Layout responsivo (celular, tablet e desktop)

## Como personalizar (3 passos)

### 1. Seus dados

Abra `assets/js/script.js` e edite só o bloco do topo:

```js
const CONFIGURACAO = {
  whatsapp: "5531900000000",      // país + DDD + número, só dígitos
  mensagemPadrao: "Olá! ...",
  instagram: "https://instagram.com/seu_perfil",
  googleAvaliacoes: "https://...", // link do seu perfil no Google
  googleMapa: "https://..."        // link do endereço no Google Maps
};
```

Depois abra `index.html` e troque: nome do estúdio (`Studio Aurora`), textos,
endereço, horários, e-mail, nomes dos procedimentos, durações e valores.

### 2. Suas fotos

Coloque os arquivos nas pastas abaixo, **com exatamente estes nomes**:

| Pasta | Arquivo | Onde aparece |
|---|---|---|
| `imagens/estudio/` | `fachada.jpg` | fundo da capa |
| `imagens/estudio/` | `ambiente-1.jpg` | seção "sobre" |
| `imagens/estudio/` | `ambiente-2.jpg`, `recepcao.jpg`, `maca.jpg`, `bancada.jpg`, `detalhe.jpg`, `equipe.jpg` | galeria |
| `imagens/procedimentos/` | `cilios.jpg`, `sobrancelhas.jpg`, `unhas.jpg`, `limpeza-de-pele.jpg`, `cabelo.jpg`, `maquiagem.jpg` | cards de procedimentos |

Enquanto a foto não existir, o site mostra um aviso no lugar dela com o caminho
esperado — nada quebra. Para usar outro nome, basta mudar o `data-foto` no `index.html`.

Dica: fotos com cerca de 1200 px de largura e menos de 400 KB deixam o site rápido.

### 3. Depoimentos

Na seção `<!-- DEPOIMENTOS -->` do `index.html` existem três blocos de exemplo,
marcados com a classe `exemplo` (aparecem com borda tracejada).

**Substitua cada um pelo texto de uma avaliação real do seu Google**, copiando o
comentário e o primeiro nome da cliente. Depois **remova a palavra `exemplo`** da
classe para tirar a borda tracejada:

```html
<figure class="depoimento">
```

Não publique depoimentos inventados — além de ser propaganda enganosa, o Google
não permite. Se ainda não tiver avaliações, apague a seção inteira e o link
"Depoimentos" do menu.

## Publicar no GitHub Pages

1. Suba estes arquivos para um repositório público.
2. No repositório: **Settings → Pages**.
3. Em *Source*, escolha **Deploy from a branch** → branch `main` → pasta `/ (root)` → **Save**.
4. Em um ou dois minutos o site fica no ar em
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Para usar um domínio próprio (ex.: `www.seuestudio.com.br`), adicione o domínio em
*Settings → Pages → Custom domain* e aponte o DNS conforme as instruções mostradas lá.

## Estrutura

```
index.html
assets/css/style.css
assets/js/script.js
imagens/estudio/
imagens/procedimentos/
```

As cores e fontes ficam nas variáveis do topo do `style.css` (`--rose`, `--areia`, ...).
