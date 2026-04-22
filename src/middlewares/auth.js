const jwt = require("jsonwebtoken");

const autenticar = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensagem: "Token não informado" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.responsavel = decoded;
    next();
  } catch (error) {
    console.log("erro");
    res.status(401).json({ mensagem: "Token inválido" });
  }
};
module.exports = { autenticar };
