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
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
import { Input } from "../../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "../../ui/dropdown-menu";
import { Badge } from "../../ui/badge";
import ThreeDotsMenu from "../popover/three-dots-menu";
import Spinner from "../loading/loading-load-image";
import { generateLinkImageFromGoogleDrive } from "../../../utils/generateLinkImageFromGoogleDrive";

const FILTER_BY = [
  {
    value: "createdBy",
    name: "Created By"
  }
];

const TableInvoiceLogoList = ({ invoiceLogo, handleActivate, handleDelete }) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [cookie] = useCookies(["user"]);

  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterBy, setFilterBy] = useState({
    value: "createdBy",
    name: "Created By"
  });

  const columns = [
    {
      accessorKey: "image",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Image
            {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
          </Button>
        );
      },
      cell: ({ row }) => {
        const [loading, setLoading] = useState(true);
        return (
          <>
            {loading && <Spinner />}
            {/* You can replace this with a spinner or a placeholder */}
            <img
              src={generateLinkImageFromGoogleDrive(row?.original?.image)}
              alt="Google Drive Image"
              style={{ maxWidth: "100%", height: "auto", display: loading ? "none" : "block" }}
              onLoad={() => setLoading(false)} // Image loaded successfully
              onError={(e) => {
                console.log("Image failed to load", e);
                e.target.onerror = null; // Prevents infinite loop
                e.target.src = "https://via.placeholder.com/150"; // Fallback image
                setLoading(false); // Even if it fails, stop loading
              }}
            />
          </>
        );
      }
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Status
            {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">
          {row.getValue("status") ? <Badge isActive /> : <Badge isActive={false} />}
        </div>
      )
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            isActive
            {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("isActive") ? <Badge isActive /> : <Badge isActive={false} />}
          </div>
        );
      }
    },
    {
      accessorKey: "createdBy",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Created By
            {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="text-center font-medium">{row.getValue("createdBy")}</div>;
      }
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Created At
            {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
          </Button>
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
              content={["edit", "delete", "activeOrInactive", "viewsInvoice"]}
              invoiceType="logo"
              logoInvoice={row?.original?.image}
              checkedActiveOrInactive={row.original.isActive}
              handleEdit={() => {
                navigate(`/edit-invoice-logo/${row?.original?.id}`, {
                  state: {
                    data: row.original
                  }
                });
              }}
              handleDelete={() => {
                const body = {
                  id: `${row?.original?.id}`,
                  store: cookie?.user?.location,
                  image: row?.original?.image
                };
                handleDelete(body);
              }}
              handleActivateOrInactive={() => {
                const body = {
                  id: row.original.id,
                  image: row.original.image,
                  store: cookie?.user?.location,
                  isActive: !row.original.isActive
                };
                handleActivate(body);
              }}
            />
          </div>
        );
      }
    }
  ];

  const table = useReactTable({
    data: invoiceLogo?.data?.data || [],
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
      <div className="flex flex-col md:flex-row gap-10 py-4">
        <Input
          placeholder="Search..."
          value={table.getColumn(filterBy.value)?.getFilterValue() ?? ""}
          onChange={(event) => table.getColumn(filterBy.value)?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{filterBy.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {FILTER_BY.map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.value === filterBy.value}
                    onCheckedChange={() => setFilterBy(column)}>
                    {column.name}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Show / Hide Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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

export default TableInvoiceLogoList;
