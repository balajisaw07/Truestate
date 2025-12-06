# Retail Sales Backend

Backend API for the Retail Sales Management System.

## Overview

Express.js API with MongoDB for managing retail sales data with advanced search, filtering, sorting, and pagination.

## Tech Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## Search Implementation

Full-text search on Customer Name and Phone Number using MongoDB regex with case-insensitive matching. Search works alongside filters and sorting.

## Filter Implementation

Multi-select filters using MongoDB `$in` operator:
- Customer Region, Gender, Product Category, Tags, Payment Method

Range filters using `$gte` and `$lte`:
- Age Range (min-max)
- Date Range (from-to)

## Sorting Implementation

Dynamic sorting with configurable field and order:
- Date (Newest First) - default
- Quantity
- Customer Name (A-Z)

## Pagination Implementation

Limit/skip pagination with 10 items per page. Response includes currentPage, totalPages, totalItems.

## Setup

```bash
# Install dependencies
npm install

# Import CSV data (1M records)
npm run import

# Start development server
npm run dev
```

## API Endpoints

### GET /api/sales
Query Parameters:
- `search` - Search term for customer name/phone
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (date, quantity, customerName)
- `sortOrder` - asc or desc
- `customerRegion` - Filter by regions (comma-separated)
- `gender` - Filter by genders
- `ageMin`, `ageMax` - Age range
- `productCategory` - Filter by categories
- `tags` - Filter by tags
- `paymentMethod` - Filter by payment methods
- `dateFrom`, `dateTo` - Date range

### GET /api/sales/filters
Returns unique values for all filter dropdowns.
