import { NextResponse } from "next/server";

import { getUserContext } from "@/lib/auth/userContext";
import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";

const allowedRoles = [
  "manager",
  "regional_manager",
  "admin",
];

export async function POST(
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
            "You do not have permission to add employees.",
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

    const fullName =
      typeof body.fullName ===
      "string"
        ? body.fullName.trim()
        : "";

    const email =
      typeof body.email ===
        "string" &&
      body.email.trim()
        ? body.email
            .trim()
            .toLowerCase()
        : null;

    if (!fullName) {
      return NextResponse.json(
        {
          error:
            "Employee name is required.",
        },
        { status: 400 }
      );
    }

    const supabase =
      await createClient();

    if (email) {
      const {
        data:
          existingProfile,
      } = await supabase
        .from("profiles")
        .select(
          "id,full_name,store_id"
        )
        .ilike(
          "email",
          email
        )
        .maybeSingle();

      if (existingProfile) {
        return NextResponse.json(
          {
            error:
              "An account already exists with this email.",
          },
          { status: 409 }
        );
      }

      const {
        data:
          existingPending,
      } = await supabase
        .from(
          "pending_employees"
        )
        .select("id")
        .ilike(
          "email",
          email
        )
        .maybeSingle();

      if (existingPending) {
        return NextResponse.json(
          {
            error:
              "An employee has already been added with this email.",
          },
          { status: 409 }
        );
      }
    }

    const {
      data,
      error,
    } = await supabase
      .from(
        "pending_employees"
      )
      .insert({
        full_name: fullName,
        email,
        store_id: storeId,
        manager_id:
          context.user.id,
        role: "employee",
        status:
          "not_registered",
      })
      .select(`
        id,
        full_name,
        email,
        role,
        status,
        store_id,
        created_at
      `)
      .single();

    if (error) {
      console.error(
        "ADD PENDING EMPLOYEE ERROR:",
        error
      );

      if (
        error.code === "23505"
      ) {
        return NextResponse.json(
          {
            error:
              "An employee has already been added with this email.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          error:
            error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        employee: data,
        store: activeStore,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      "ADD EMPLOYEE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to add employee.",
      },
      { status: 500 }
    );
  }
}
