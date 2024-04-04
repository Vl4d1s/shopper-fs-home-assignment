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
import Box from "@mui/material/Box";
import { fetchMetricsAggragetedByCategory } from "../../api/category-metrics";
import Loader from "../common/Loader";
import ErrorAlert from "../common/ErrorAlert";
import { columns } from "./column";

export default function MetricsTable() {
  const { data, error, isLoading } = useQuery<any>({
    queryKey: ["metrics-aggrageted-by-category"],
    queryFn: fetchMetricsAggragetedByCategory,
  });

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorAlert message={error.message} />;

  return (
    <Box gap={2} my={4} padding={2} sx={{ border: "1px solid grey" }}>
      <Table aria-label="aggregated metrics table">
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
    </Box>
  );
}
