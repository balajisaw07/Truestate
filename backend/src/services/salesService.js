const Sale = require('../models/Sale');

class SalesService {
    /**
     * Get sales with search, filters, sorting, and pagination
     */
    async getSales(queryParams) {
        const {
            search = '',
            page = 1,
            limit = 10,
            sortBy = 'date',
            sortOrder = 'desc',
            // Filters
            customerRegion,
            gender,
            ageMin,
            ageMax,
            productCategory,
            tags,
            paymentMethod,
            dateFrom,
            dateTo
        } = queryParams;

        // Build filter query
        const filter = {};

        // Search by customer name or phone number (case-insensitive)
        if (search) {
            filter.$or = [
                { customerName: { $regex: search, $options: 'i' } },
                { phoneNumber: { $regex: search, $options: 'i' } }
            ];
        }

        // Multi-select filters
        if (customerRegion) {
            const regions = Array.isArray(customerRegion) ? customerRegion : customerRegion.split(',');
            filter.customerRegion = { $in: regions };
        }

        if (gender) {
            const genders = Array.isArray(gender) ? gender : gender.split(',');
            filter.gender = { $in: genders };
        }

        if (productCategory) {
            const categories = Array.isArray(productCategory) ? productCategory : productCategory.split(',');
            filter.productCategory = { $in: categories };
        }

        if (tags) {
            const tagList = Array.isArray(tags) ? tags : tags.split(',');
            filter.tags = { $in: tagList };
        }

        if (paymentMethod) {
            const methods = Array.isArray(paymentMethod) ? paymentMethod : paymentMethod.split(',');
            filter.paymentMethod = { $in: methods };
        }

        // Age range filter
        if (ageMin || ageMax) {
            filter.age = {};
            if (ageMin) filter.age.$gte = parseInt(ageMin);
            if (ageMax) filter.age.$lte = parseInt(ageMax);
        }

        // Date range filter
        if (dateFrom || dateTo) {
            filter.date = {};
            if (dateFrom) filter.date.$gte = new Date(dateFrom);
            if (dateTo) filter.date.$lte = new Date(dateTo);
        }

        // Build sort object
        const sortOptions = {};
        switch (sortBy) {
            case 'date':
                sortOptions.date = sortOrder === 'asc' ? 1 : -1;
                break;
            case 'quantity':
                sortOptions.quantity = sortOrder === 'asc' ? 1 : -1;
                break;
            case 'customerName':
                sortOptions.customerName = sortOrder === 'asc' ? 1 : -1;
                break;
            default:
                sortOptions.date = -1;
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Execute queries
        const [data, total] = await Promise.all([
            Sale.find(filter)
                .sort(sortOptions)
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            Sale.countDocuments(filter)
        ]);

        // Calculate aggregates for summary cards
        const aggregates = await Sale.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: null,
                    totalUnits: { $sum: '$quantity' },
                    totalAmount: { $sum: '$totalAmount' },
                    totalDiscount: {
                        $sum: {
                            $multiply: ['$totalAmount', { $divide: ['$discountPercentage', 100] }]
                        }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const summary = aggregates[0] || {
            totalUnits: 0,
            totalAmount: 0,
            totalDiscount: 0,
            count: 0
        };

        return {
            data,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            },
            summary: {
                totalUnits: summary.totalUnits,
                totalAmount: Math.round(summary.totalAmount),
                totalDiscount: Math.round(summary.totalDiscount),
                totalRecords: summary.count
            }
        };
    }

    /**
     * Get filter options (unique values for dropdowns)
     */
    async getFilterOptions() {
        const [
            regions,
            genders,
            categories,
            tags,
            paymentMethods
        ] = await Promise.all([
            Sale.distinct('customerRegion'),
            Sale.distinct('gender'),
            Sale.distinct('productCategory'),
            Sale.distinct('tags'),
            Sale.distinct('paymentMethod')
        ]);

        // Get age range
        const ageRange = await Sale.aggregate([
            {
                $group: {
                    _id: null,
                    minAge: { $min: '$age' },
                    maxAge: { $max: '$age' }
                }
            }
        ]);

        // Get date range
        const dateRange = await Sale.aggregate([
            {
                $group: {
                    _id: null,
                    minDate: { $min: '$date' },
                    maxDate: { $max: '$date' }
                }
            }
        ]);

        return {
            regions: regions.sort(),
            genders: genders.sort(),
            categories: categories.sort(),
            tags: tags.flat().filter((v, i, a) => a.indexOf(v) === i).sort(),
            paymentMethods: paymentMethods.sort(),
            ageRange: ageRange[0] || { minAge: 18, maxAge: 65 },
            dateRange: dateRange[0] || { minDate: null, maxDate: null }
        };
    }
}

module.exports = new SalesService();
