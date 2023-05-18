// index.js
// import { createRequire } from "module";
// import * as API_Filmes from "./filmes.cjs";
// const require = createRequire(import.meta.url);


const API_Filmes   = require("./filmes.cjs")
const express      = require('express')
const asyncHandler = require("express-async-handler");
const url          = require('url');
const fs           = require("fs");
const ejs          = require("ejs");
// const FormData = require("form-data");

const app = express()
const PORT = 4000

//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  const xurloriginal = req.protocol + '://' + req.get('host') + req.originalUrl;
  let xurl = xurloriginal + 'filmes';
  let xret = 'API NO VERCEL FUNCIONANDO - By Grego<br><a href="'+xurl+'" target="_blank">Abrir Rota Filmes</a>'
  res.send(xret);
})

app.get('/about', (req, res) => {
  res.send('Uma Rota Diferente (about)')
})


// FILMES
app.get("/filmes",asyncHandler(async (req, res) => {
 
  await API_Filmes.getFilmePopular();   //.then((ret) => {});
  
  //res.send(global.filmePopular);
  
  var html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rank Filmes</title>
    </head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link href="./index.css" rel="stylesheet" crossorigin="anonymous">
    <style>
      body {
        background-color: Black;
      }
    </style>
    <body>
    <main class="px-2" style="vertical-align: center; padding: 10px;">
    <div class="content" style="color: white !important; vertical-align: center !important;  text-align: center !important">
      <h1>Filmes</h1>
      <strong>Rank dos Mais Votados</strong><br><br><br>
      `
      // ITENS DO ARRAY DE FILMES
      global.filmePopular.forEach(item => {
      html = html + '<div><br>'
      html = html + "<img src='" + item.poster_path + "' width='355px' height='auto' alt='" + item.title + "'><br></br>"
      html = html + `<table style="align-items: center !important; text-align: center !important"><tr><td></td><td></td></tr>`
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
              <td>${ item.title }</td>
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
    `
    html = html +'</table></div>'

  });

  html = html + '</div></main></body></html>'
  res.send(html);


                            

  











  //let file = "./filmes_rank.html";
  //var xhtml;
  // fs.readFile(file, (err, buffer) => {
  //   if (err) {
  //     console.error("ERRO >>>>:", err);
  //     return;
  //   }
  //   var html = buffer.toString();
  //   xhtml    = ejs.render(html, { dados: global.filmePopular });
  //   res.send(xhtml);
  // });


}));


// Export the Express API
module.exports = app