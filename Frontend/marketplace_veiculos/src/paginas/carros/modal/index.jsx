import React, { useState } from "react";
import "../style/index.css";
import api from "../../../api/axios";

const Modal = ({ product, onSave, onClose }) => {
    console.log("Produto recebido:", product);

    const idProduto = product?.id || product; // Garante que idProduto é correto
    console.log("ID do Produto:", idProduto);

    const [formData, setFormData] = useState({
        name: product?.nome || "",
        price: product?.price || 0,
        quantity: product?.quantity || 0,
        categoria: product?.categoria || "",
        estoque_minimo: product?.estoque_minimo || 0,
        estoque_maximo: product?.estoque_maximo || 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Está editando...");

        const objeto = {
            id: product.id,
            name: formData.name, // Corrigido de formData.nome para formData.name
            price: parseFloat(formData.price), // Certifique-se de que seja um número
            quantity: parseInt(formData.quantity, 10), // Certifique-se de que seja um inteiro
            estoque_minimo: parseInt(formData.estoque_minimo, 10),
            estoque_maximo: parseInt(formData.estoque_maximo, 10),
        };

        if (!idProduto) {
            console.error("ID do produto não está disponível.");
            return;
        }

        console.log('devolução de objeto', JSON.stringify(objeto));

        try {
            const response = await api.put(`/${idProduto}/editar/`, objeto, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Produto editado com sucesso:", response.data);
            onSave(response.data);
            onClose()
        } catch (error) {
            console.error("Erro ao editar produto:", error);
        }
    };

    if (!product) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Produto</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome do Automóvel:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <p />
                    <label>Preço:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <p />
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                    <p />
                    <label>Estoque Mínimo:</label>
                    <input
                        type="number"
                        name="estoque_minimo"
                        value={formData.estoque_minimo}
                        onChange={handleChange}
                    />
                    <p />
                    <label>Estoque Máximo:</label>
                    <input
                        type="number"
                        name="estoque_maximo"
                        value={formData.estoque_maximo}
                        onChange={handleChange}
                    />
                    <p />
                    {/* <label>Categoria:</label>
                    <input
                        type="text"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                    />
                    <p /> */}
                    <div className="modal-actions">
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
