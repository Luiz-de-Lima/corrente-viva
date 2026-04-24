import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErro(null);
    setCarregando(true);

    const resultado = await login(form);
    setCarregando(false);

    if (resultado.token) {
      localStorage.setItem("token", resultado.token);
      navigate("/painel");
    } else {
      setErro("Email ou senha inválidos");
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f8",
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
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
          Acesso para responsáveis
        </p>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            width: "100%",
            maxWidth: "580px",
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
              Email
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
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
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
