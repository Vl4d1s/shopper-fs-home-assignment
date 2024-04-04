import { createColumnHelper } from "@tanstack/react-table";

interface MetricSummary {
  categoryName: string;
  productViews: number;
  revenue: number;
  unitsSold: number;
  cvr: number;
}

const columnHelper = createColumnHelper<MetricSummary>();

export const columns = [
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
