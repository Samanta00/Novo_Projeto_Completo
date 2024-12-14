import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Carros from "./paginas/carros";


export default function AppRouter() {
    return (
        <Router>
            <Routes>
                    <Route path="/carros" element={<Carros />} />
                    {/* <Route path="/auth/register" element={< />} /> */}
            </Routes>
        </Router>

    );
}