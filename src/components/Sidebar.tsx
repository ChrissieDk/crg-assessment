import React from "react";
import { Search, X, ChevronRight } from "lucide-react";

interface SidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  searchQuery,
  onSearchChange,
  onClearSearch,
  isOpen,
  setIsOpen,
}) => {
  const getCategoryButtonClass = (category: string | null) => {
    const baseClass = "w-full text-left px-3 py-2 rounded-md transition-colors";
    const hiddenClass = !isOpen ? "hidden" : "";
    const selectedClass =
      selectedCategory === category
        ? "bg-blue-50 text-blue-700"
        : "text-gray-700 hover:bg-gray-50";

    return `${baseClass} ${selectedClass} ${hiddenClass}`;
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-30 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 focus:outline-none z-40"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <ChevronRight
          className={`h-4 w-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div className="h-full flex flex-col">
        {/* Search Section */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={isOpen ? "Search by date or category..." : ""}
              value={searchQuery}
              onChange={onSearchChange}
              className={`w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                !isOpen ? "opacity-0 w-0" : "opacity-100"
              }`}
            />
            {searchQuery && isOpen && (
              <button
                onClick={onClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            <h2
              className={`text-lg font-semibold text-gray-900 mb-4 ${
                !isOpen && "hidden"
              }`}
            >
              Categories
            </h2>

            <button
              onClick={() => onCategorySelect(null)}
              className={getCategoryButtonClass(null)}
            >
              All Categories
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={getCategoryButtonClass(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
