import { redirect } from "next/navigation";
import React from "react";
import { getAuthUserDetails } from "@/lib/queries";
import { verifyAndAcceptInvitation } from "@/lib/queries";
import { Plan } from "@prisma/client";
import AgencyDetails from "@/components/forms/agency-details";
import { currentUser } from "@clerk/nextjs";

type Props = {
  searchParams: { plan: Plan; state: string; code: string };
};

const page = async ({ searchParams }: Props) => {
  const agencyId = await verifyAndAcceptInvitation();

  //get user details
  const user = await getAuthUserDetails();

  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      redirect("/subaccount");
    } else if (user?.role === "AGENCY_ADMIN" || user?.role === "AGENCY_OWNER") {
      if (searchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${searchParams.plan}`
        );
      }
      // for stripe later
      if (searchParams.state) {
        const statePath = searchParams.state.split("_")[0];
        const stateAgencyId = searchParams.state.split("3___")[1];
        if (!stateAgencyId) {
          return <div>Not authorized</div>;
        }
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        );
      } else {
        return redirect(`/agency/${agencyId}`);
      }
    } else {
      return <div>Not authorized</div>;
    }
  }

  // if current user/agency dont have any role at all
  const authUser = await currentUser();
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        <h1 className="text-4xl">Create An Agency</h1>
        <AgencyDetails
          data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
        />
      </div>
    </div>
  );
};

export default page;
