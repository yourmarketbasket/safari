"use client";

import { useState, useMemo, ReactNode } from "react";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Button } from "./ui/Button";

// A generic data object type that must have an _id property.
type DataObject = { _id: string | number };

// Type for defining a column in the table.
export type ColumnDef<T extends DataObject> = {
  header: string;
  accessorKey: keyof T;
  cell?: (row: T) => ReactNode; // Optional custom cell renderer
};

// Props for the DataTable component.
type DataTableProps<T extends DataObject> = {
  data: T[];
  columns: ColumnDef<T>[];
  filterColumn: keyof T;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
};

export function DataTable<T extends DataObject>({
    data,
    columns,
    filterColumn,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'ascending' | 'descending' } | null>(null);
  const [filterValue, setFilterValue] = useState<string>("");

  // Derive unique filter options from the data.
  const filterOptions = useMemo(() => {
    const options = new Set(data.map(item => String(item[filterColumn])));
    return ["All", ...Array.from(options)];
  }, [data, filterColumn]);

  // Memoized computation for filtering and sorting the data.
  const processedData = useMemo(() => {
    let filteredData = [...data];

    // Apply filter
    if (filterValue && filterValue !== "All") {
      filteredData = filteredData.filter(item => item[filterColumn] === filterValue);
    }

    // Apply search term
    if (searchTerm) {
      filteredData = filteredData.filter(item =>
        columns.some(col =>
          String(item[col.accessorKey]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig) {
      const key = sortConfig.key;
      const direction = sortConfig.direction;
      filteredData.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        // Handle null/undefined values to avoid crashes
        if (valA == null) return 1;
        if (valB == null) return -1;

        if (valA < valB) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [data, searchTerm, filterValue, sortConfig, columns, filterColumn]);

  // Memoized computation for paginating the data.
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, processedData]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  // Handler for changing sort configuration.
  const requestSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    onPageChange(1); // Reset to first page on sort
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Controls: Search and Filter */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div className="relative">
          <FiSearch className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-400 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => { setSearchTerm(e.target.value); onPageChange(1); }}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-800 font-semibold">Filter by {String(filterColumn)}:</span>
          <select
            className="px-4 py-2 border border-gray-400 rounded-lg text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={filterValue}
            onChange={(e) => { setFilterValue(e.target.value); onPageChange(1); }}
          >
            {filterOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={String(col.accessorKey)}
                  className="py-3 px-4 border-b-2 border-gray-300 text-left text-gray-800 font-bold cursor-pointer"
                  onClick={() => requestSort(col.accessorKey)}
                >
                  <div className="flex items-center">
                    {col.header}
                    {sortConfig?.key === col.accessorKey && (
                      sortConfig.direction === 'ascending' ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={row._id}>
                {columns.map(col => (
                  <td key={`${row._id}-${String(col.accessorKey)}`} className="py-3 px-4 border-b border-gray-200 text-gray-800">
                    {col.cell ? col.cell(row) : row[col.accessorKey] as ReactNode}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
