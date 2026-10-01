"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";

function MessageRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const user = searchParams.get("user");
    if (user) {
      router.replace(`/messages?user=${user}`);
    } else {
      router.replace("/messages");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#070e0a] flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        <div className="w-9 h-9 rounded-full border-2 border-[#c79e4d] border-t-transparent animate-spin mx-auto"></div>
        <p className="text-xs font-mono text-[#deb86d] tracking-widest uppercase">
          Routing to Campus Messenger...
        </p>
      </div>
    </div>
  );
}

export default function MessagePage() {
  return (
    <AuthGuard resourceName="KGEC Campus Messenger">
      <Suspense
      fallback={
        <div className="min-h-screen bg-[#070e0a] flex items-center justify-center p-4">
          <div className="text-center space-y-3">
            <div className="w-9 h-9 rounded-full border-2 border-[#c79e4d] border-t-transparent animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-[#deb86d] tracking-widest uppercase">
              Routing to Campus Messenger...
            </p>
          </div>
        </div>
      }
    >
      <MessageRedirect />
      </Suspense>
    </AuthGuard>
  );
}
