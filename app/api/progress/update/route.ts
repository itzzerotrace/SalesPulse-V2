import {
  NextResponse,
} from "next/server";

import {
  getUserContext,
} from "@/lib/auth/userContext";
import {
  createClient,
} from "@/lib/supabase/server";
import {
  getActiveStore,
} from "@/lib/stores/activeStore";

function cleanNumber(
  value: FormDataEntryValue | null
) {
  const number =
    Number(value);

  if (
    !Number.isFinite(
      number
    ) ||
    number < 0
  ) {
    return 0;
  }

  return number;
}

export async function POST(
  request: Request
) {
  try {
    const context =
      await getUserContext();

    if (
      !context?.user ||
      !context.profile
    ) {
      return NextResponse.json(
        {
          error:
            "You must be logged in.",
        },
        {
          status: 401,
        }
      );
    }

    if (
      ![
        "manager",
        "regional_manager",
        "admin",
      ].includes(
        context.profile.role
      )
    ) {
      return NextResponse.json(
        {
          error:
            "You do not have permission to update employee progress.",
        },
        {
          status: 403,
        }
      );
    }

    const activeStore =
      await getActiveStore();

    if (
      !activeStore?.id
    ) {
      return NextResponse.json(
        {
          error:
            "No active store is selected.",
        },
        {
          status: 400,
        }
      );
    }

    const formData =
      await request.formData();

    const employeeId =
      String(
        formData.get(
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

    const supabase =
      await createClient();

    const {
      data: employee,
      error:
        employeeError,
    } = await supabase
      .from(
        "pending_employees"
      )
      .select(
        "id,store_id,status"
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
        "not_registered"
      )
      .maybeSingle();

    if (
      employeeError
    ) {
      return NextResponse.json(
        {
          error:
            employeeError.message,
        },
        {
          status: 500,
        }
      );
    }

    if (!employee) {
      return NextResponse.json(
        {
          error:
            "Pending employee was not found in the active store.",
        },
        {
          status: 404,
        }
      );
    }

    const {
      error:
        updateError,
    } = await supabase
      .from(
        "pending_employees"
      )
      .update({
        gp_progress:
          cleanNumber(
            formData.get(
              "gp_progress"
            )
          ),
        voice_progress:
          cleanNumber(
            formData.get(
              "voice_progress"
            )
          ),
        mim_progress:
          cleanNumber(
            formData.get(
              "mim_progress"
            )
          ),
        upgrade_progress:
          cleanNumber(
            formData.get(
              "upgrade_progress"
            )
          ),
        hsi_progress:
          cleanNumber(
            formData.get(
              "hsi_progress"
            )
          ),
        bts_progress:
          cleanNumber(
            formData.get(
              "bts_progress"
            )
          ),
        accessory_progress:
          cleanNumber(
            formData.get(
              "accessory_progress"
            )
          ),
        features_progress:
          cleanNumber(
            formData.get(
              "features_progress"
            )
          ),
      })
      .eq(
        "id",
        employeeId
      )
      .eq(
        "store_id",
        activeStore.id
      );

    if (updateError) {
      console.error(
        "PENDING PROGRESS SAVE ERROR:",
        updateError
      );

      return NextResponse.json(
        {
          error:
            updateError.message,
        },
        {
          status: 500,
        }
      );
    }

    const url =
      new URL(
        `/progress/${employeeId}`,
        request.url
      );

    url.searchParams.set(
      "saved",
      "1"
    );

    return NextResponse.redirect(
      url,
      303
    );
  } catch (
    error: any
  ) {
    console.error(
      "PROGRESS UPDATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to save employee progress.",
      },
      {
        status: 500,
      }
    );
  }
}
