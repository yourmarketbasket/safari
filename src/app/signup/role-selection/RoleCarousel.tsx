"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FiUser, FiUsers, FiBriefcase, FiClipboard, FiTruck, FiUserCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const roles = [
  { name: 'Passenger', href: '/signup/passenger', icon: <FiUser className="h-12 w-12" />, description: 'For booking trips and managing your travel.', color: 'text-blue-500' },
  { name: 'Sacco', href: '/signup/sacco', icon: <FiUsers className="h-12 w-12" />, description: 'For managing your transport business.', color: 'text-green-500' },
  { name: 'Owner', href: '/signup/owner', icon: <FiBriefcase className="h-12 w-12" />, description: 'For managing your vehicles and income.', color: 'text-purple-500' },
  { name: 'Queue Manager', href: '/signup/queue-manager', icon: <FiClipboard className="h-12 w-12" />, description: 'For managing queues and ticketing.', color: 'text-pink-500' },
  { name: 'Driver', href: '/signup/driver', icon: <FiTruck className="h-12 w-12" />, description: 'For managing your trips and earnings.', color: 'text-yellow-500' },
  { name: 'Staff', href: '/signup/staff', icon: <FiUserCheck className="h-12 w-12" />, description: 'For internal staff members.', color: 'text-teal-500' },
];

export default function RoleCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowPrev(scrollLeft > 0);
      setShowNext(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      {showPrev && (
        <button onClick={() => scroll('left')} className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg">
          <FiChevronLeft className="h-8 w-8 text-gray-800" />
        </button>
      )}
      <div ref={carouselRef} onScroll={checkScroll} className="flex space-x-8 overflow-x-auto py-12 snap-x snap-mandatory no-scrollbar">
        {roles.map((role) => (
          <div key={role.name} className="snap-center flex-shrink-0 w-80">
            <div className="relative flex flex-col rounded-2xl bg-white shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out h-full">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-xl ${role.color}`}>
                    {role.icon}
                    </div>
                </div>
                <div className="flex-grow p-8 pt-20 text-center">
                    <h3 className="text-3xl font-bold text-gray-800">{role.name}</h3>
                    <p className="mt-4 text-gray-600 h-20">{role.description}</p>
                    <div className="mt-8">
                    <p className="text-5xl font-extrabold text-gray-800">Free</p>
                    <p className="text-sm text-gray-500">Forever</p>
                    </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-b-2xl">
                    <Link href={role.href} passHref>
                    <div className="block w-full py-3 px-6 text-center text-lg font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                        Select
                    </div>
                    </Link>
                </div>
            </div>
          </div>
        ))}
      </div>
      {showNext && (
        <button onClick={() => scroll('right')} className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg">
          <FiChevronRight className="h-8 w-8 text-gray-800" />
        </button>
      )}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `}</style>
    </div>
  );
}
