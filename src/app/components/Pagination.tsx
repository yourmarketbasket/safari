"use client";

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  return (
    <div className="flex justify-between items-center p-4">
      <span>
        Page {currentPage} out of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 border rounded-md disabled:opacity-50"
        >
          <FiChevronLeft />
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 border rounded-md disabled:opacity-50"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
