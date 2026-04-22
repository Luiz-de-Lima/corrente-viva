const pool = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const resultado = await pool.query(
      "SELECT * FROM responsaveis WHERE email = $1",
      [email],
    );
    if (resultado.rows.length === 0) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos" });
    }
    const responsavel = resultado.rows[0];

    const senhaValida = await bcrypt.compare(senha, responsavel.senha);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: responsavel.id, nome: responsavel.nome },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
module.exports = { login };
