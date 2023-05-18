// index.js
// import { createRequire } from "module";
// import * as API_Filmes from "./filmes.cjs";
// const require = createRequire(import.meta.url);


const API_Filmes   = require("./filmes.cjs")
const express      = require('express')
const asyncHandler = require("express-async-handler");
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
  res.send('API NO VERCEL FUNCIONANDO - 🥳')
})

app.get('/about', (req, res) => {
  res.send('Uma Rota Diferente - Porta 4000 no localhost ')
})

// FILMES
app.get("/filmes",asyncHandler(async (req, res) => {
  let xjson;
  let xret = await API_Filmes.getFilmePopular().then((res) => {
    //console.log("FILMES",global.filmePopular);
  });

  let file = "./filmes_rank.html";
  let xTemplate = fs.readFile(file, (err, buffer) => {
    if (err) {
      console.error("ERRO >>>>:", err);
      return;
    }
    let html = buffer.toString();
    let xhtml = ejs.render(html, { dados: global.filmePopular });
    res.send(xhtml);
  });
})
);


// Export the Express API
module.exports = app