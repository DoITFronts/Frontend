'use client';

import clsx from 'clsx';
import { useState } from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  size?: 'sm' | 'lg';
  onPageChangeAction: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  size = 'sm',
  onPageChangeAction,
}: PaginationProps) {
  const [selectedPage, setSelectedPage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setSelectedPage(page);
    onPageChangeAction(page);
  };

  const buttonSize =
    size === 'sm' ? 'w-[34px] h-[34px] p-2.5 rounded-md' : 'w-12 h-12 p-2.5 rounded-lg';
  const numberSize = size === 'sm' ? 'text-sm' : 'text-base';

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i += 1) {
      if (i === 1 || i === totalPages || (i >= selectedPage - 1 && i <= selectedPage + 1)) {
        pages.push(
          <button
            key={i}
            type="button"
            aria-label="Go to page"
            className={clsx(
              buttonSize,
              'flex items-center justify-center bg-white font-medium',
              selectedPage === i ? 'font-semibold text-[#1e1e1e]' : 'text-[#c4c4c4]',
            )}
            onClick={() => handlePageChange(i)}
          >
            <span className={numberSize}>{i}</span>
          </button>,
        );
      } else if (i === selectedPage - 2 || i === selectedPage + 2) {
        pages.push(
          <div key={i} className={clsx(buttonSize, 'flex items-center justify-center')}>
            <span className="text-[#c4c4c4]">...</span>
          </div>,
        );
      }
    }
    return pages;
  };

  return (
    <div className="relative flex w-full justify-center gap-2 overflow-hidden rounded-[5px] p-5">
      <button
        type="button"
        aria-label="Previous page"
        className={clsx(buttonSize, 'flex items-center justify-center bg-white')}
        onClick={() => handlePageChange(selectedPage - 1)}
        disabled={selectedPage === 1}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.53494 12.7151C8.23485 12.3975 8.23485 11.9008 8.53494 11.5832L13.9942 5.8047C14.5062 5.26275 15.4174 5.6251 15.4174 6.37066V17.9276C15.4174 18.6732 14.5062 19.0355 13.9942 18.4936L8.53494 12.7151Z"
            fill={selectedPage === 1 ? '#E5E7EB' : '#1F2937'}
          />
        </svg>
      </button>
      {renderPageNumbers()}
      <button
        type="button"
        aria-label="Previous page"
        className={clsx(buttonSize, 'flex items-center justify-center bg-white')}
        onClick={() => handlePageChange(selectedPage + 1)}
        disabled={selectedPage === totalPages}
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.88254 7.71513C7.18263 7.3975 7.18263 6.90085 6.88254 6.58321L1.42328 0.8047C0.911278 0.262753 9.82285e-05 0.625104 9.82285e-05 1.37066L9.82285e-05 12.9276C9.82285e-05 13.6732 0.911274 14.0355 1.42328 13.4936L6.88254 7.71513Z"
            fill={selectedPage === totalPages ? '#E5E7EB' : '#1F2937'}
          />
        </svg>
      </button>
    </div>
  );
}
