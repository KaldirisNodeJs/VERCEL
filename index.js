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

  let file = "./filmes_rank.html";
  var xhtml;
  var html;
  
  fs.readFile(file, (err, buffer) => {
    if (err) {
      console.error("ERRO >>>>:", err);
      return;
    }
    var html = buffer.toString();
    xhtml    = ejs.render(html, { dados: global.filmePopular });
    res.send(xhtml);
  });


}));


// Export the Express API
module.exports = app