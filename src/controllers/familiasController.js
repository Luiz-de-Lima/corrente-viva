const pool = require("../config/database.js");

const checkin = async (req, res) => {
  const { nome_familia, quantidade_pessoas, abrigo_id } = req.body;

  try {
    const abrigo = await pool.query("SELECT * FROM abrigos  WHERE id= $1", [
      abrigo_id,
    ]);
    if (abrigo.rows.length === 0) {
      return res.status(404).json({ mensagem: "Abrigo não encontrado" });
    }
    if (abrigo.rows[0].vagas_disponiveis < quantidade_pessoas) {
      return res
        .status(400)
        .json({ mensagem: "Vagas insuficientes neste abrigo" });
    }
    await pool.query(
      "INSERT INTO familias (nome_familia, quantidade_pessoas,abrigo_id) VALUES ($1, $2, $3)",
      [nome_familia, quantidade_pessoas, abrigo_id],
    );

    const novasVagas = abrigo.rows[0].vagas_disponiveis - quantidade_pessoas;

    const novoStatus = novasVagas === 0 ? "lotado" : "disponivel";

    await pool.query(
      "UPDATE abrigos SET vagas_disponiveis =$1,status=$2,atualizado_em=NOW() WHERE id = $3",
      [novasVagas, novoStatus, abrigo_id],
    );
    return res.status(201).json({
      mensagem: "Check-in realizado com sucesso",
      vagas_restantes: novasVagas,
      status: novoStatus,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = { checkin };
