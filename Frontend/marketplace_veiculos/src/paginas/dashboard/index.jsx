import React, { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './style.css'



const Dashboard = () => {
    const [carros] = useState(['uno', 'fiat', 'mecedes', 'camaro', 'creta', 'costa', 'celta', ' picape', 'hilux'])
    const [inputValue, setValue] = useState('');

    const filterOptions = carros.filter
        (optionValue => optionValue.toLowerCase().includes(inputValue.toLowerCase()))

    const data = [
        { name: 'Janeiro', vendas: 4000 },
        { name: 'Fevereiro', vendas: 3000 },
        { name: 'Março', vendas: 2000 },
        { name: 'Abril', vendas: 2780 },
        { name: 'Maio', vendas: 1890 },
        { name: 'Junho', vendas: 2390 },
        { name: 'Julho', vendas: 3490 },
        { name: 'Agosto', vendas: 3000 },
        { name: 'Setembro', vendas: 2000 },
        { name: 'Outubro', vendas: 2780 },
        { name: 'Novembro', vendas: 1890 },
        { name: 'Dezembro', vendas: 2390 },
    ];

    return (
        <main>
            <section>
                <div>
                    <div>
                        <input type="text" value={inputValue} onChange={(e) => setValue(e.target.value)} placeholder="Digite uma Opção" />

                        <ul>
                            {filterOptions.map((optionValue, index) => (
                                <li key={index}> {optionValue} </li>
                            ))}
                        </ul>

                    </div>
                    <div>
                        <h3>Painel</h3>
                        <div>
                            <ul>
                                <li>Visão Geral</li>
                                <li>Relatórios</li>
                            </ul>
                        </div>
                    </div>

                    <ul className="lista-cards">

                        <li className="card">
                            <div className="container-card">
                                <h4>Receita Total</h4>
                                <h5>$ 45.231,89</h5>
                                <p>+20,1% em relação ao mês passado</p>
                            </div>
                        </li>


                        <li className="card">
                            <div className="container-card">
                                <h4>Maior Venda</h4>
                                <h5>$ 45.231,89</h5>
                                <p>+20,1% em relação ao mês passado</p>
                            </div>
                        </li>


                        <li className="card">
                            <div className="container-card">
                                <h4>Vendas</h4>
                                <h5>$ 45.231,89</h5>
                                <p>+20,1% em relação ao mês passado</p>
                            </div>
                        </li>


                        <li className="card">
                            <div className="container-card">
                                <h4>Compras realizadas</h4>
                                <h5>$ 45.231,89</h5>
                                <p>+20,1% em relação ao mês passado</p>
                            </div>
                        </li>



                    </ul>

<div>

</div>





                </div>
            </section>
        </main>
    )
}

export default Dashboard;