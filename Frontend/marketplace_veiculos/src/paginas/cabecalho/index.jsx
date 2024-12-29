import React from "react";
import { Link } from "react-router-dom";
import './style.css';

const Cabecalho = () => {
    return (
        <header className="cabecalho">
            <nav>
                <ul>
                    <li>
                        <span>Veículos</span>
                        <ul>
                            <li><Link to="/carros">Carros</Link></li>
                            <li><Link to="/motos">Motos</Link></li>
                            <li><Link to="/avioes">Aviões</Link></li>     
                            <li><Link to="/leilao">Leilão</Link></li>
                            <li><Link to="/novos">Novos</Link></li>
                            <li><Link to="/pos-vendas">Pós Vendas</Link></li>
                            <li><Link to="/contato">Contato</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Cabecalho;
