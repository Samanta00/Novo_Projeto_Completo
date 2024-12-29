import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Carros from "../paginas/carros";
// import Motos from "../paginas/motos";
// import Avioes from "../paginas/avioes";
import Menu from "../paginas/menu";
import Cabecalho from "../paginas/cabecalho";

export default function AppRouter() {
  return (
    <Router>
      <Cabecalho />
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/carros" element={<Carros />} />
        {/* {/* <Route path="/motos" element={<Motos />} /> */}
        {/* <Route path="/avioes" element={<App />} />  */}
        <Route path="/" element={<Navigate to="/menu" />} />
      </Routes>
    </Router>
  );
}
