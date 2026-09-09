import {
  NextResponse,
} from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";
import { getActiveStore } from "@/lib/stores/activeStore";
import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

function numberValue(
  value: FormDataEntryValue | null
) {
  const parsed =
    Number(value || 0);

  if (
    !Number.isFinite(
      parsed
    ) ||
    parsed < 0
  ) {
    return 0;
  }

  return parsed;
}

export async function POST(
  request: Request
) {
  try {
    const form =
      await request.formData();

    const employeeId =
      String(
        form.get(
          "employee_id"
        ) || ""
      );

    if (!employeeId) {
      return NextResponse.json(
        {
          error:
            "Employee is required.",
        },
        {
          status: 400,
        }
      );
    }

    const context =
      await getUserContext();

    if (
      !context?.user ||
      !context.profile
    ) {
      return NextResponse.json(
        {
          error:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const allowedRoles = [
      "manager",
      "regional_manager",
      "admin",
    ];

    if (
      !allowedRoles.includes(
        context.profile.role
      )
    ) {
      return NextResponse.json(
        {
          error:
            "You do not have permission to update goals.",
        },
        {
          status: 403,
        }
      );
    }

    const activeStore =
      await getActiveStore();

    if (!activeStore?.id) {
      return NextResponse.json(
        {
          error:
            "No active store selected.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      await createClient();

    const {
      data: employee,
      error:
        employeeError,
    } = await supabase
      .from("profiles")
      .select(
        "id,full_name,store_id,role"
      )
      .eq(
        "id",
        employeeId
      )
      .eq(
        "store_id",
        activeStore.id
      )
      .eq(
        "status",
        "approved"
      )
      .eq(
        "role",
        "employee"
      )
      .maybeSingle();

    if (
      employeeError ||
      !employee
    ) {
      return NextResponse.json(
        {
          error:
            "Employee was not found in the active store.",
        },
        {
          status: 404,
        }
      );
    }

    const date =
      getCaliforniaDate();

    const {
      monthName,
      year,
    } = getMonthInfo(
      date
    );

    const goalData = {
      employee_id:
        employeeId,
      employee_name:
        employee.full_name,
      month:
        monthName,
      year,
      gp_goal:
        numberValue(
          form.get(
            "gp_goal"
          )
        ),
      voice_goal:
        numberValue(
          form.get(
            "voice_goal"
          )
        ),
      mim_goal:
        numberValue(
          form.get(
            "mim_goal"
          )
        ),
      upgrade_goal:
        numberValue(
          form.get(
            "upgrade_goal"
          )
        ),
      hsi_goal:
        numberValue(
          form.get(
            "hsi_goal"
          )
        ),
      bts_goal:
        numberValue(
          form.get(
            "bts_goal"
          )
        ),
      accessory_goal:
        numberValue(
          form.get(
            "accessory_goal"
          )
        ),
      features_goal:
        numberValue(
          form.get(
            "features_goal"
          )
        ),
    };

    const {
      error,
    } = await supabase
      .from(
        "employee_goals"
      )
      .upsert(
        goalData,
        {
          onConflict:
            "employee_id,month,year",
        }
      );

    if (error) {
      console.error(
        "EMPLOYEE GOAL SAVE ERROR:",
        error
      );

      return NextResponse.json(
        {
          error:
            error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.redirect(
      new URL(
        "/team",
        request.url
      ),
      303
    );
  } catch (error: any) {
    console.error(
      "EMPLOYEE GOAL UPDATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to update employee goals.",
      },
      {
        status: 500,
      }
    );
  }
}
