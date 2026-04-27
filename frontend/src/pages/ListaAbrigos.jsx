import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAbrigos } from "../services/api";

function ListaAbrigos() {
  const [abrigos, setAbrigos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getAbrigos().then((data) => {
      setAbrigos(Array.isArray(data) ? data : []);
      setCarregando(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 px-4 py-6 text-center shadow-md">
        <h1 className="text-white text-3xl font-bold">CorrenteViva</h1>
        <p className="text-blue-200 text-sm mt-1">
          Encontre um abrigo disponível perto de você
        </p>
        <Link
          to="/login"
          className="text-blue-200 text-xs mt-2 inline-block hover:text-white"
        >
          Acesso para responsáveis
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <Link
          to="/checkin"
          className="block bg-blue-700 hover:bg-blue-800 text-white text-center font-semibold py-3 rounded-lg transition mb-6"
        >
          Registrar chegada em um abrigo
        </Link>

        {carregando ? (
          <p className="text-center text-gray-500 mt-8">
            Carregando abrigos...
          </p>
        ) : abrigos.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            Nenhum abrigo cadastrado no momento.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {abrigos.map((abrigo) => (
              <div
                key={abrigo.id}
                className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${
                  abrigo.status === "disponivel"
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-slate-800">
                    {abrigo.nome}
                  </h2>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      abrigo.status === "disponivel"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {abrigo.status === "disponivel" ? "Disponível" : "Lotado"}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mt-1">{abrigo.endereco}</p>
                <div className="mt-4 bg-gray-50 rounded-lg px-4 py-3 flex justify-between items-center">
                  <span className="text-sm text-slate-500">
                    Vagas disponíveis
                  </span>
                  <span className="text-base font-bold text-blue-700">
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
