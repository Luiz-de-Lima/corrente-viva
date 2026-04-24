import { useState, useEffect } from "react";

import { getAbrigos } from "../services/api";

function ListaAbrigos() {

    const[abrigos,setAbrigos]=useState([])
    const[carregando,setCarregando]=useState(true)

    useEffect(()=>{
        getAbrigos().then((data)=>{
            setAbrigos(data)
            setCarregando(false)
        })
    },[])

    return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">CorrenteViva</h1>
        <p className="text-sm mt-1">Encontre um abrigo disponível</p>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {carregando ? (
          <p className="text-center text-gray-500 mt-8">Carregando abrigos...</p>
        ) : abrigos.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">Nenhum abrigo cadastrado.</p>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            {abrigos.map((abrigo) => (
              <div key={abrigo.id} className="bg-white rounded-xl shadow p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">{abrigo.nome}</h2>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    abrigo.status === 'disponivel'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {abrigo.status === 'disponivel' ? 'Disponível' : 'Lotado'}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{abrigo.endereco}</p>
                <p className="text-gray-600 text-sm mt-2">
                  Vagas disponíveis: <span className="font-semibold">{abrigo.vagas_disponiveis}</span> de <span className="font-semibold">{abrigo.capacidade_total}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
export default ListaAbrigos