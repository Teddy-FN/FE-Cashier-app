/* eslint-disable react/jsx-no-undef */
import React, { useMemo } from "react";
import { Utensils, ChevronDown } from "lucide-react";

import {
  // useMutation,
  useQuery
} from "react-query";
import { useNavigate } from "react-router-dom";

// Component
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
import TemplateContainer from "../../../../components/organism/template-container";
import SkeletonTable from "../../../../components/organism/skeleton/skeleton-table";
import AbortController from "../../../../components/organism/abort-controller";
import TableProductList from "../../../../components/organism/table/table-product-list";
// Service
import { getAllProductTable } from "../../../../services/product";

const ProductList = () => {
  const navigate = useNavigate();

  // QUERY
  const allProduct = useQuery(["get-all-product-table"], () => getAllProductTable(), {
    retry: 0,
    keepPreviousData: true
  });

  // const mutateDeleteLocation = useMutation(deleteLocation, {
  //   onMutate: () => setActive(true, null),
  //   onSuccess: () => {
  //     setActive(false, "success");
  //     setTimeout(() => {
  //       toast.success("Success", {
  //         description: "Successfull, Delete Location"
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       allLocation.refetch();
  //       setActive(null, null);
  //     }, 2000);
  //   },
  //   onError: (err) => {
  //     setActive(false, "error");
  //     setTimeout(() => {
  //       toast.error("Failed", {
  //         description: err.message
  //       });
  //     }, 1500);
  //     setTimeout(() => {
  //       setActive(null, null);
  //     }, 2000);
  //   }
  // });

  const TABLE_SHOW = useMemo(() => {
    if (allProduct?.isLoading && allProduct?.isFetching) {
      return <SkeletonTable />;
    }

    if (allProduct?.isError) {
      return (
        <div className="p-4">
          <AbortController refetch={() => allProduct.refetch()} />
        </div>
      );
    }

    if (allProduct?.data && allProduct?.isSuccess && !allProduct?.isError) {
      return (
        <div className="w-full p-4">
          <TableProductList allProduct={allProduct} />
        </div>
      );
    }
  }, [allProduct]);

  return (
    <TemplateContainer>
      <div className="flex justify-between mb-6 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-[#6853F0] text-lg font-bold">Product</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <BreadcrumbLink href="/home">Cashier</BreadcrumbLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      Product Menu
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>
                        <BreadcrumbLink href="/category-list">Category</BreadcrumbLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BreadcrumbLink href="/sub-category-list">Sub Category</BreadcrumbLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BreadcrumbLink href="/product-list">Product</BreadcrumbLink>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Product List</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button
          className="py-2 px-4 w-fit bg-[#6853F0] rounded-full text-white font-bold text-lg hover:bg-[#1ACB0A] duration-200"
          onClick={() => navigate("/add-product")}>
          <div className="flex items-center gap-4">
            <Utensils className="w-6 h-6" />
            <p>Add Product</p>
          </div>
        </Button>
      </div>

      {/* List Member */}
      {TABLE_SHOW}
    </TemplateContainer>
  );
};

export default ProductList;