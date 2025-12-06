# Retail Sales Management System

A full-stack web application for managing retail sales data with advanced search, filtering, sorting, and pagination capabilities.

## Overview

This system provides a comprehensive interface for viewing and analyzing retail sales transactions. Built with Express.js and React, it handles 1 million+ records with efficient querying, multi-select filtering, and responsive pagination.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Frontend | React, Vite, Tailwind CSS, Lucide React |
| Database | MongoDB Atlas |

## Search Implementation

Full-text search implemented using MongoDB regex matching on Customer Name and Phone Number fields. Search is case-insensitive and works in conjunction with active filters and sorting. Frontend implements 300ms debounce to reduce API calls.

## Filter Implementation

Multi-select filters using MongoDB `$in` operator:
- **Customer Region** - East, West, North, South, Central
- **Gender** - Male, Female
- **Product Category** - Electronics, Clothing, Beauty
- **Tags** - organic, wireless, portable, etc.
- **Payment Method** - UPI, Credit Card, Debit Card, Cash, etc.

Range filters using `$gte` and `$lte`:
- **Age Range** - Min and max age inputs
- **Date Range** - From and to date pickers

All filters work independently and in combination, maintaining state alongside search and sorting.

## Sorting Implementation

Dynamic sorting with configurable field and order:
- **Date (Newest First)** - Default sort
- **Date (Oldest First)**
- **Quantity (High to Low / Low to High)**
- **Customer Name (A-Z / Z-A)**

Sorting preserves all active search queries and filter selections.

## Pagination Implementation

Server-side pagination with 10 items per page:
- Previous/Next navigation buttons
- Numbered page buttons with smart ellipsis
- Current page indicator
- Total items count

Pagination maintains all search, filter, and sort states across page navigation.

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB connection (Atlas or local)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
# Edit .env with your MongoDB URI

# Import CSV data (1M records - takes ~5-10 minutes)
npm run import

# Start server
npm run dev
```

Server runs at: `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Application runs at: `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sales` | Get sales with search, filters, sort, pagination |
| GET | `/api/sales/filters` | Get unique values for filter dropdowns |
| GET | `/api/health` | Health check endpoint |

## Project Structure

```
├── backend/          # Express.js API
├── frontend/         # React application  
├── docs/             # Architecture documentation
└── README.md         # This file
```

See `/docs/architecture.md` for detailed architecture documentation.
