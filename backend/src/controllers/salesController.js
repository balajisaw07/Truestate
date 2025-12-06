const salesService = require('../services/salesService');

/**
 * Get sales data with search, filters, sorting, and pagination
 */
const getSales = async (req, res) => {
    try {
        const result = await salesService.getSales(req.query);
        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching sales data',
            error: error.message
        });
    }
};

/**
 * Get filter options for dropdowns
 */
const getFilterOptions = async (req, res) => {
    try {
        const options = await salesService.getFilterOptions();
        res.json({
            success: true,
            data: options
        });
    } catch (error) {
        console.error('Error fetching filter options:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching filter options',
            error: error.message
        });
    }
};

module.exports = {
    getSales,
    getFilterOptions
};
