"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NetworkRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/profile?tab=network");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#060d08] flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        <div className="w-9 h-9 rounded-full border-2 border-[#c79e4d] border-t-transparent animate-spin mx-auto"></div>
        <p className="text-xs font-mono text-[#deb86d] uppercase tracking-widest">
          Loading Campus Student Network...
        </p>
      </div>
    </div>
  );
}
