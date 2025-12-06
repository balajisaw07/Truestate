import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import SummaryCards from './components/SummaryCards';
import TransactionTable from './components/TransactionTable';
import Pagination from './components/Pagination';
import { getSales, getFilterOptions } from './services/api';
import './index.css';

const initialFilters = {
  customerRegion: [],
  gender: [],
  productCategory: [],
  tags: [],
  paymentMethod: [],
  ageRange: { min: '', max: '' },
  dateRange: { from: '', to: '' },
};

const initialSort = {
  sortBy: 'date',
  sortOrder: 'desc',
};

function App() {
  // State
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({});

  // Data state
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [summary, setSummary] = useState({
    totalUnits: 0,
    totalAmount: 0,
    totalDiscount: 0,
    totalRecords: 0,
  });
  const [loading, setLoading] = useState(true);

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on search
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await getFilterOptions();
        if (response.success) {
          setFilterOptions(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    };
    fetchFilterOptions();
  }, []);

  // Fetch sales data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 10,
        search: debouncedSearch,
        sortBy: sort.sortBy,
        sortOrder: sort.sortOrder,
      };

      // Add filters
      if (filters.customerRegion.length > 0) {
        params.customerRegion = filters.customerRegion.join(',');
      }
      if (filters.gender.length > 0) {
        params.gender = filters.gender.join(',');
      }
      if (filters.productCategory.length > 0) {
        params.productCategory = filters.productCategory.join(',');
      }
      if (filters.tags.length > 0) {
        params.tags = filters.tags.join(',');
      }
      if (filters.paymentMethod.length > 0) {
        params.paymentMethod = filters.paymentMethod.join(',');
      }
      if (filters.ageRange.min) {
        params.ageMin = filters.ageRange.min;
      }
      if (filters.ageRange.max) {
        params.ageMax = filters.ageRange.max;
      }
      if (filters.dateRange.from) {
        params.dateFrom = filters.dateRange.from;
      }
      if (filters.dateRange.to) {
        params.dateTo = filters.dateRange.to;
      }

      const response = await getSales(params);

      if (response.success) {
        setData(response.data);
        setPagination(response.pagination);
        setSummary(response.summary);
      }
    } catch (error) {
      console.error('Failed to fetch sales:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, sort, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to page 1 on filter change
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-semibold text-gray-900">
              Sales Management System
            </h1>
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 space-y-3">
          {/* Filters Row */}
          <div className="flex items-center justify-between gap-4">
            <FilterPanel
              filterOptions={filterOptions}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
            <SortDropdown value={sort} onChange={handleSortChange} />
          </div>

          {/* Summary Cards */}
          <SummaryCards summary={summary} />

          {/* Table */}
          <TransactionTable data={data} loading={loading} />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
