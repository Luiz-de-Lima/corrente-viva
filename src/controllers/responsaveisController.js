const pool = require("../config/database");
const bcrypt = require("bcryptjs");

const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const emailExiste = await pool.query(
      "SELECT id FROM responsaveis WHERE email= $1",
      [email],
    );

    if (emailExiste.rows.length > 0) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const resultado = await pool.query(
      "INSERT INTO responsaveis (nome,email,senha) VALUES ($1,$2,$3) RETURNING id,nome,email",
      [nome,email,senhaCriptografada]
    );
    return res.status(201).json(resultado.rows[0])
  } catch (error) {
    console.log(error)
    return res.status(500).json({mensagem:'Erro interno do servidor'})
  }
};

module.exports={cadastrar}
