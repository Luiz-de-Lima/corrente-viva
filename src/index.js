const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://corrente-viva.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "authorization"],
    reflightContinue: false,
    optionsSuccessStatus: 204
  }),
);

app.use(express.json());

const responsaveisRoutes = require("./routes/responsaveis.js");
const authRoutes = require("./routes/auth.js");
const abrigosRoutes = require("./routes/abrigos.js");
const familiasRouter = require("./routes/familias.js");

app.use("/responsaveis", responsaveisRoutes);
app.use("/auth", authRoutes);
app.use("/abrigos", abrigosRoutes);
app.use("/familias", familiasRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na port ${PORT}`);
});
