import { ShoppingCart, DollarSign, Percent, Info } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

export default function SummaryCards({ summary }) {
    const cards = [
        {
            icon: ShoppingCart,
            label: 'Total units sold',
            value: summary.totalUnits?.toLocaleString() || '0',
            bgColor: 'bg-white',
        },
        {
            icon: DollarSign,
            label: 'Total Amount',
            value: formatCurrency(summary.totalAmount || 0),
            subValue: `${summary.totalRecords?.toLocaleString() || 0} SRs`,
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-700',
        },
        {
            icon: Percent,
            label: 'Total Discount',
            value: formatCurrency(summary.totalDiscount || 0),
            subValue: `${summary.totalRecords?.toLocaleString() || 0} SRs`,
            bgColor: 'bg-green-50',
            textColor: 'text-green-700',
        },
    ];

    return (
        <div className="flex gap-4">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className={`${card.bgColor} border border-gray-200 rounded-lg px-3 py-2 min-w-[140px]`}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500">{card.label}</span>
                        <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <div className={`font-semibold ${card.textColor || 'text-gray-900'}`}>
                        {card.value}
                        {card.subValue && (
                            <span className="text-xs font-normal text-gray-500 ml-1">
                                ({card.subValue})
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
