"use client";

import dynamic from "next/dynamic";

const MantraCentralClient = dynamic(
  () => import("./MantraCentralClient"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#08101E] flex flex-col items-center justify-center font-sans">
        <div className="w-12 h-12 border-4 border-[#FF7819]/20 border-t-[#FF7819] rounded-full animate-spin"></div>
        <p className="mt-4 text-[#FF7819] text-xs font-black tracking-widest uppercase animate-pulse">
          Initializing Secure Portal...
        </p>
      </div>
    ),
  }
);

export default function Page() {
  return <MantraCentralClient />;
}
