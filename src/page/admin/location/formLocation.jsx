/* eslint-disable no-unused-vars */
import React from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useLoading } from "../../../components/organism/loading";
import { Button } from "../../../components/ui/button";
import { MapPinPlus } from "lucide-react";
import DialogCancelForm from "../../../components/organism/dialog/dialogCancelForm";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import { addLocation, editLocation } from "../../../services/location";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import TemplateContainer from "../../../components/organism/template-container";
import { useCookies } from "react-cookie";

const FormLocation = () => {
  const { state } = useLocation();
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const { setActive } = useLoading();
  const formSchema = z.object({
    nameStore: z.string().min(4, {
      message: "Name Store must be at least 4 characters."
    }),
    address: z.string().min(4, {
      message: "Address must be at least 4 characters."
    }),
    detailLocation: z.string().min(4, {
      message: "Address must be at least 4 characters."
    }),
    phoneNumber: z.string().min(4, {
      message: "Address must be at least 4 characters."
    }),
    status: z.boolean()
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameStore: state?.data?.nameStore ?? "",
      address: state?.data?.address ?? "",
      detailLocation: state?.data?.detailLocation ?? "",
      phoneNumber: state?.data?.phoneNumber ?? "",
      status: state?.data?.status ?? true
    }
  });

  // QUERY
  const mutateAddLocation = useMutation(addLocation, {
    onMutate: () => setActive(true, null),
    onSuccess: (success) => {
      setActive(false, "success");
      setTimeout(() => {
        toast.success("Success", {
          description: "Successfull, Added New Location"
        });
      }, 1000);
      setTimeout(() => {
        navigate("/location-list");
        setActive(null, null);
      }, 2000);
    },
    onError: (err) => {
      setActive(false, "error");
      setTimeout(() => {
        toast.error("Failed Login", {
          description: err.message
        });
      }, 1500);
      setTimeout(() => {
        setActive(null, null);
      }, 2000);
    }
  });

  const mutateEditLocation = useMutation(editLocation, {
    onMutate: () => setActive(true, null),
    onSuccess: (success) => {
      setActive(false, "success");
      setTimeout(() => {
        toast.success("Success", {
          description: "Successfull, Edit Location"
        });
      }, 1000);
      setTimeout(() => {
        navigate("/location-list");
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

  const onSubmit = (values) => {
    if (state?.data?.id) {
      const body = {
        id: state?.data?.id,
        nameStore: values?.nameStore,
        address: values?.address,
        detailLocation: values?.detailLocation,
        phoneNumber: values?.phoneNumber,
        status: true,
        createdBy: state?.data?.createdBy,
        modifiedBy: cookie.user.userName
      };
      mutateEditLocation.mutate(body);
    } else {
      const body = {
        nameStore: values?.nameStore,
        address: values?.address,
        detailLocation: values?.detailLocation,
        phoneNumber: values?.phoneNumber,
        status: true,
        createdBy: cookie.user.userName
      };

      mutateAddLocation.mutate(body);
    }
  };

  return (
    <TemplateContainer>
      <div className="flex items-center gap-4 p-4">
        <MapPinPlus className="w-6 h-6" />
        <p>Add Location</p>
      </div>

      <div className="w-full lg:w-3/4 mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
            <FormField
              control={form.control}
              name="nameStore"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Name Store</FormLabel>
                  </div>
                  <Input type="text" {...field} />
                  {form.formState.errors.nameStore && (
                    <FormMessage>{form.formState.errors.nameStore}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Address</FormLabel>
                  </div>
                  <Input type="text" {...field} />
                  {form.formState.errors.address && (
                    <FormMessage>{form.formState.errors.address}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detailLocation"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Detail Location</FormLabel>
                  </div>
                  <Input type="text" {...field} />
                  {form.formState.errors.detailLocation && (
                    <FormMessage>{form.formState.errors.detailLocation}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center gap-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="mb-4">
                      <FormLabel className="text-base">Phone Number</FormLabel>
                    </div>
                    <Input type="text" {...field} />
                    {form.formState.errors.phoneNumber && (
                      <FormMessage>{form.formState.errors.phoneNumber}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="mb-4">
                      <FormLabel className="text-base">Status</FormLabel>
                    </div>
                    <div className="flex items-center gap-6">
                      <p>Not Active</p>
                      <Switch
                        name={field.name}
                        id={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <p>Active</p>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between items-center">
              <DialogCancelForm
                handleBack={() => navigate("/location-list")}
                classNameButtonTrigger="text-[#CECECE] bg-transparent font-semibold hover:text-[#1ACB0A] text-lg hover:bg-transparent"
                titleDialog="Apakah Anda Ingin Membatalkan Ini"
                titleButtonTrigger="Cancel"
              />
              <Button
                className="py-2 px-4 w-fit bg-[#6853F0] rounded-full text-white font-bold text-lg hover:bg-[#1ACB0A] duration-200"
                type="submit">
                Yes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </TemplateContainer>
  );
};

export default FormLocation;
