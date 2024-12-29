import React from "react";

const Pagination = ({ totalRecords, pageLimit, onPageChanged }) => {
    const totalPages = Math.ceil(totalRecords / pageLimit);

    const goToPage = (page) => {
        if (onPageChanged) {
            onPageChanged({ currentPage: page });
        }
    };

    return (
        <div className="pagination-container">
            <button onClick={() => goToPage(1)}>First</button>
            {/* Adicione botões para navegar entre páginas conforme necessário */}
            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index + 1} onClick={() => goToPage(index + 1)}>
                    {index + 1}
                </button>
            ))}
            <button onClick={() => goToPage(totalPages)}>Last</button>
        </div>
    );
};

export default Pagination;
