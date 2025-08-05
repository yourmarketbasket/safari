"use client";

interface AnimatedHamburgerIconProps {
  onClick: () => void;
  isCollapsed: boolean;
}

export default function AnimatedHamburgerIcon({ onClick, isCollapsed }: AnimatedHamburgerIconProps) {
  return (
    <div onClick={onClick} className="relative w-5 h-5 focus:outline-none">
      <span
        className={`absolute h-0.5 w-full bg-gray-800 transform transition-all duration-300 ease-in-out ${
          isCollapsed ? 'rotate-45 top-1/2' : 'top-1/4'
        }`}
      ></span>
      <span
        className={`absolute h-0.5 w-full bg-gray-800 transform transition-all duration-300 ease-in-out ${
          isCollapsed ? 'opacity-0' : 'top-1/2'
        }`}
      ></span>
      <span
        className={`absolute h-0.5 w-full bg-gray-800 transform transition-all duration-300 ease-in-out ${
          isCollapsed ? '-rotate-45 top-1/2' : 'top-3/4'
        }`}
      ></span>
    </div>
  );
}
