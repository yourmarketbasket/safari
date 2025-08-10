"use client";

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Button } from './ui/Button';

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
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          variant="secondary"
        >
          <FiChevronLeft />
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          variant="secondary"
        >
          <FiChevronRight />
        </Button>
      </div>
    </div>
  );
}
