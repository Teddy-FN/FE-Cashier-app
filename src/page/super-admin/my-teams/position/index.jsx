import React, { useState, useMemo } from "react";
import { ClipboardPlus, ChevronDown } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "../../../../components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../../../../components/ui/breadcrumb";
import { toast } from "sonner";
import { useLoading } from "../../../../components/organism/loading";
import TemplateContainer from "../../../../components/organism/template-container";
import { useNavigate } from "react-router-dom";
import TablePositionList from "../../../../components/organism/table/table-position-list";

import { useMutation, useQuery } from "react-query";
import { getAllPositionTable, deletePosition } from "../../../../services/position";
import SkeletonTable from "../../../../components/organism/skeleton/skeleton-table";
import AbortController from "../../../../components/organism/abort-controller";

const PositionList = () => {
  const navigate = useNavigate();
  const { setActive } = useLoading();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    statusRole: "all"
  });

  // QUERY
  const allPosition = useQuery(
    ["get-all-position-table", pagination],
    () =>
      getAllPositionTable({
        limit: pagination.limit,
        page: pagination.page,
        statusRole: pagination.statusRole
      }),
    {
      keepPreviousData: false,
      cacheTime: 0
    }
  );

  const mutateDeletePosition = useMutation(deletePosition, {
    onMutate: () => setActive(true, null),
    onSuccess: () => {
      setActive(false, "success");
      setTimeout(() => {
        toast.success("Success", {
          description: "Successfull, Delete Category"
        });
      }, 1000);
      setTimeout(() => {
        allPosition.refetch();
        setActive(null, null);
      }, 2000);
    },
    onError: (err) => {
      setActive(false, "error");
      setTimeout(() => {
        toast.error("Failed", {
          description: err.message
        });
      }, 1500);
      setTimeout(() => {
        setActive(null, null);
      }, 2000);
    }
  });

  const TABLE_SHOW = useMemo(() => {
    if (allPosition.isLoading && allPosition.isFetching && !allPosition.isError) {
      return <SkeletonTable />;
    }

    if (allPosition.isError) {
      return (
        <div className="p-4">
          <AbortController refetch={() => allPosition.refetch()} />
        </div>
      );
    }

    if (allPosition.data && allPosition.isSuccess && !allPosition.isError) {
      return (
        <div className="w-full p-4">
          <TablePositionList
            allPosition={allPosition}
            handleDelete={(body) => mutateDeletePosition.mutate(body)}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      );
    }
  }, [allPosition, mutateDeletePosition, pagination, setPagination]);

  return (
    <TemplateContainer>
      <div className="flex justify-between mb-6 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-[#6853F0] text-lg font-bold">Position</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <BreadcrumbLink href="/dashboard-super-admin">Dashboard</BreadcrumbLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      My Teams
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>
                        <BreadcrumbLink href="/my-teams-location-available">User</BreadcrumbLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BreadcrumbLink href="/position-list">Position</BreadcrumbLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BreadcrumbLink href="/role-list">Role</BreadcrumbLink>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Position</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button
          className="py-2 px-4 w-fit bg-[#6853F0] rounded-full text-white font-bold text-lg hover:bg-[#1ACB0A] duration-200"
          onClick={() => navigate("/add-position")}>
          <div className="flex items-center gap-4">
            <ClipboardPlus className="w-6 h-6" />
            <p>Add Position</p>
          </div>
        </Button>
      </div>

      {/* List Member */}
      {TABLE_SHOW}
    </TemplateContainer>
  );
};

export default PositionList;
