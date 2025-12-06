import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Filter, RotateCcw } from 'lucide-react';

function FilterDropdown({ label, options, selected, onChange, multi = true }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        if (multi) {
            const newSelected = selected.includes(option)
                ? selected.filter(s => s !== option)
                : [...selected, option];
            onChange(newSelected);
        } else {
            onChange([option]);
            setIsOpen(false);
        }
    };

    const selectedCount = selected.length;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors ${selectedCount > 0
                        ? 'bg-primary-50 border-primary-200 text-primary-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
            >
                <span>{label}</span>
                {selectedCount > 0 && (
                    <span className="bg-primary-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {selectedCount}
                    </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-64 overflow-y-auto">
                    {options.map((option) => (
                        <label
                            key={option}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() => handleSelect(option)}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

function RangeFilter({ label, min, max, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasValue = value.min !== '' || value.max !== '';

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors ${hasValue
                        ? 'bg-primary-50 border-primary-200 text-primary-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
            >
                <span>{label}</span>
                {hasValue && (
                    <span className="text-xs text-primary-600">
                        {value.min || min}-{value.max || max}
                    </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={value.min}
                            onChange={(e) => onChange({ ...value, min: e.target.value })}
                            placeholder={`Min (${min})`}
                            min={min}
                            max={max}
                            className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="number"
                            value={value.max}
                            onChange={(e) => onChange({ ...value, max: e.target.value })}
                            placeholder={`Max (${max})`}
                            min={min}
                            max={max}
                            className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function DateRangeFilter({ label, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasValue = value.from || value.to;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors ${hasValue
                        ? 'bg-primary-50 border-primary-200 text-primary-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
            >
                <span>{label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                    <div className="space-y-2">
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">From</label>
                            <input
                                type="date"
                                value={value.from}
                                onChange={(e) => onChange({ ...value, from: e.target.value })}
                                className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">To</label>
                            <input
                                type="date"
                                value={value.to}
                                onChange={(e) => onChange({ ...value, to: e.target.value })}
                                className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function FilterPanel({
    filterOptions,
    filters,
    onFilterChange,
    onClearFilters
}) {
    const hasActiveFilters =
        filters.customerRegion.length > 0 ||
        filters.gender.length > 0 ||
        filters.productCategory.length > 0 ||
        filters.tags.length > 0 ||
        filters.paymentMethod.length > 0 ||
        filters.ageRange.min !== '' ||
        filters.ageRange.max !== '' ||
        filters.dateRange.from ||
        filters.dateRange.to;

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />

            <FilterDropdown
                label="Customer Region"
                options={filterOptions.regions || []}
                selected={filters.customerRegion}
                onChange={(val) => onFilterChange('customerRegion', val)}
            />

            <FilterDropdown
                label="Gender"
                options={filterOptions.genders || []}
                selected={filters.gender}
                onChange={(val) => onFilterChange('gender', val)}
            />

            <RangeFilter
                label="Age Range"
                min={filterOptions.ageRange?.minAge || 18}
                max={filterOptions.ageRange?.maxAge || 65}
                value={filters.ageRange}
                onChange={(val) => onFilterChange('ageRange', val)}
            />

            <FilterDropdown
                label="Product Category"
                options={filterOptions.categories || []}
                selected={filters.productCategory}
                onChange={(val) => onFilterChange('productCategory', val)}
            />

            <FilterDropdown
                label="Tags"
                options={filterOptions.tags || []}
                selected={filters.tags}
                onChange={(val) => onFilterChange('tags', val)}
            />

            <FilterDropdown
                label="Payment Method"
                options={filterOptions.paymentMethods || []}
                selected={filters.paymentMethod}
                onChange={(val) => onFilterChange('paymentMethod', val)}
            />

            <DateRangeFilter
                label="Date"
                value={filters.dateRange}
                onChange={(val) => onFilterChange('dateRange', val)}
            />

            {hasActiveFilters && (
                <button
                    onClick={onClearFilters}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                    Clear
                </button>
            )}
        </div>
    );
}
