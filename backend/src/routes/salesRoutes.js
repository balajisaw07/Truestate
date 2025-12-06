const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// GET /api/sales - Get sales with search, filters, sorting, pagination
router.get('/', salesController.getSales);

// GET /api/sales/filters - Get filter options for dropdowns
router.get('/filters', salesController.getFilterOptions);

module.exports = router;
