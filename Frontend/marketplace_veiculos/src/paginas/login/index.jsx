import React from "react";
import './style/index.css';
import imagem from './assets/logo.jpeg';
import github from './assets/github.svg';

const Login = () => {
    const authUrl = "http://localhost:8001/auth/"; // Endpoint do backend para iniciar o fluxo OAuth

    return (
        <div>
            <header>
                <img src={imagem} alt="Uma pessoa feliz no computador" className="logo" />
            </header>

            <main>
                <h1>Autenticação com OAuth 2.0</h1>
                <div className="social-media">
                    <div className="social-media-details">
                        <a href={authUrl}>
                            <img src={github} alt="Ícone para realizar a autenticação com GitHub" className="social-media-icon" />
                            <p>GitHub</p>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
