// index.js
const express = require('express')

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('API NO VERCEL FUNCIONANDO - 🥳')
})

app.get('/about', (req, res) => {
  res.send('Uma Rota Diferente - Porta 4000 no localhost ')
})

// Export the Express API
module.exports = app