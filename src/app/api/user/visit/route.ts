import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    let userId: string | null = null;

    // Check body first
    try {
      const body = await request.json();
      if (body?.userId) userId = body.userId;
    } catch {
      // no JSON body
    }

    // If no userId in body, check server session
    if (!userId) {
      try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.id) userId = user.id;
      } catch {
        // failed to get session
      }
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "No authenticated user ID provided." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();
    const { data: userData, error: getUserError } = await admin.auth.admin.getUserById(userId);

    if (getUserError || !userData?.user) {
      return NextResponse.json(
        { success: false, error: getUserError?.message || "User not found." },
        { status: 404 }
      );
    }

    const currentMeta = userData.user.user_metadata || {};
    const currentVisits = typeof currentMeta.visit_count === "number" ? currentMeta.visit_count : 1;
    const nextVisits = currentVisits + 1;

    const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
      user_metadata: {
        ...currentMeta,
        visit_count: nextVisits,
        last_visited_at: new Date().toISOString(),
      },
    });

    if (updateError) {
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        userId,
        visitCount: nextVisits,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to track visit." },
      { status: 500 }
    );
  }
}
