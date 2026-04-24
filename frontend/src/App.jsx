
import { BrowserRouter,Routes,Route } from "react-router-dom"
import ListaAbrigos from "./pages/ListaAbrigos"
import Checkin from "./pages/Checkin"
import Login from "./pages/Login"

function App() {
   return(
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<ListaAbrigos/>}/>
          <Route path="c/heckin" element={<Checkin/>}/>
          <Route path="/login" element={<Login/>}/>

      </Routes>
      </BrowserRouter>
   )
}

export default App