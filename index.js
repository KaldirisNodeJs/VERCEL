const API_Filmes   = require("./filmes.cjs")
const COD_HTML     = require("./codhtml.cjs")
const express      = require('express')
const asyncHandler = require("express-async-handler");
const fs           = require("fs");

const app = express()
const PORT = 4000

app.use(express.static(__dirname + '/assets/icones'));
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})


// TESTE - PADRAO
app.get('/padrao', (req, res) => {

  var html = COD_HTML.pageInicio('RANK Filmes',70)
  // (NAV)  MENU NO TOPO
  html = html + `<div id="conteudo-menu">` + COD_HTML.pageMenu('KALDIRIS TOOLS') + '</div>'

  html = html + `
  <main class="px-2" style="vertical-align: center; padding: 10px;">
  <div class="content" style="vertical-align: center !important;  text-align: center !important">
  <br><h1>ROTA PADRÂO DE EXEMPLO</h1>
  <h4>API Hospedada no Vercel<h4><br>
  `
  // Fechamento do Content
  html = html + '</div></main>'
  // RODAPÉ
  html = html + '<div id="conteudo-rodape">'+COD_HTML.pageRodape()+'</div>'
  // FIM DA PAGINA
  html = html + COD_HTML.pageFim();
  res.send(html);

});

// ROOT - BEM VINDO
app.get('/', (req, res) => {
  
  const xurloriginal = req.protocol + '://' + req.get('host') + req.originalUrl;
  //let xurl = xurloriginal + 'filmes';
  let xurl = '/filmes'

  var html = COD_HTML.pageInicio('RANK Filmes',70)
  // (NAV)  MENU NO TOPO
  html = html + `<div id="conteudo-menu">` + COD_HTML.pageMenu('KALDIRIS TOOLS') + '</div>'

  html = html + `
      <main class="px-2" style="vertical-align: center; padding: 10px;">
      <div class="content" style="vertical-align: center !important;  text-align: center !important">
      <br><h1>BEM VINDO</h1>
      <h4>API Hospedada no Vercel<h4><br>
      <br>
      <h5><a href="${xurl}">RANK DOS FILMES</a></h5>
      <br>
      `
  // Fechamento do Content
  html = html + '</div></main>'
  
  // RODAPÉ
  html = html + '<div id="conteudo-rodape">'+COD_HTML.pageRodape()+'</div>'
  // FIM DA PAGINA
  html = html + COD_HTML.pageFim();
  res.send(html);

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
          <h4>Rank dos Mais Votados</h4><br>`
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