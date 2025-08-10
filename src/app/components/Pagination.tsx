"use client";

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Button } from './ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <span className="mr-2 text-gray-700 text-xs">Items per page:</span>
        <select
          className="border border-gray-400 rounded-lg px-2 py-1 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          {[10, 20, 50, 100].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      <span className="text-black">
        Page {currentPage} out of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          variant="pagination"
        >
          <FiChevronLeft />
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          variant="pagination"
        >
          <FiChevronRight />
        </Button>
      </div>
    </div>
  );
}
