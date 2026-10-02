import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const admin = createAdminClient();

    // 1. Fetch real student/user count from Supabase Auth
    let userCount = 0;
    try {
      const { data: usersData, error: usersError } = await admin.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
      });
      if (!usersError && usersData?.users) {
        userCount = usersData.users.length;
      }
    } catch (e) {
      console.error("Error fetching user count from Supabase:", e);
    }

    // 2. Fetch real approved vault resources count from Supabase
    let vaultCount = 0;
    try {
      const { count, error: vaultError } = await admin
        .from("vault_resources")
        .select("id", { count: "exact", head: true })
        .eq("status", "APPROVED");

      if (!vaultError && typeof count === "number") {
        vaultCount = count;
      }
    } catch (e) {
      console.error("Error fetching vault count from Supabase:", e);
    }

    return NextResponse.json({
      success: true,
      userCount,
      vaultCount,
      departmentCount: 6,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: message, userCount: 0, vaultCount: 0 },
      { status: 500 }
    );
  }
}
