import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 px-4 py-6 text-center shadow-md">
        <h1 className="text-white text-3xl font-bold">CorrenteViva</h1>
        <p className="text-blue-200 text-sm mt-1">
          Registre sua chegada no abrigo
        </p>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="text-blue-700 text-sm font-semibold hover:underline"
          >
            ← Voltar
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Nome da família
            </label>
            <input
              type="text"
              placeholder="Ex: Família Silva"
              value={form.nome_familia}
              onChange={(e) =>
                setForm({ ...form, nome_familia: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Quantidade de pessoas
            </label>
            <input
              type="number"
              placeholder="Ex: 4"
              value={form.quantidade_pessoas}
              onChange={(e) =>
                setForm({ ...form, quantidade_pessoas: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Abrigo
            </label>
            <select
              value={form.abrigo_id}
              onChange={(e) => setForm({ ...form, abrigo_id: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
            <div>
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm font-semibold mb-4">
                {mensagem}
              </div>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition"
              >
                Voltar ao início
              </button>
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
            {carregando ? "Registrando..." : "Confirmar chegada"}
          </button>
        </div>
      </main>
    </div>
  );
}
export default Checkin;
