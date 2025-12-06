import { Copy, Loader2 } from 'lucide-react';
import { formatDate, formatPhone, formatCurrency } from '../utils/helpers';

export default function TransactionTable({ data, loading }) {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-8 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                <span className="ml-2 text-gray-500 text-sm">Loading transactions...</span>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-500 text-sm">No transactions found</p>
                <p className="text-gray-400 text-xs mt-1">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-auto max-h-[400px]">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                        <tr>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Transaction ID
                            </th>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Customer ID
                            </th>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Customer name
                            </th>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Phone Number
                            </th>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Gender
                            </th>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Age
                            </th>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Product Category
                            </th>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                            </th>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Total Amount
                            </th>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Customer region
                            </th>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Product ID
                            </th>
                            <th className="px-2 py-1 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                Employee name
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((row, idx) => (
                            <tr
                                key={row._id || idx}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-700">
                                    {row.transactionId}
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-700">
                                    {formatDate(row.date)}
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-primary-600 font-medium">
                                    {row.customerId}
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-700">
                                    {row.customerName}
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-primary-600 flex items-center gap-1">
                                    {formatPhone(row.phoneNumber)}
                                    <button
                                        onClick={() => copyToClipboard(row.phoneNumber)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <Copy className="w-3 h-3" />
                                    </button>
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-700">
                                    {row.gender}
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-700">
                                    {row.age}
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-700">
                                    {row.productCategory}
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-700 font-medium">
                                    {row.quantity?.toString().padStart(2, '0')}
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-700">
                                    {formatCurrency(row.totalAmount)}
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-700">
                                    {row.customerRegion}
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-700">
                                    {row.productId}
                                </td>
                                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-700">
                                    {row.employeeName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
