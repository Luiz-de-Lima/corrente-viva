const express = require("express");

const app = express();
require("dotenv").config();

app.use(express.json());

const responsaveisRoutes=require('./routes/responsaveis.js')

app.use('/responsaveis',responsaveisRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na port ${PORT}`);
});



