import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-700 px-4 py-8 text-center shadow-md">
        <h1 className="text-white text-3xl font-bold">CorrenteViva</h1>
        <p className="text-blue-200 text-sm mt-1">Conectando pessoas a abrigos em tempo real</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 gap-4">
        <p className="text-slate-600 text-base font-medium mb-2">Como posso te ajudar?</p>

        <button
          onClick={() => navigate('/abrigos')}
          className="w-full max-w-sm bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 rounded-xl transition text-lg"
        >
          🏠 Estou procurando um abrigo
        </button>

        <button
          onClick={() => navigate('/login')}
          className="w-full max-w-sm bg-white hover:bg-gray-50 text-blue-700 font-semibold py-4 rounded-xl transition text-lg border border-blue-200"
        >
          👤 Sou responsável por um abrigo
        </button>
      </main>
    </div>
  )
}

export default Home