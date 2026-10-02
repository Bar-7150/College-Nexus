import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let userId = body?.userId;

    if (!userId) {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) userId = user.id;
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required to submit verification." },
        { status: 401 }
      );
    }

    const { fullName, rollNumber, college, department } = body;

    const admin = createAdminClient();
    const { data: userData, error: getUserError } = await admin.auth.admin.getUserById(userId);
    if (getUserError || !userData?.user) {
      return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });
    }

    const currentMeta = userData.user.user_metadata || {};

    const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
      user_metadata: {
        ...currentMeta,
        full_name: fullName || currentMeta.full_name,
        roll_number: rollNumber || currentMeta.roll_number,
        college: college || "Kalyani Government Engineering College",
        department: department || currentMeta.department || "CSE",
        verification_status: "Pending",
        verification_requested_at: new Date().toISOString(),
      },
    });

    if (updateError) {
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Verification request submitted successfully.",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
