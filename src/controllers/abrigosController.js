const pool = require("../config/database");

const cadastrar = async (req, res) => {
  const { nome, endereco, capacidade_total } = req.body;
  const responsavel_id = req.responsavel.id;
  try {
    const resultado = await pool.query(
      "INSERT INTO abrigos (nome,endereco,capacidade_total,vagas_disponiveis,responsavel_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, endereco, capacidade_total, vagas_disponiveis, status",
    [nome, endereco, capacidade_total, capacidade_total, responsavel_id]
    )

    return res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listar = async (req,res) => {
  try {
    const resultado = await pool.query(
      "SELECT id, nome, endereco, capacidade_total, vagas_disponiveis, status, atualizado_em FROM abrigos",
    );
    return res.status(200).json(resultado.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports={cadastrar,listar}