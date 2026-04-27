import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { cadastrarAbrigo } from "../services/api";

function Painel() {
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    capacidade_total: "",
  });
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setMensagem(null);
    setErro(null);
    setCarregando(true);

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    const resultado = await cadastrarAbrigo(
      {
        nome: form.nome,
        endereco: form.endereco,
        capacidade_total: parseInt(form.capacidade_total),
      },
      token,
    );

    setCarregando(false);

    if (resultado.id) {
      setMensagem(`Abrigo "${resultado.nome}" cadastrado com sucesso!`);
      setForm({ nome: "", endereco: "", capacidade_total: "" });
    } else {
      setErro(resultado.mensagem || "Erro ao cadastrar abrigo");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-blue-700 px-4 py-6 text-center shadow-md relative">
        <h1 className="text-white text-3xl font-bold">CorrenteViva</h1>
        <p className="text-blue-200 text-sm mt-1">Painel do responsável</p>
        <button
          onClick={handleLogout}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-white/30 transition"
        >
          Sair
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-block text-blue-700 text-sm font-semibold mb-6 hover:underline"
        >
          ← Ver lista de abrigos
        </Link>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">
            Cadastrar novo abrigo
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Nome do abrigo
            </label>
            <input
              type="text"
              placeholder="Ex: Abrigo Central"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Endereço
            </label>
            <input
              type="text"
              placeholder="Ex: Rua das Flores, 123"
              value={form.endereco}
              onChange={(e) => setForm({ ...form, endereco: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Capacidade total
            </label>
            <input
              type="number"
              placeholder="Ex: 50"
              value={form.capacidade_total}
              onChange={(e) =>
                setForm({ ...form, capacidade_total: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {mensagem && (
            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm font-semibold mb-4">
              {mensagem}
            </div>
          )}

          {erro && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm font-semibold mb-4">
              {erro}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={carregando}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
          >
            {carregando ? "Cadastrando..." : "Cadastrar abrigo"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Painel;
