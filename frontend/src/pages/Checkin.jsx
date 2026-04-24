import { useState, useEffect } from "react";

import { checkin, getAbrigos } from "../services/api";

function Checkin() {
  const [abrigos, setAbrigos] = useState([]);
  const [form, setForm] = useState({
    nome_familia: "",
    quantidade_pessoas: "",
    abrigo_id: "",
  });
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    getAbrigos().then((data) => {
      setAbrigos(data.filter((a) => a.status === "disponivel"));
    });
  }, []);

  const handleSubmit = async () => {
    setMensagem(null);
    setErro(null);
    setCarregando(true);

    const resultado = await checkin({
      nome_familia: form.nome_familia,
      quantidade_pessoas: parseInt(form.quantidade_pessoas),
      abrigo_id: parseInt(form.abrigo_id),
    });
    setCarregando(false);

    if (resultado.mensagem === "Check-in realizado com sucesso") {
      setMensagem(
        `Check-in realizado! Vagas restantes: ${resultado.vagas_restantes}`,
      );
      setForm({ nome_familia: "", quantidade_pessoas: "", abrigo_id: "" });
    } else {
      setErro(resultado.mensagem);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f8",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <header
        style={{
          background: "#1a56a0",
          padding: "1.5rem 1rem",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "1.8rem",
            fontWeight: "700",
            margin: 0,
          }}
        >
          CorrenteViva
        </h1>
        <p
          style={{ color: "#b8d4f0", fontSize: "0.9rem", margin: "0.3rem 0 0" }}
        >
          Registre sua chegada no abrigo
        </p>
      </header>

      <main
        style={{ maxWidth: "640px", margin: "0 auto", padding: "1.5rem 1rem" }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#1e293b",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Nome da família
            </label>
            <input
              type="text"
              placeholder="Ex: Família Silva"
              value={form.nome_familia}
              onChange={(e) =>
                setForm({ ...form, nome_familia: e.target.value })
              }
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#1e293b",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Quantidade de pessoas
            </label>
            <input
              type="number"
              placeholder="Ex: 4"
              value={form.quantidade_pessoas}
              onChange={(e) =>
                setForm({ ...form, quantidade_pessoas: e.target.value })
              }
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#1e293b",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Abrigo
            </label>
            <select
              value={form.abrigo_id}
              onChange={(e) => setForm({ ...form, abrigo_id: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                boxSizing: "border-box",
                background: "#fff",
              }}
            >
              <option value="">Selecione um abrigo</option>
              {abrigos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nome} — {a.vagas_disponiveis} vagas
                </option>
              ))}
            </select>
          </div>

          {mensagem && (
            <div
              style={{
                background: "#dcfce7",
                color: "#16a34a",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                marginBottom: "1rem",
                fontWeight: "600",
              }}
            >
              {mensagem}
            </div>
          )}

          {erro && (
            <div
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                marginBottom: "1rem",
                fontWeight: "600",
              }}
            >
              {erro}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={carregando}
            style={{
              width: "100%",
              padding: "0.875rem",
              background: "#1a56a0",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {carregando ? "Registrando..." : "Confirmar chegada"}
          </button>
        </div>
      </main>
    </div>
  );
}
export default Checkin;
