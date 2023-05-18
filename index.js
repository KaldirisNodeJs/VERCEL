const API_Filmes   = require("./filmes.cjs")
const COD_HTML     = require("./codhtml.cjs")
const express      = require('express')
const asyncHandler = require("express-async-handler");
const fs           = require("fs");

const app = express()
const PORT = 4000

//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/assets/icones'));

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  
  const xurloriginal = req.protocol + '://' + req.get('host') + req.originalUrl;
  
  let xurl = xurloriginal + 'filmes';

  var htmlroot = `
  <!doctype html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--======== CSS ======== -->
    <link rel="stylesheet" href="root.css">
    <title>Greek In Vercel</title> 
  </head>
  <body>
    <div class="container">
      <div>
        <h1>Bem Vindo</h1>
        <h4>API No Vercel Operando - Versão 1.0</h4>
        <h5><a href="${xurl}" target="_blank">RANK DOS FILMES</a></h5>
        <br>
      </div>
      
      ${COD_HTML.iconesMidiasSociais()}

      <div class="skill-box"><span class="title">HTML</span>
        <div class="skill-bar"><span class="skill-per html"><span class="tooltip">90%</span></span></div>
      </div>
      <div class="skill-box"><span class="title">CSS</span>
        <div class="skill-bar"><span class="skill-per css"><span class="tooltip">70%</span></span></div>
      </div>
      <div class="skill-box"><span class="title">JavaScript</span>
          <div class="skill-bar"><span class="skill-per javascript"><span class="tooltip">50%</span></span></div>
      </div>
      <div class="skill-box"><span class="title">NodeJS</span>
        <div class="skill-bar"><span class="skill-per nodejs"><span class="tooltip">90%</span></span>
      </div>
      
    </div>
  </body>
</html>`




  // var html = COD_HTML.pageInicio('RANK Filmes',70)
  // // (NAV)  MENU NO TOPO
  // html = html + `<div id="conteudo-menu">` + COD_HTML.pageMenu('KALDIRIS TOOLS') + '</div>'
  // // Fechamento do Content
  // html = html + '</div></main>'
  // // RODAPÉ
  // html = html + '<div id="conteudo-rodape">'+COD_HTML.pageRodape()+'</div>'
  // // FIM DA PAGINA
  // html = html + COD_HTML.pageFim();


  res.send(htmlroot);
})

// FILMES
app.get("/filmes",asyncHandler(async (req, res) => {
 
  await API_Filmes.getFilmePopular();

  // Retorno da API
  // res.send(global.filmePopular);
  
  // HTML DE RETORNO #############################################################################################################################
  var html = COD_HTML.pageInicio('RANK Filmes',70)
      // (NAV)  MENU NO TOPO
      html = html + `<div id="conteudo-menu">` + COD_HTML.pageMenu('KALDIRIS TOOLS') + '</div>'
      // (MAIN) CONTENT DA PAGINA ===========
      html = html + `
      <main class="px-2" style="vertical-align: center; padding: 10px;">
        <div class="content" style="vertical-align: center !important;  text-align: center !important">
          <h1>Filmes</h1>
          <strong>Rank dos Mais Votados</strong><br>`
          // ITENS - FILMES ===================
          global.filmePopular.forEach(item => {
          html = html + `<div style='padding:10px; vertical-align: center !important; '><br>`
          html = html + "<img src='" + item.poster_path + "' width='355px' height='auto' alt='" + item.title + "'><br></br>"
          html = html + `<table style="align-items: center !important; text-align: center !important">`
          html = html + `<tr><td></td><td></td></tr>`
          html = html + `
            <tr style="text-align: left;">
                <td style="color:rgb(255, 175, 55)">ID</td>
                <td>${ item.id }</td>
            </tr>
            <tr style="text-align: left;">
                <td style="color:rgb(255, 175, 55)">DATA</td>
                <td>${ item.release_date }</td>
            </tr>
            <tr style="text-align: left;">
                <td style="color:rgb(255, 175, 55)">TITULO</td>
                <td><strong>${ item.title }</strong></td>
            </tr>
            <tr style="text-align: left;">
                <td style="color:rgb(255, 175, 55)">GENEROS&nbsp;</td>
                <td>${ item.genre_names }</td>
            </tr>
            <tr style="text-align: left;">
                <td style="color:rgb(255, 175, 55)">PONTOS</td>
                <td>${ item.popularity } / ${  item.vote_count } / ${  item.vote_average }</td>
            </tr>
            <tr style="text-align: left;">
                <td style="color:rgb(255, 175, 55); vertical-align: top;">RESUMO</td>
                <td>${ item.overview }</td>
            </tr>
          </table>
        </div>`
  });
  // Fechamento do Content
  html = html + '</div></main>'
  // RODAPÉ
  html = html + '<div id="conteudo-rodape">'+COD_HTML.pageRodape()+'</div>'
  // FIM DA PAGINA
  html = html + COD_HTML.pageFim();
  // #############################################################################################################################
  
  
  res.send(html);



}));


// Export the Express API
module.exports = app