# Retail Sales Frontend

React frontend for the Retail Sales Management System.

## Overview

Modern React application with Tailwind CSS for managing retail sales data with search, filtering, sorting, and pagination.

## Tech Stack

- **React** + **Vite** - Build tool and framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

## Search Implementation

Client-side debounced search input that queries Customer Name and Phone Number. Search is case-insensitive and works alongside active filters and sorting.

## Filter Implementation

Multi-select dropdown filters using React state:
- Customer Region, Gender, Product Category, Tags, Payment Method

Range-based filters:
- Age Range (min-max number inputs)
- Date Range (from-to date pickers)

Filters work independently and in combination, maintaining state with sorting and search.

## Sorting Implementation

Dropdown with options:
- Date (Newest First) - default
- Date (Oldest First)
- Quantity (High to Low / Low to High)
- Customer Name (A-Z / Z-A)

Sorting preserves active search and filter states.

## Pagination Implementation

Component displays:
- Previous/Next navigation buttons
- Numbered page buttons with ellipsis for large ranges
- 10 items per page

Pagination retains all search, filter, and sort states when navigating.

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Components

- `Sidebar` - Navigation menu
- `SearchBar` - Search input
- `FilterPanel` - All filter dropdowns
- `SortDropdown` - Sorting options
- `SummaryCards` - Stats display
- `TransactionTable` - Main data table
- `Pagination` - Page navigation
