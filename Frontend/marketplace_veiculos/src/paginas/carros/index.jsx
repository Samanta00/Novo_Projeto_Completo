import React, { useState } from "react";
import carro from './imagem3.jpeg';
import './style/index.css'

const Carros = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "Carro 1", price: 100 },
        { id: 2, name: "Carro 2", price: 150 },
        { id: 3, name: "Carro 3", price: 200 },
    ]);

    const deleteProduct = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

    const addProduct = () => {
        const newId = products.length + 1;
        const newProduct = {
            id: newId,
            name: `Carro ${newId}`,
            price: Math.floor(Math.random() * 500) + 100,
        };
        setProducts([...products, newProduct]);
    };

    return (
        <div className="crud-container">
            <h1>Catálogo de Carros</h1>
            <button className="add-button" onClick={addProduct}>Adicionar Carro</button>

            <ul className="products-list">
                {products.map((product) => (
                    <li key={product.id} className="product-item">
                        <div className="product-card">
                            <h2>{product.name}</h2>
                            <img src={carro} alt={product.name} />
                            <p>Preço: R$ {product.price}</p>
                            <button
                                className="delete-button"
                                onClick={() => deleteProduct(product.id)}
                            >
                                Deletar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Carros;
