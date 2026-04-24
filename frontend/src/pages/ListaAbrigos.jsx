import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAbrigos } from "../services/api";

function ListaAbrigos() {
  const [abrigos, setAbrigos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getAbrigos().then((data) => {
      setAbrigos(data);
      setCarregando(false);
    });
  }, []);

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
          Encontre um abrigo disponível perto de você
        </p>
      </header>

      <main
        style={{ maxWidth: "640px", margin: "0 auto", padding: "1.5rem 1rem" }}
      >
        <Link
          to="/checkin"
          style={{
            display: "block",
            background: "#1a56a0",
            color: "#fff",
            textAlign: "center",
            padding: "0.875rem",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
            marginBottom: "1.5rem",
          }}
        >
          Registrar chegada em um abrigo
        </Link>
        {carregando ? (
          <p
            style={{ textAlign: "center", color: "#6b7280", marginTop: "3rem" }}
          >
            Carregando abrigos...
          </p>
        ) : abrigos.length === 0 ? (
          <p
            style={{ textAlign: "center", color: "#6b7280", marginTop: "3rem" }}
          >
            Nenhum abrigo cadastrado no momento.
          </p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {abrigos.map((abrigo) => (
              <div
                key={abrigo.id}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "1.25rem",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  borderLeft: `4px solid ${abrigo.status === "disponivel" ? "#16a34a" : "#dc2626"}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "#1e293b",
                      margin: 0,
                    }}
                  >
                    {abrigo.nome}
                  </h2>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "999px",
                      background:
                        abrigo.status === "disponivel" ? "#dcfce7" : "#fee2e2",
                      color:
                        abrigo.status === "disponivel" ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {abrigo.status === "disponivel" ? "Disponível" : "Lotado"}
                  </span>
                </div>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "0.875rem",
                    margin: "0.5rem 0 0",
                  }}
                >
                  {abrigo.endereco}
                </p>

                <div
                  style={{
                    marginTop: "1rem",
                    background: "#f8fafc",
                    borderRadius: "8px",
                    padding: "0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.875rem", color: "#64748b" }}>
                    Vagas disponíveis
                  </span>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: "700",
                      color: "#1a56a0",
                    }}
                  >
                    {abrigo.vagas_disponiveis} / {abrigo.capacidade_total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
export default ListaAbrigos;
