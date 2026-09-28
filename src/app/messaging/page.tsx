"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function MessagingRedirect() {
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
    <div className="min-h-screen bg-[#fbf9f5] flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto"></div>
        <p className="text-xs font-mono text-slate-500">
          Routing to Campus Messenger...
        </p>
      </div>
    </div>
  );
}

export default function MessagingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf9f5] flex items-center justify-center p-4">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-slate-500">
              Routing to Campus Messenger...
            </p>
          </div>
        </div>
      }
    >
      <MessagingRedirect />
    </Suspense>
  );
}
