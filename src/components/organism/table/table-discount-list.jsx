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
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "../../ui/dropdown-menu";
import ThreeDotsMenu from "../popover/three-dots-menu";
import { useCookies } from "react-cookie";

const FILTER_BY = [
  {
    value: "description",
    name: "Description Discount"
  },
  {
    value: "percentage",
    name: "Percentage"
  }
];

const limitsOptions = [10, 20, 50];

const TableDiscountList = ({
  allDiscount,
  handleDelete,
  withActionButton = true,
  pagination,
  setPagination
}) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [cookie] = useCookies(["user"]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterBy, setFilterBy] = useState({
    value: "description",
    name: "Description Discount"
  });

  const columns = withActionButton
    ? [
        {
          accessorKey: "description",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Description Discount
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => <div className="capitalize">{row.getValue("description")}</div>
        },
        {
          accessorKey: "percentage",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  percentage
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => <div className="text-center">{row.getValue("percentage")}</div>
        },
        {
          accessorKey: "isActive",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Is Active
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            return (
              <div className="lowercase text-center">
                {row.getValue("isActive") ? <Badge isActive /> : <Badge isActive={false} />}
              </div>
            );
          }
        },
        {
          accessorKey: "createdBy",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Created By
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            return <div className="text-center">{row.getValue("createdBy")}</div>;
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
              <div className="text-center">
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
              <div className="text-center">
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
                    navigate(`/edit-discount/${row?.original?.id}`, {
                      state: {
                        data: row.original
                      }
                    });
                  }}
                  handleDelete={() => {
                    const body = {
                      id: `${row?.original?.id}`,
                      description: row.getValue("description"),
                      store: cookie?.user?.location
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
          accessorKey: "description",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Description Discount
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => <div className="capitalize">{row.getValue("description")}</div>
        },
        {
          accessorKey: "percentage",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  percentage
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => <div className="text-center">{row.getValue("percentage")}</div>
        },
        {
          accessorKey: "isActive",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Is Active
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            return (
              <div className="lowercase text-center">
                {row.getValue("isActive") ? <Badge isActive /> : <Badge isActive={false} />}
              </div>
            );
          }
        },
        {
          accessorKey: "createdBy",
          header: ({ column }) => {
            return (
              <div className="justify-center flex">
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                  Created By
                  {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            );
          },
          cell: ({ row }) => {
            return <div className="text-center">{row.getValue("createdBy")}</div>;
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
              <div className="text-center">
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
              <div className="text-center">
                {moment(row.getValue("updatedAt")).format("DD/MM/YYYY hh:mm:ss") || "-"}
              </div>
            );
          }
        }
      ];

  const table = useReactTable({
    data: allDiscount?.data?.data || [],
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
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 py-4">
        {/* Search input */}
        <Input
          placeholder="Search..."
          value={table.getColumn(filterBy.value)?.getFilterValue() ?? ""}
          onChange={(event) => table.getColumn(filterBy.value)?.setFilterValue(event.target.value)}
          className="w-full md:max-w-sm"
        />

        {/* Status tabs */}
        {withActionButton && (
          <Tabs
            defaultValue={pagination.statusDiscount}
            className="w-full md:w-auto flex justify-center"
            onValueChange={(val) =>
              setPagination((prev) => ({ ...prev, statusDiscount: val, page: 1 }))
            }>
            <TabsList className="w-full md:w-auto justify-between md:justify-start">
              <TabsTrigger value="all" className="w-full md:w-auto">
                All
              </TabsTrigger>
              <TabsTrigger value="true" className="w-full md:w-auto">
                Active
              </TabsTrigger>
              <TabsTrigger value="false" className="w-full md:w-auto">
                Not Active
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Dropdown for filtering and column visibility */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Filter By Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                {filterBy.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full md:w-auto">
              {FILTER_BY.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.value === filterBy.value}
                  onCheckedChange={() => setFilterBy(column)}>
                  {column.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Show / Hide Columns Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                Show / Hide Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full md:w-auto">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
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

      {/* Pagination Section */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 py-4">
        {/* Limit Selector */}
        <div className="flex items-center gap-2 flex-1">
          <label htmlFor="limit" className="whitespace-nowrap">
            Rows per page:
          </label>
          <select
            id="limit"
            value={pagination.limit}
            onChange={(e) =>
              setPagination((prev) => ({ ...prev, limit: parseInt(e.target.value), page: 1 }))
            }
            className="border rounded-md p-1">
            {limitsOptions.map((limitOption) => (
              <option key={limitOption} value={limitOption}>
                {limitOption}
              </option>
            ))}
          </select>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1}>
            Previous
          </Button>
          <span>
            Page {pagination.page} of {allDiscount?.data?.pagination?.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === allDiscount?.data?.pagination?.totalPages}>
            Next
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default TableDiscountList;
