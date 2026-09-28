"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NetworkRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/profile?tab=network");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#fbf9f5] flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto"></div>
        <p className="text-xs font-mono text-slate-500">
          Loading Campus Student Network...
        </p>
      </div>
    </div>
  );
}
