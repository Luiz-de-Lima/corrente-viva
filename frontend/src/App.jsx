import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaAbrigos from "./pages/ListaAbrigos";
import Checkin from "./pages/Checkin";
import Login from "./pages/Login";
import Painel from "./pages/Painel";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/abrigos" element={<ListaAbrigos />} />
        <Route path="/checkin" element={<Checkin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/painel" element={<Painel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
