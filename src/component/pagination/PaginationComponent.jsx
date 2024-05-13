import React, { useState, useEffect } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const PaginationComponent = ({length,activeIndex, currentPage, totalPages, onPageChange, itemsPerPage, handleItemsPerPageChange }) => {
  const displayPageNumbers = 5;
  const [activePage, setActivePage] = useState(currentPage);

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    const totalPagesToShow = Math.min(totalPages, displayPageNumbers);

    if (totalPages <= displayPageNumbers) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
      }
    } else {
      const firstPage = 1;
      const lastPage = totalPages;

      let startPage = Math.max(activePage - Math.floor(displayPageNumbers / 2), 1);
      let endPage = startPage + totalPagesToShow - 1;

      if (endPage > totalPages) {
        startPage -= endPage - totalPages;
        endPage = totalPages;
      }

      if (startPage <= 0) {
        startPage = 1;
        endPage = totalPagesToShow;
      }

      for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
      }

      if (startPage > 1) {
        pages.unshift('...');
        pages.unshift(firstPage);
      }

      if (endPage < totalPages) {
        pages.push('...');
        pages.push(lastPage);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="pagination-container">
      <div className='page-per-item'>
        <label className='record-label'>
          Records Per Page:
        </label>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className='pagination'>
        <button
          className={currentPage === 1 ? "disabled" : "current-btn"}
          disabled={currentPage === 1}
          onClick={() => {
            onPageChange(activePage - 1);
            setActivePage(activePage - 1);
          }}>
          <MdArrowBackIos style={{ color: currentPage === 1 ? "#d9d9d9" : "#667085", fontSize: ".9rem", marginLeft: '.2rem' }} />
        </button>
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof page === 'number' && page !== activePage) {
                onPageChange(page);
                setActivePage(page);
              }
            }}
            className={`current-page ${page === activePage ? 'active-page' : ''} `}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}
        <button
          className={"current-btn"}
          onClick={() => {
            onPageChange(activePage + 1);
            setActivePage(activePage + 1);
          }}
          disabled={currentPage === totalPages}
        >
          <MdArrowForwardIos style={{ color: "#667085", fontSize: ".9rem", }} />
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
