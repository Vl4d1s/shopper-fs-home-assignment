import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { fetchCategoryAggregatedMetric } from "../../api/category-metrics";
import Loader from "../common/Loader";
import ErrorAlert from "../common/ErrorAlert";
import BoxFrame from "../common/BoxFrame";
import type { CategoryAggregatedMetric } from "../../types";
import { columns } from "./column";

export default function MetricsTable() {
  const { data, error, isLoading } = useQuery<CategoryAggregatedMetric[]>({
    queryKey: ["category-aggregated-metric"],
    queryFn: fetchCategoryAggregatedMetric,
  });

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorAlert message={error.message} />;

  return (
    <BoxFrame title="Aggregated Metrics by Category Table">
      <Table>
        <TableHead>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BoxFrame>
  );
}
