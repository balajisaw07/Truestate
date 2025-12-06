import { ChevronDown } from 'lucide-react';

const sortOptions = [
    { value: 'date-desc', label: 'Date (Newest First)' },
    { value: 'date-asc', label: 'Date (Oldest First)' },
    { value: 'quantity-desc', label: 'Quantity (High to Low)' },
    { value: 'quantity-asc', label: 'Quantity (Low to High)' },
    { value: 'customerName-asc', label: 'Customer Name (A-Z)' },
    { value: 'customerName-desc', label: 'Customer Name (Z-A)' },
];

export default function SortDropdown({ value, onChange }) {
    const selectedOption = sortOptions.find(opt => `${opt.value}` === `${value.sortBy}-${value.sortOrder}`);

    const handleChange = (e) => {
        const [sortBy, sortOrder] = e.target.value.split('-');
        onChange({ sortBy, sortOrder });
    };

    return (
        <div className="relative flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <div className="relative">
                <select
                    value={`${value.sortBy}-${value.sortOrder}`}
                    onChange={handleChange}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );
}
