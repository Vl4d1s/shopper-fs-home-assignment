# Shopper FS Home Assignment
![CleanShot 2024-04-04 at 17 33 10](https://github.com/Vl4d1s/shopper-fs-home-assignment/assets/42187212/e7ecc34b-c5c8-4a18-a98e-ab5c742a756b)

## Technologies:

- React
- TypeScript
- React Query
- TanStack Table 
- Express.js 
- SQLite 
- MUI

## Database:
![CleanShot 2024-04-04 at 10 55 27](https://github.com/Vl4d1s/shopper-fs-home-assignment/assets/42187212/0550df2c-985e-45e6-89d6-c2dd88b5ebd8)

## API:

### GET /time

- **Description**: This endpoint aggregates metrics (product views, revenue, and units sold) grouped by date. It accepts optional `startDate` and `endDate` query parameters to filter the data within a specific date range.

### GET /category

- **Description**: This endpoint aggregates metrics by category, calculating totals for product views, revenue, units sold, and conversion rate (CVR) for each category.

# Decisions:

- Data Fetching with React Query:
