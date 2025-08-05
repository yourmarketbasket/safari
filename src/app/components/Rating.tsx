"use client";

import { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface RatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
}

export default function Rating({ rating, onRatingChange, readOnly = false }: RatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index: number) => {
    if (!readOnly) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || rating);
        const isHalf = starValue - 0.5 === (hoverRating || rating);

        return (
          <div
            key={starValue}
            onMouseOver={() => handleMouseOver(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
            className={`cursor-pointer ${readOnly ? 'cursor-default' : ''}`}
          >
            {isFilled ? (
              <FaStar className="text-yellow-400" />
            ) : isHalf ? (
              <FaStarHalfAlt className="text-yellow-400" />
            ) : (
              <FaRegStar className="text-gray-400" />
            )}
          </div>
        );
      })}
    </div>
  );
}
