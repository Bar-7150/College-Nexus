"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";

function PublicRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = searchParams.toString();
    router.replace(params ? `/profile?${params}` : "/profile");
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#060d08] flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        <div className="w-9 h-9 rounded-full border-2 border-[#c79e4d] border-t-transparent animate-spin mx-auto"></div>
        <p className="text-xs font-mono text-[#deb86d] uppercase tracking-widest">
          Loading Collegiate Public Profile...
        </p>
      </div>
    </div>
  );
}

export default function PublicPage() {
  return (
    <AuthGuard resourceName="KGEC Public Student Profile">
      <Suspense
      fallback={
        <div className="min-h-screen bg-[#060d08] flex items-center justify-center p-4">
          <div className="text-center space-y-3">
            <div className="w-9 h-9 rounded-full border-2 border-[#c79e4d] border-t-transparent animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-[#deb86d] uppercase tracking-widest">
              Loading Collegiate Public Profile...
            </p>
          </div>
        </div>
      }
    >
      <PublicRedirect />
      </Suspense>
    </AuthGuard>
  );
}
