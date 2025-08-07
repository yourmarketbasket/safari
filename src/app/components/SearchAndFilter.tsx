"use client";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions: string[];
  filterPlaceholder: string;
}

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions,
  filterPlaceholder,
}: SearchAndFilterProps) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4 flex items-center gap-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="p-2 border border-gray-400 rounded-md flex-grow text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
        className="p-2 border border-gray-400 rounded-md text-black focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{filterPlaceholder}</option>
        {filterOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
