import React from "react";
import './style.css'

const Cabecalho = () => {
    return (
        <header className="cabecalho">
            <nav>
                <ul>
                    <li>
                        <a href="#">
                            Veículos
                        </a>
                    </li>
                    <ul>
                        <li>
                            <a href="#">Carros</a>
                        </li>
                        <li><a href="#">Motos</a></li>
                        <li><a href="#">Aviões</a></li>
                    </ul>
                    <li><a href="#">Leilão</a></li>
                    <li><a href="#">Novos</a></li>
                    <li><a href="#">Pós Vendas</a></li>
                    <li><a href="#">Contato</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>

            </nav>

        </header>

    )
}

export default Cabecalho;