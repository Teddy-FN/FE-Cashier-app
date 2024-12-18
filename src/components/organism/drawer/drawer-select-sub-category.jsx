/* eslint-disable react/prop-types */
import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../../ui/drawer";
import { Checkbox } from "../../ui/checkbox";
import { FormItem } from "../../ui/form";
import { Input } from "../../ui/input";

const DrawerSelectSubCategory = ({ allSubCategory, field }) => {
  return (
    <Drawer>
      <DrawerTrigger className="w-full">
        <Input
          placeholder={
            field?.value?.length > 0 ? `${field.value.length} Selected` : "Select Drawer"
          }
        />
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>Daftar Orderan</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-scroll no-scrollbar flex-1 flex flex-col gap-4 px-8">
          {allSubCategory?.data?.data?.map((items, index) => {
            return (
              <FormItem key={index} className="flex items-center gap-4 h-fit">
                <Checkbox
                  className="h-6 w-6"
                  checked={field?.value?.includes(items.id)} // Check if the id is in the array
                  onCheckedChange={(checked) => {
                    if (checked) {
                      // Add only the id to the value array
                      field?.onChange([...field.value, items.id]);
                    } else {
                      // Remove the id from the value array
                      field?.onChange(field.value.filter((value) => value !== items.id));
                    }
                  }}
                />

                <p className="-mt-8">{items.nameSubCategory}</p>
              </FormItem>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerSelectSubCategory;
