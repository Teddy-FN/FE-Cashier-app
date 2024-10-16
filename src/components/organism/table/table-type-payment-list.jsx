/* eslint-disable react/prop-types */
import React, { Fragment, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Input } from "../../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import ThreeDotsMenu from "../popover/three-dots-menu";

const TableTypePaymentList = ({ allTypePayment, handleDelete, withActionButton = true }) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = withActionButton
    ? [
        {
          accessorKey: "name",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Name Type Payment
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>
        },
        {
          accessorKey: "description",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Description
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>
        },
        {
          accessorKey: "status",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Status
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            return (
              <div className="lowercase text-center">
                {row.getValue("status") ? <Badge isActive /> : <Badge isActive={false} />}
              </div>
            );
          }
        },
        {
          accessorKey: "createdAt",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Created At
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            return (
              <div className="text-center font-medium">
                {moment(row.getValue("createdAt")).format("DD/MM/YYYY hh:mm:ss") || "-"}
              </div>
            );
          }
        },
        {
          accessorKey: "modifiedBy",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Modified By
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            return (
              <div className="text-center font-medium">{row.getValue("modifiedBy") || "-"}</div>
            );
          }
        },
        {
          accessorKey: "updatedAt",
          header: () => <div className="text-center">Updated At</div>,
          cell: ({ row }) => {
            return (
              <div className="text-center font-medium">
                {moment(row.getValue("updatedAt")).format("DD/MM/YYYY hh:mm:ss") || "-"}
              </div>
            );
          }
        },
        {
          accessorKey: "action",
          header: () => <div className="text-center">Action</div>,
          cell: ({ row }) => {
            return (
              <div className="flex justify-center">
                <ThreeDotsMenu
                  content={["edit", "delete"]}
                  handleEdit={() => {
                    navigate(`/edit-type-payment/${row?.original?.id}`, {
                      state: {
                        data: row.original
                      }
                    });
                  }}
                  handleDelete={() => {
                    const body = {
                      id: row?.original?.id,
                      nameStore: row.getValue("nameStore")
                    };
                    handleDelete(body);
                  }}
                />
              </div>
            );
          }
        }
      ]
    : [
        {
          accessorKey: "name",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Name Type Payment
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>
        },
        {
          accessorKey: "description",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Description
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>
        },
        {
          accessorKey: "status",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Status
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            return (
              <div className="lowercase text-center">
                {row.getValue("status") ? <Badge isActive /> : <Badge isActive={false} />}
              </div>
            );
          }
        },
        {
          accessorKey: "createdAt",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Created At
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            return (
              <div className="text-center font-medium">
                {moment(row.getValue("createdAt")).format("DD/MM/YYYY hh:mm:ss") || "-"}
              </div>
            );
          }
        },
        {
          accessorKey: "modifiedBy",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Modified By
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            return (
              <div className="text-center font-medium">{row.getValue("modifiedBy") || "-"}</div>
            );
          }
        },
        {
          accessorKey: "updatedAt",
          header: () => <div className="text-center">Updated At</div>,
          cell: ({ row }) => {
            return (
              <div className="text-center font-medium">
                {moment(row.getValue("updatedAt")).format("DD/MM/YYYY hh:mm:ss") || "-"}
              </div>
            );
          }
        }
      ];

  const table = useReactTable({
    data: allTypePayment?.data?.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });
  return (
    <Fragment>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter..."
          value={table.getColumn("nameStore")?.getFilterValue() ?? ""}
          onChange={(event) => table.getColumn("nameStore")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default TableTypePaymentList;
