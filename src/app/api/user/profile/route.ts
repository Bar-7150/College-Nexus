import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let userId = body?.userId;

    if (!userId) {
      try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.id) userId = user.id;
      } catch {
        // ignore
      }
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required to update profile." },
        { status: 401 }
      );
    }

    const {
      avatarUrl,
      fullName,
      pronouns,
      headline,
      location,
      about,
      department,
      batchYear,
    } = body;

    const admin = createAdminClient();
    const { data: userData, error: getUserError } = await admin.auth.admin.getUserById(userId);

    if (getUserError || !userData?.user) {
      return NextResponse.json(
        { success: false, error: getUserError?.message || "User not found." },
        { status: 404 }
      );
    }

    const currentMeta = userData.user.user_metadata || {};
    const updatedMeta = { ...currentMeta };

    if (avatarUrl !== undefined) updatedMeta.avatar_url = avatarUrl;
    if (fullName !== undefined) updatedMeta.full_name = fullName;
    if (pronouns !== undefined) updatedMeta.pronouns = pronouns;
    if (headline !== undefined) updatedMeta.headline = headline;
    if (location !== undefined) updatedMeta.location = location;
    if (about !== undefined) updatedMeta.about = about;
    if (department !== undefined) updatedMeta.department = department;
    if (batchYear !== undefined) updatedMeta.batch_year = batchYear;

    const { data: updatedUserData, error: updateError } = await admin.auth.admin.updateUserById(
      userId,
      { user_metadata: updatedMeta }
    );

    if (updateError) {
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated and saved to database.",
      data: {
        userId,
        avatarUrl: updatedMeta.avatar_url,
        user: updatedUserData.user,
      },
    });
  } catch (error: any) {
    console.error("POST /api/user/profile error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update profile." },
      { status: 500 }
    );
  }
}
