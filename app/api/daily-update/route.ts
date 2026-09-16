import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";
import { getActiveStore } from "@/lib/stores/activeStore";
import { getMonthInfo } from "@/lib/progress/date";
import {
  emptyProgressStats,
  progressMetrics,
} from "@/lib/progress/progress";

function cleanNumber(value: unknown) {
  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return 0;
  }

  return number;
}

function cleanStats(input: any) {
  const result: any = emptyProgressStats();

  for (const metric of progressMetrics) {
    result[metric.key] = cleanNumber(
      input?.[metric.key]
    );
  }

  return result;
}

export async function POST(request: Request) {
  try {
    const context = await getUserContext();

    if (!context?.user || !context.profile) {
      return NextResponse.json(
        {
          error: "You must be logged in.",
        },
        {
          status: 401,
        }
      );
    }

    const role = context.profile.role;

    if (
      role !== "manager" &&
      role !== "admin" &&
      role !== "regional_manager"
    ) {
      return NextResponse.json(
        {
          error:
            "You do not have permission to update store progress.",
        },
        {
          status: 403,
        }
      );
    }

    const activeStore = await getActiveStore();

    if (!activeStore?.id) {
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

    const body = await request.json();

    const statDate =
      typeof body.statDate === "string"
        ? body.statDate
        : "";

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(
        statDate
      )
    ) {
      return NextResponse.json(
        {
          error:
            "A valid update date is required.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      monthName,
      year,
    } = getMonthInfo(statDate);

    const supabase = await createClient();

    /*
     * ======================================================
     * STORE STATS
     * ======================================================
     */

    const storeStats = cleanStats(
      body.storeStats
    );

    const storeGoalsInput =
      body.storeGoals || {};

    const storeGoalRecord: any = {
      store_id: activeStore.id,
      month: monthName,
      year,
    };

    for (const metric of progressMetrics) {
      storeGoalRecord[metric.goalKey] =
        cleanNumber(
          storeGoalsInput[
            metric.goalKey
          ]
        );
    }

    const {
      error: storeGoalError,
    } = await supabase
      .from("store_goals")
      .upsert(
        storeGoalRecord,
        {
          onConflict:
            "store_id,month,year",
        }
      );

    if (storeGoalError) {
      console.error(
        "STORE GOAL SAVE ERROR:",
        storeGoalError
      );

      return NextResponse.json(
        {
          error:
            storeGoalError.message,
        },
        {
          status: 500,
        }
      );
    }

    const {
      error: storeStatsError,
    } = await supabase
      .from("store_daily_stats")
      .upsert(
        {
          store_id:
            activeStore.id,

          stat_date:
            statDate,

          ...storeStats,

          entered_by:
            context.user.id,
        },
        {
          onConflict:
            "store_id,stat_date",
        }
      );

    if (storeStatsError) {
      console.error(
        "STORE DAILY SAVE ERROR:",
        storeStatsError
      );

      return NextResponse.json(
        {
          error:
            storeStatsError.message,
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ======================================================
     * EMPLOYEES
     *
     * employeeType:
     *
     * profile = employee with login
     * tracked = imported employee without login
     * ======================================================
     */

    const employees =
      Array.isArray(body.employees)
        ? body.employees
        : [];

    if (employees.length > 0) {
      /*
       * ----------------------------------------------------
       * LOGIN EMPLOYEES
       * ----------------------------------------------------
       */

      const profileEmployees =
        employees.filter(
          (employee: any) =>
            employee.employeeType !==
            "tracked"
        );

      if (profileEmployees.length > 0) {
        const profileEmployeeIds =
          profileEmployees
            .map(
              (employee: any) =>
                employee.employeeId
            )
            .filter(Boolean);

        if (profileEmployeeIds.length > 0) {
          const {
            data: validEmployees,
            error: validEmployeeError,
          } = await supabase
            .from("profiles")
            .select("id")
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
            .in(
              "id",
              profileEmployeeIds
            );

          if (validEmployeeError) {
            console.error(
              "PROFILE EMPLOYEE VALIDATION ERROR:",
              validEmployeeError
            );

            return NextResponse.json(
              {
                error:
                  validEmployeeError.message,
              },
              {
                status: 500,
              }
            );
          }

          const validIds = new Set(
            (
              validEmployees || []
            ).map(
              (employee: any) =>
                employee.id
            )
          );

          const employeeRows =
            profileEmployees
              .filter(
                (employee: any) =>
                  validIds.has(
                    employee.employeeId
                  )
              )
              .map(
                (employee: any) => ({
                  employee_id:
                    employee.employeeId,

                  store_id:
                    activeStore.id,

                  stat_date:
                    statDate,

                  ...cleanStats(
                    employee.stats
                  ),

                  entered_by:
                    context.user.id,
                })
              );

          if (employeeRows.length > 0) {
            const {
              error:
                employeeStatsError,
            } = await supabase
              .from(
                "employee_daily_stats"
              )
              .upsert(
                employeeRows,
                {
                  onConflict:
                    "employee_id,stat_date",
                }
              );

            if (employeeStatsError) {
              console.error(
                "EMPLOYEE DAILY SAVE ERROR:",
                employeeStatsError
              );

              return NextResponse.json(
                {
                  error:
                    employeeStatsError.message,
                },
                {
                  status: 500,
                }
              );
            }
          }
        }
      }

      /*
       * ----------------------------------------------------
       * TRACKED / NON-LOGIN EMPLOYEES
       * ----------------------------------------------------
       */

      const trackedEmployees =
        employees.filter(
          (employee: any) =>
            employee.employeeType ===
            "tracked"
        );

      if (trackedEmployees.length > 0) {
        const trackedEmployeeIds =
          trackedEmployees
            .map(
              (employee: any) =>
                employee.employeeId
            )
            .filter(Boolean);

        if (
          trackedEmployeeIds.length > 0
        ) {
          const {
            data:
              validTrackedEmployees,
            error:
              trackedValidationError,
          } = await supabase
            .from(
              "tracked_employees"
            )
            .select(
              "id, store_id, status"
            )
            .eq(
              "store_id",
              activeStore.id
            )
            .eq(
              "status",
              "active"
            )
            .in(
              "id",
              trackedEmployeeIds
            );

          if (trackedValidationError) {
            console.error(
              "TRACKED EMPLOYEE VALIDATION ERROR:",
              trackedValidationError
            );

            return NextResponse.json(
              {
                error:
                  trackedValidationError.message,
              },
              {
                status: 500,
              }
            );
          }

          const validTrackedIds =
            new Set(
              (
                validTrackedEmployees ||
                []
              ).map(
                (employee: any) =>
                  employee.id
              )
            );

          const trackedRows =
            trackedEmployees
              .filter(
                (employee: any) =>
                  validTrackedIds.has(
                    employee.employeeId
                  )
              )
              .map(
                (employee: any) => ({
                  employee_id:
                    employee.employeeId,

                  store_id:
                    activeStore.id,

                  stat_date:
                    statDate,

                  ...cleanStats(
                    employee.stats
                  ),
                })
              );

          if (trackedRows.length > 0) {
            const {
              error:
                trackedStatsError,
            } = await supabase
              .from(
                "tracked_employee_daily_stats"
              )
              .upsert(
                trackedRows,
                {
                  onConflict:
                    "employee_id,stat_date",
                }
              );

            if (trackedStatsError) {
              console.error(
                "TRACKED EMPLOYEE DAILY SAVE ERROR:",
                trackedStatsError
              );

              return NextResponse.json(
                {
                  error:
                    trackedStatsError.message,
                },
                {
                  status: 500,
                }
              );
            }
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      store: activeStore.name,
      date: statDate,
    });
  } catch (error: any) {
    console.error(
      "DAILY UPDATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to save daily update.",
      },
      {
        status: 500,
      }
    );
  }
}
