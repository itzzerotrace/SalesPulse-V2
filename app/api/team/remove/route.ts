import { NextResponse } from "next/server";

import { getUserContext } from "@/lib/auth/userContext";
import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";

const allowedRoles = [
  "manager",
  "regional_manager",
  "admin",
];

export async function DELETE(
  request: Request
) {
  try {
    const context =
      await getUserContext();

    if (
      !context?.user ||
      !context?.profile
    ) {
      return NextResponse.json(
        {
          error:
            "You must be logged in.",
        },
        { status: 401 }
      );
    }

    if (
      !allowedRoles.includes(
        context.profile.role
      )
    ) {
      return NextResponse.json(
        {
          error:
            "You do not have permission to remove employees.",
        },
        { status: 403 }
      );
    }

    const activeStore =
      await getActiveStore();

    const storeId =
      activeStore?.id;

    if (!storeId) {
      return NextResponse.json(
        {
          error:
            "No active store is selected.",
        },
        { status: 400 }
      );
    }

    const body =
      await request.json();

    const employeeId =
      typeof body.employeeId ===
      "string"
        ? body.employeeId.trim()
        : "";

    const registered =
      body.registered === true;

    if (!employeeId) {
      return NextResponse.json(
        {
          error:
            "Employee ID is required.",
        },
        { status: 400 }
      );
    }

    const supabase =
      await createClient();

    if (registered) {
      const {
        data: employee,
        error: employeeError,
      } = await supabase
        .from("profiles")
        .select(
          "id,full_name,role,status,store_id"
        )
        .eq("id", employeeId)
        .eq("store_id", storeId)
        .eq("role", "employee")
        .maybeSingle();

      if (employeeError) {
        console.error(
          "REMOVE EMPLOYEE LOOKUP ERROR:",
          employeeError
        );

        return NextResponse.json(
          {
            error:
              employeeError.message,
          },
          { status: 500 }
        );
      }

      if (!employee) {
        return NextResponse.json(
          {
            error:
              "Employee was not found in the selected store.",
          },
          { status: 404 }
        );
      }

      const {
        error: updateError,
      } = await supabase
        .from("profiles")
        .update({
          status: "inactive",
        })
        .eq("id", employeeId)
        .eq("store_id", storeId)
        .eq("role", "employee");

      if (updateError) {
        console.error(
          "REMOVE ACTIVE EMPLOYEE ERROR:",
          updateError
        );

        return NextResponse.json(
          {
            error:
              updateError.message,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message:
          `${employee.full_name} was removed from the team.`,
      });
    }

    const {
      data: pendingEmployee,
      error: pendingLookupError,
    } = await supabase
      .from("pending_employees")
      .select(
        "id,full_name,store_id"
      )
      .eq("id", employeeId)
      .eq("store_id", storeId)
      .maybeSingle();

    if (pendingLookupError) {
      console.error(
        "REMOVE PENDING LOOKUP ERROR:",
        pendingLookupError
      );

      return NextResponse.json(
        {
          error:
            pendingLookupError.message,
        },
        { status: 500 }
      );
    }

    if (!pendingEmployee) {
      return NextResponse.json(
        {
          error:
            "Pending employee was not found in the selected store.",
        },
        { status: 404 }
      );
    }

    const {
      error: deleteError,
    } = await supabase
      .from("pending_employees")
      .delete()
      .eq("id", employeeId)
      .eq("store_id", storeId);

    if (deleteError) {
      console.error(
        "REMOVE PENDING EMPLOYEE ERROR:",
        deleteError
      );

      return NextResponse.json(
        {
          error:
            deleteError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        `${pendingEmployee.full_name} was removed from the team.`,
    });
  } catch (error: any) {
    console.error(
      "REMOVE EMPLOYEE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to remove employee.",
      },
      { status: 500 }
    );
  }
}
