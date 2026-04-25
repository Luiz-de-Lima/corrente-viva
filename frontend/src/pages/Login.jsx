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
  return(
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-700 px-4 py-6 text-center shadow-md">
        <h1 className="text-white text-3xl font-bold">CorrenteViva</h1>
        <p className="text-blue-200 text-sm mt-1">Acesso para responsáveis</p>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Senha</label>
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
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Login;
