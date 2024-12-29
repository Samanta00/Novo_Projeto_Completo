import React, { useState, useEffect } from "react";
import carro from './imagem3.jpeg';
import './style/index.css';
import api from "../../api/axios";
import Modal from "./modal";
import Form from "./form";
import Pagination from "../paginacao/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";

const Carros = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit] = useState(6);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Busca os produtos da API
    const fetchProducts = async () => {
        try {
            const response = await api.get('/');
            setProducts(response.data);
        } catch (error) {
            console.error('Erro ao extrair dados da API', error);
        }
    };

    // Função para excluir produto
    const deleteProduct = async (id) => {
        try {
            await api.delete(`/${id}/deletar/`);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error('Erro ao excluir produto', error);
        }
    };

    // Abre o modal com o produto selecionado
    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // Atualiza a lista de produtos com o produto editado
    const handleProdutoSave = async () => {
        setIsModalOpen(false);
        await fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Determinar os produtos da página atual
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = products.slice(offset, offset + pageLimit);

    // Atualizar a página atual
    const onPageChanged = ({ currentPage }) => {
        setCurrentPage(currentPage);
    };

    return (
        <div className="crud-container">
            <h1>Catálogo de Carros</h1>

            <p>Adicionar um Novo Veículo</p>
            <Form onProductAdded={fetchProducts} />

            {/* Lista apenas os produtos da página atual */}
            <ul className="products-list">
                {Array.isArray(currentProducts) && currentProducts.map((product) => (
                    <li key={product.id} className="product-item">
                        <div className="product-card">
                            <img src={carro} alt={product.nome} />
                            <p>Preço: R$ {product.preco}</p>
                            <p>Nome: {product.nome}</p>
                            <input
                                type="button"
                                value="Remover"
                                className="remover-button"
                                onClick={() => deleteProduct(product.id)}
                            />
                            <input
                                type="button"
                                value="Editar"
                                className="editar-button"
                                onClick={() => handleEditClick(product)}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            {/* Componente de Paginação */}
            <Pagination
                totalRecords={products.length}
                pageLimit={pageLimit}
                onPageChanged={onPageChanged}
            />

            {isModalOpen && (
                <Modal
                    product={selectedProduct}
                    onSave={handleProdutoSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Carros;
