import React from "react";
import { Link } from "react-router-dom";
import './style.css';

const Cabecalho = () => {
    return (
        <header className="cabecalho">
            <nav>
                <ul>
                    <li>
                        <ul>
                            <li><Link to="/login" className="titulo-link">Login</Link></li>
                            <li><Link to="/carros" className="titulo-link">Carros</Link></li>
                            <li><Link to="/motos" className="titulo-link">Motos</Link></li>
                            <li><Link to="/avioes" className="titulo-link">Aviões</Link></li>     
                            <li><Link to="/leilao" className="titulo-link">Leilão</Link></li>
                            <li><Link to="/novos" className="titulo-link">Novos</Link></li>
                            <li><Link to="/pos-vendas" className="titulo-link">Pós Vendas</Link></li>
                            <li><Link to="/contato" className="titulo-link">Contato</Link></li>
                            <li><Link to="/faq" className="titulo-link">FAQ</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Cabecalho;
