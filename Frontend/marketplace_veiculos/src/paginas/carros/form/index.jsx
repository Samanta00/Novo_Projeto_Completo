import { useState } from "react";
import React from "react";
import api from "../../../api/axios";

const Form = ({ onProductAdded }) => { // Recebe a função como prop
    const [formData, SetFormData] = useState({
        nome: "",
        preco: 0,
        quantidade: 0,
        categoria: 1,
        estoque_minimo: 0,
        estoque_maximo: 0,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        SetFormData((valorDoObjetoChamado) => ({
            ...valorDoObjetoChamado,
            [name]: name === "preco" || name.includes("estoque") || name === "quantidade" ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = async () => {
        const objetoEnviado = {
            nome: formData.nome,
            preco: formData.preco,
            quantidade: formData.quantidade,
            categoria: formData.categoria,
            estoque_minimo: formData.estoque_minimo,
            estoque_maximo: formData.estoque_maximo,
        };
        try {
            await api.post("/criar/", objetoEnviado, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Produto criado com sucesso");

            SetFormData({
                nome: "",
                preco: 0,
                quantidade: 0,
                categoria: 1,
                estoque_minimo: 0,
                estoque_maximo: 0,
            });

            onProductAdded(); // Atualiza a lista de produtos chamando a função do componente pai
        } catch (error) {
            console.error("Erro ao criar produto", error);
        }
    };

    return (
        <div>
            <form>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do Produto" />
                <input type="number" name="preco" value={formData.preco} onChange={handleChange} placeholder="Preço" />
                <input type="number" name="quantidade" value={formData.quantidade} onChange={handleChange} placeholder="Quantidade" />
                <input type="number" name="estoque_minimo" value={formData.estoque_minimo} onChange={handleChange} placeholder="Estoque Mínimo" />
                <input type="number" name="estoque_maximo" value={formData.estoque_maximo} onChange={handleChange} placeholder="Estoque Máximo" />
                <input type="number" name="categoria" value={formData.categoria} onChange={handleChange} placeholder="Categoria" />
            </form>
            <input
                type="button"
                name="send"
                value="enviar"
                className="sendo-button"
                onClick={handleSubmit}
            />
        </div>
    );
};

export default Form;
