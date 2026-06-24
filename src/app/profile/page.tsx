"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/demo");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#050505]">
      <div className="w-8 h-8 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}
