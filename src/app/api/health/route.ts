import { NextResponse } from "next/server";
import { testCloudinaryConnection } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET() {
  const cloudinaryStatus = await testCloudinaryConnection();

  return NextResponse.json({
    success: true,
    server: {
      status: "online",
      framework: "Next.js 14 App Router API",
      timestamp: new Date().toISOString(),
    },
    storage: {
      provider: "Cloudinary",
      connected: cloudinaryStatus.ok,
      cloud_name: cloudinaryStatus.cloudName,
      message: cloudinaryStatus.message,
    },
    express_server_url: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000",
  });
}
