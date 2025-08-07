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
      <span className="text-black">
        Page {currentPage} out of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 border border-gray-400 rounded-md disabled:opacity-50 text-black"
        >
          <FiChevronLeft />
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-400 rounded-md disabled:opacity-50 text-black"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
