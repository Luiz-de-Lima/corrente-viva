import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Cadastro() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErro(null);
    setCarregando(true);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const response = await fetch(`${API_URL}/responsaveis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const resultado = await response.json();
    setCarregando(false);

    if (resultado.id) {
      navigate("/login");
    } else {
      setErro(resultado.mensagem || "Erro ao cadastrar");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-700 px-4 py-6 text-center shadow-md">
        <h1 className="text-white text-3xl font-bold">CorrenteViva</h1>
        <p className="text-blue-200 text-sm mt-1">Cadastro de responsável</p>
        <Link
          to="/"
          className="text-blue-200 text-xs mt-2 inline-block hover:text-white"
        >
          ← Voltar ao início
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              placeholder="Seu nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {erro && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm font-semibold mb-4">
              {erro}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={carregando}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition mb-4"
          >
            {carregando ? "Cadastrando..." : "Criar conta"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Já tem conta?{" "}
            <Link
              to="/login"
              className="text-blue-700 font-semibold hover:underline"
            >
              Entrar
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Cadastro;
