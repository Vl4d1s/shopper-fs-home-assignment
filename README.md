# Shopper FS Home Assignment

![CleanShot 2024-04-05 at 12 37 02](https://github.com/Vl4d1s/shopper-fs-home-assignment/assets/42187212/9d6a986a-5d66-4737-8b0e-e8340b97fe3f)

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

- **Description**: This endpoint aggregates metrics (product views, revenue, and units sold) grouped by date.

### GET /category

- **Description**: This endpoint aggregates metrics by category, calculating totals for product views, revenue, units sold, and conversion rate (CVR) for each category.

# Decisions:

Data Fetching with React Query:

- Efficient Data Fetching: Automates fetching, caching, and updating data, reducing boilerplate and improving user experience.
- Optimized Performance: By caching data and only fetching new data when necessary, React Query minimizes the number of requests to the server, enhancing the application's performance.
- Built-in Loading and Error States: Simplifies the handling of UI states during data fetching processes, leading to cleaner code and better user feedback mechanisms.
- Easy Data Synchronization: Supports background data fetching and synchronization, ensuring the user always views the most up-to-date information.

Rendering Table with TanStack Table:

- Scalable and Flexible: Designed to handle large datasets efficiently, making it suitable for enterprise-level applications.
- Customizable: Offers extensive customization options for columns, rows, headers, and cells to fit the application’s unique needs.
- Performance Optimized: Implements virtualization and efficient rendering techniques to maintain high performance, even with large and complex datasets.
- Intuitive API: Provides a straightforward and powerful API, making it easy to implement complex features like sorting, filtering, and pagination.
- Pagination: It supports built-in pagination which can be controlled to fetch and display chunks of data at a time from the server.
- Sorting and Filtering: Provides capabilities for client-side sorting and filtering of data, which can be combined with server-side data fetching to handle large datasets.

Using pnpm Workspaces, Vite, and Turborepo:

- pnpm Workspaces streamline monorepo package management by sharing dependencies and linking local packages, saving disk space and ensuring consistent dependency resolution.

- Vite enhances the developer experience with fast builds and Hot Module Replacement (HMR), making development faster and more efficient.

- Turborepo optimizes build processes with intelligent caching and task execution, greatly reducing build times and improving CI/CD efficiency.

Combined Benefits:

- Monorepo Efficiency: Manage multiple packages with ease.
- Build Performance: Fast, incremental builds with caching.
- Developer Productivity: Instant updates with Vite's HMR during development.

Together, these tools provide a high-performance setup ideal for scalable, modern web development.

# Running the Project

Ensure you have Node.js version 18 or higher installed on your system. You can check your Node.js version by running `node -v` in your terminal.

To run the project, follow these steps:

1. Open a terminal and navigate to the root folder of the project.
2. Run the following command to install dependencies (if you haven't already):

   ```sh
   pnpm install

   ```

3. Start the development server by running:
   ```sh
   pnpm run dev
   ```

The application should now be running and accessible through your browser at the address indicated in the terminal:

client:

```sh
http://localhost:3002
```

server:

```sh
http://localhost:5001
```
