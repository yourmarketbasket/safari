"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FiUser, FiUsers, FiBriefcase, FiClipboard, FiTruck, FiUserCheck, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import { Button } from '@/app/components/ui/Button';

const roles = [
  {
    name: 'Passenger',
    href: '/signup/passenger',
    icon: <FiUser className="h-12 w-12" />,
    description: [
        "Book trips in seconds.",
        "Receive real-time updates.",
        "Enjoy a seamless travel experience.",
        "Access your travel history.",
        "Get 24/7 customer support."
    ],
    color: 'text-blue-500'
  },
  {
    name: 'Sacco',
    href: '/signup/sacco',
    icon: <FiUsers className="h-12 w-12" />,
    description: [
        "Manage your fleet with ease.",
        "Optimize routes and schedules.",
        "Track your revenue and expenses.",
        "Communicate with your drivers.",
        "Access detailed reports."
    ],
    color: 'text-green-500'
  },
  {
    name: 'Owner',
    href: '/signup/owner',
    icon: <FiBriefcase className="h-12 w-12" />,
    description: [
        "Track your vehicle's performance.",
        "Monitor your income and expenses.",
        "Approve payroll for your drivers.",
        "Get detailed reports on your assets.",
        "Manage your vehicle documents."
    ],
    color: 'text-purple-500'
  },
  {
    name: 'Queue Manager',
    href: '/signup/queue-manager',
    icon: <FiClipboard className="h-12 w-12" />,
    description: [
        "Manage passenger queues efficiently.",
        "Scan tickets and verify passengers.",
        "Get real-time boarding statistics.",
        "Communicate with drivers and staff.",
        "Ensure a smooth boarding process."
    ],
    color: 'text-pink-500'
  },
  {
    name: 'Driver',
    href: '/signup/driver',
    icon: <FiTruck className="h-12 w-12" />,
    description: [
        "Manage your trips and earnings.",
        "Get real-time trip updates.",
        "Communicate with passengers.",
        "Access your payment history.",
        "Get 24/7 support."
    ],
    color: 'text-yellow-500'
  },
  {
    name: 'Staff',
    href: '/signup/staff',
    icon: <FiUserCheck className="h-12 w-12" />,
    description: [
        "Access internal tools and resources.",
        "Collaborate with your team.",
        "Stay up-to-date with company news.",
        "Manage your work schedule.",
        "Get support from HR and IT."
    ],
    color: 'text-teal-500'
  },
];

export default function RoleCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowPrev(scrollLeft > 0);
      setShowNext(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    const currentRef = carouselRef.current;
    if (currentRef) {
        currentRef.addEventListener('scroll', checkScroll);
    }
    return () => {
        window.removeEventListener('resize', checkScroll);
        if (currentRef) {
            currentRef.removeEventListener('scroll', checkScroll);
        }
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      {showPrev && (
        <button onClick={() => scroll('left')} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors">
          <FiChevronLeft className="h-8 w-8 text-gray-800" />
        </button>
      )}
      <div ref={carouselRef} onScroll={checkScroll} className="flex space-x-8 md:space-x-12 overflow-x-auto py-16 px-4 md:px-12 snap-x snap-mandatory no-scrollbar">
        {roles.map((role) => (
          <div key={role.name} className="snap-center flex-shrink-0 w-80 md:w-96">
            <div className="relative flex flex-col rounded-2xl bg-white shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out h-full">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-xl ${role.color}`}>
                    {role.icon}
                    </div>
                </div>
                <div className="flex-grow p-8 pt-20 text-center">
                    <h3 className="text-3xl font-bold text-gray-800">{role.name}</h3>
                    <ul className="mt-6 text-gray-800 text-left space-y-2">
                        {role.description.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <FiCheck className="w-5 h-5 mr-2 mt-1 text-green-500 flex-shrink-0"/>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8">
                      <p className="text-3xl font-bold text-gray-700">Free</p>
                    </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-b-2xl">
                    <Link href={role.href} passHref>
                        <Button variant="secondary" className="w-full">
                            Select
                        </Button>
                    </Link>
                </div>
            </div>
          </div>
        ))}
      </div>
      {showNext && (
        <button onClick={() => scroll('right')} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors">
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
