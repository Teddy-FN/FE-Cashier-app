/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { Check, ChevronsUpDown } from "lucide-react";

// Import Swiper styles
import { cn } from "../../../lib/utils";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { Button } from "../../ui/button";
import SkeletonCategory from "../skeleton/skeleton-category";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

// Services

const CategoryList = ({
  categoryList,
  openFilterCategory,
  valueFilterCategory,
  setOpenFilterCategory,
  setValueFilterCategory
}) => {
  const CATEGORY_DESKTOP = useMemo(() => {
    if (categoryList.isLoading && categoryList.isFetching) {
      const arrLoading = Array(7).fill(null);
      return (
        <div className="gap-4 items-center mb-10 hidden lg:flex">
          {arrLoading.map((_, index) => (
            <SkeletonCategory key={index} />
          ))}
        </div>
      );
    }

    if (categoryList.data && categoryList.isSuccess) {
      const getData = [
        {
          name: "All"
        },
        ...categoryList?.data?.data
      ];

      return (
        <Swiper
          slidesPerView={getData?.length < 5 ? getData?.length : 5}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="overflow-x-auto no-scrollbar max-w-6xl pb-9 pr-[200px] hidden lg:flex">
          {getData.map((items, index) => (
            <SwiperSlide
              className={`rounded-full flex items-center justify-center py-6 ${items.name === valueFilterCategory ? "bg-[#6853F0] text-white" : "text-[#CECECE] bg-white"} font-bold text-base cursor-pointer hover:bg-[#1ACB0A] duration-200 hover:text-white`}
              key={index}
              onClick={() => setValueFilterCategory(items?.name)}>
              {items.name}
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }
  }, [categoryList]);

  const CATEGORY_MOBILE = useMemo(() => {
    if (categoryList.isLoading && categoryList.isFetching) {
      return <SkeletonCategory widthFull />;
    }

    if (categoryList.data && categoryList.isSuccess) {
      const getData = [
        {
          name: "All"
        },
        ...categoryList?.data?.data
      ];

      return (
        <Popover open={openFilterCategory} onOpenChange={setOpenFilterCategory}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openFilterCategory}
              className="w-full justify-between">
              {valueFilterCategory
                ? getData.find(
                    (filteringByCategory) => filteringByCategory.name === valueFilterCategory
                  )?.name
                : "Category..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search Category..." />
              <CommandList>
                <CommandEmpty>No Category found.</CommandEmpty>
                <CommandGroup>
                  {getData.map((filteringByCategory) => (
                    <CommandItem
                      key={filteringByCategory.name}
                      value={filteringByCategory.name}
                      onSelect={(currentValue) => {
                        setValueFilterCategory(
                          currentValue === valueFilterCategory ? "" : currentValue
                        );
                        setOpenFilterCategory(false);
                      }}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          valueFilterCategory === filteringByCategory.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {filteringByCategory.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    }
  });

  return (
    <div className="mb-10 lg:mb-0">
      {CATEGORY_DESKTOP}

      {/* Filter Category When In Tablet / Mobile Resolution */}
      <div className="lg:hidden flex items-center">
        <div className="flex flex-col gap-4 flex-1">
          <p>Category By</p>
          {CATEGORY_MOBILE}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;