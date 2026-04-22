const express = require("express");

const app = express();
require("dotenv").config();

app.use(express.json());

const responsaveisRoutes = require("./routes/responsaveis.js");
const authRoutes = require("./routes/auth.js");
const abrigosRoutes = require("./routes/abrigos.js");

app.use("/responsaveis", responsaveisRoutes);
app.use("/auth", authRoutes);
app.use("/abrigos", abrigosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na port ${PORT}`);
});
