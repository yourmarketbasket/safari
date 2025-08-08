"use client";

export interface FilterConfig {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder: string;
}

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: FilterConfig[];
  sortOrder: "asc" | "desc";
  onSortChange: (value: "asc" | "desc") => void;
}

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  filters,
  sortOrder,
  onSortChange,
}: SearchAndFilterProps) {
  return (
    <div className="p-4 bg-white rounded-lg mb-4 flex items-center gap-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="p-2 border border-gray-400 rounded-md flex-grow text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500"
      />
      {filters.map((filter, index) => (
        <select
          key={index}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
          className="p-2 border border-gray-400 rounded-md text-black focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{filter.placeholder}</option>
          {filter.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ))}
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
        className="p-2 border border-gray-400 rounded-md text-black focus:ring-2 focus:ring-blue-500"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
