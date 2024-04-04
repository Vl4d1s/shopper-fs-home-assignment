import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fetchMetricsAggragetedByCategory } from "../api/category-metrics";

// Define the metric summary type based on the new data structure
type MetricSummary = {
  categoryName: string;
  productViews: number;
  revenue: number;
  unitsSold: number;
  cvr: number;
};

const columnHelper = createColumnHelper<MetricSummary>();

const columns = [
  columnHelper.accessor("categoryName", {
    header: "Category",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("productViews", {
    header: "Product Views",
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("revenue", {
    header: "Revenue",
    cell: (info) => `$${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor("unitsSold", {
    header: "Units Sold",
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("cvr", {
    header: "CVR (%)",
    cell: (info) => `${info.getValue()}%`,
  }),
];

export default function MetricsTable() {
  const { data, error, isLoading } = useQuery<any>({
    queryKey: ["metrics-aggrageted-by-category"],
    queryFn: fetchMetricsAggragetedByCategory,
  });

  const tableInstance = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Render the loading state, error state, or the table
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-2">
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {tableInstance.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
