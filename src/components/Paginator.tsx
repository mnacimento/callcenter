// src/components/Paginator.tsx

import React from 'react';

import { PaginatorProps } from '../interface/paginator.interfaces';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

// Funciones auxiliares para manejar la navegación de páginas
export const handlePrevPage = (
  currentPage: number,
  onPageChange: (page: number) => void
) => {
  if (currentPage > 1) {
    onPageChange(currentPage - 1);
  } else {
    onPageChange(1);
  }
};

export const handleNextPage = (
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
) => {
  if (currentPage < totalPages) {
    onPageChange(currentPage + 1);
  } else {
    onPageChange(totalPages);
  }
};

const Paginator: React.FC<PaginatorProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  // Maneja la navegación a la primera página
  const handleFirstPage = () => onPageChange(1);

  // Maneja la navegación a la última página
  const handleLastPage = () => onPageChange(totalPages);

  // Genera el arreglo de números de página y puntos suspensivos según la lógica
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...');
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push('...', totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Botón para la primera página */}
      <button
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        aria-label="Primera página"
        className={`p-2 rounded-md ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600 hover:bg-blue-100'
        }`}
      >
        <ChevronDoubleLeftIcon className="h-5 w-5" />
      </button>

      {/* Botón para la página anterior */}
      <button
        onClick={() => handlePrevPage(currentPage, onPageChange)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className={`p-2 rounded-md ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600 hover:bg-blue-100'
        }`}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {/* Números de página y puntos suspensivos */}
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md border ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 hover:bg-blue-100'
            }`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={`dots-${index}`} className="px-2 py-1 text-gray-500">
            ...
          </span>
        )
      )}

      {/* Botón para la página siguiente */}
      <button
        onClick={() => handleNextPage(currentPage, totalPages, onPageChange)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        className={`p-2 rounded-md ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600 hover:bg-blue-100'
        }`}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      {/* Botón para la última página */}
      <button
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        aria-label="Última página"
        className={`p-2 rounded-md ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600 hover:bg-blue-100'
        }`}
      >
        <ChevronDoubleRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Paginator;
