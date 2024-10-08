import React, { useMemo } from "react";

// import { MapPinPlus } from "lucide-react";
// import { Button } from "../../../components/ui/button";
// import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../../../../components/ui/breadcrumb";
// import { deleteLocation } from "../../../../services/location";
import TemplateContainer from "../../../../components/organism/template-container";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../../../components/organism/loading";
import { useMutation, useQuery } from "react-query";
import SkeletonTable from "../../../../components/organism/skeleton/skeleton-table";
import AbortController from "../../../../components/organism/abort-controller";
import { getUserByLocation, changeRoleUser } from "../../../../services/user";
// import DrawerDetailUser from "../../../../components/organism/drawer/drawer-detail-user";
import UserCard from "../../../../components/organism/card/user-card";
// import { useLoading } from "../../../../components/organism/loading";
import { toast } from "sonner";

const UserListByLocation = () => {
  const { state } = useLocation();
  const { setActive } = useLoading();

  // QUERY
  const allLocation = useQuery(
    ["get-all-user-location-table"],
    () => getUserByLocation({ location: state.location }),
    {
      retry: 0
    }
  );

  const mutateChangeRole = useMutation(changeRoleUser, {
    onMutate: () => setActive(true, null),
    onSuccess: () => {
      setActive(false, "success");
      setTimeout(() => {
        toast.success("Success", {
          description: "Successfull, Change Role User"
        });
      }, 1000);
      setTimeout(() => {
        allLocation.refetch();
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
    if (allLocation?.isLoading && allLocation?.isFetching && !allLocation?.isError) {
      return <SkeletonTable />;
    }

    if (allLocation?.isError) {
      return (
        <div className="p-4">
          <AbortController refetch={() => allLocation?.refetch()} />
        </div>
      );
    }

    if (allLocation?.data && allLocation?.isSuccess && !allLocation?.isError) {
      console.log("allLocation?.data?.data.length =>", allLocation?.data?.data.length);

      return allLocation?.data?.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allLocation?.data?.data?.map((user, index) => {
            return (
              <UserCard
                key={user.id}
                image={user.image}
                name={user.userName}
                address={user.address}
                location={user.location}
                phoneNumber={user.phoneNumber}
                role={allLocation?.data?.data[index].userType}
                onChangeRole={(val) => {
                  const body = {
                    location: user.location,
                    id: user.id,
                    userType: val
                  };
                  mutateChangeRole.mutate(body);
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-[65vh] flex justify-center flex-col items-center bg-gray-500 w-full rounded-lg gap-6 mt-4">
          <h1>Location Still Empty</h1>
          <p>Please Add New Location</p>
        </div>
      );
    }
  }, [allLocation]);

  return (
    <TemplateContainer>
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-[#6853F0] text-lg font-bold">User List</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <BreadcrumbLink href="/admin-page">Dashboard</BreadcrumbLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <BreadcrumbLink href="/my-teams-location-available">
                    User By Location
                  </BreadcrumbLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>User</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* List Member */}
        {TABLE_SHOW}
      </div>
    </TemplateContainer>
  );
};

export default UserListByLocation;
