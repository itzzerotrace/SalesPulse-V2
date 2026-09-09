import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";
import { ACTIVE_STORE_COOKIE } from "@/lib/stores/activeStore";

export async function POST(request: Request) {
  try {
    const context = await getUserContext();

    if (!context?.user || !context.profile) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    if (context.profile.role !== "manager") {
      return NextResponse.json(
        { error: "Store switching is only available to managers." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const storeId =
      typeof body.storeId === "string"
        ? body.storeId
        : "";

    if (!storeId) {
      return NextResponse.json(
        { error: "Store is required." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: assignment, error } = await supabase
      .from("manager_stores")
      .select("store_id")
      .eq("manager_id", context.user.id)
      .eq("store_id", storeId)
      .maybeSingle();

    if (error) {
      console.error("STORE SWITCH ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!assignment) {
      return NextResponse.json(
        { error: "You do not manage this store." },
        { status: 403 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set(
      ACTIVE_STORE_COOKIE,
      storeId,
      {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("SELECT STORE ERROR:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to switch stores.",
      },
      { status: 500 }
    );
  }
}
