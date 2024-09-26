import React from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
// import { useTranslation } from "react-i18next";
import { useLoading } from "../../../components/organism/loading";
import { Button } from "../../../components/ui/button";
import { Percent } from "lucide-react";
import DialogCancelForm from "../../../components/organism/dialog/dialogCancelForm";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import { addDiscount, editDiscount } from "../../../services/discount";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import TemplateContainer from "../../../components/organism/template-container";
import { useCookies } from "react-cookie";

const FormDiscount = () => {
  const { state } = useLocation();
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const { setActive } = useLoading();
  const formSchema = z.object({
    description: z.string().min(4, {
      message: "Name Store must be at least 4 characters."
    }),
    percentage: z.string().min(1, {
      message: "Address must be at least 1 characters."
    }),
    isActive: z.boolean()
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: state?.data?.description ?? "",
      percentage: state?.data?.percentage.replace("%", "") ?? "",
      isActive: state?.data?.isActive ?? true
    }
  });

  // QUERY
  const mutateAddDiscount = useMutation(addDiscount, {
    onMutate: () => setActive(true, null),
    onSuccess: () => {
      setActive(false, "success");
      setTimeout(() => {
        toast.success("Success", {
          description: "Successfull, Added New Discount"
        });
      }, 1000);
      setTimeout(() => {
        navigate("/discount-list");
        setActive(null, null);
      }, 2000);
    },
    onError: (err) => {
      setActive(false, "error");
      setTimeout(() => {
        toast.error("Failed Add New Discount", {
          description: err.message
        });
      }, 1500);
      setTimeout(() => {
        setActive(null, null);
      }, 2000);
    }
  });

  const mutateEditDiscount = useMutation(editDiscount, {
    onMutate: () => setActive(true, null),
    onSuccess: () => {
      setActive(false, "success");
      setTimeout(() => {
        toast.success("Success", {
          description: "Successfull, Edit Discount"
        });
      }, 1000);
      setTimeout(() => {
        navigate("/discount-list");
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
        description: values?.description,
        percentage: values?.percentage,
        isActive: values?.isActive,
        createdBy: state?.data?.createdBy,
        modifiedBy: cookie.user.userName
      };
      mutateEditDiscount.mutate(body);
    } else {
      const body = {
        description: values?.description,
        percentage: values?.percentage,
        isActive: values?.isActive,
        createdBy: cookie.user.userName
      };

      mutateAddDiscount.mutate(body);
    }
  };

  return (
    <TemplateContainer>
      <main className="border-t-2 border-[#ffffff10] overflow-scroll flex flex-col h-screen p-4 gap-6">
        <div className="flex items-center gap-4">
          <Percent className="w-6 h-6" />
          <p>Add Discount</p>
        </div>

        <div className="w-full lg:w-3/4 mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 overflow-scroll h-screen">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Description</FormLabel>
                    </div>
                    <Input type="text" {...field} />
                    {form.formState.errors.description && (
                      <FormMessage>{form.formState.errors.description}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center gap-4">
                <FormField
                  control={form.control}
                  name="percentage"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="mb-4">
                        <FormLabel className="text-base">Percentage</FormLabel>
                      </div>
                      <Input type="text" {...field} />
                      {form.formState.errors.percentage && (
                        <FormMessage>{form.formState.errors.percentage}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="mb-4">
                        <FormLabel className="text-base">Is Active</FormLabel>
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
      </main>
    </TemplateContainer>
  );
};

export default FormDiscount;