import React from "react";
import members from './assets/member.jpeg'
import './style/members.css';


const Members = () => {
    return (
        <div>

            <header>
                <img src={members} alt="Imagem com várias pessoas felizes" class="logo" />
            </header>

            <main>
                <h1>Área para membros</h1>
                <p>Uma área de membros online e exclusivo para pessoas registradas!</p>

                <div className="logout-btn-button">
                    <a href="http://0.0.0.0:8001/accounts/logout" className="logout-btn">Logout</a>
                </div>
            </main>
        </div>
    )
}

export default Members;
