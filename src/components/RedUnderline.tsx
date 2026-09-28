import React from "react";

export default function RedUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-full h-2.5 sm:h-3 text-[#b93a32] block overflow-visible ${className}`}
      viewBox="0 0 280 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={{ maxHeight: "12px" }}
    >
      <path
        d="M2.5 7.2C38.8 4.6 112.5 3.5 178.4 5.9C218.6 7.4 254.8 8.1 275.2 5.5C277.8 5.2 277.4 8.5 266.3 9.4C212.1 13.5 131.8 11.2 58.7 9.8C31.5 9.3 11.4 8.8 2.5 7.2Z"
        fill="#b93a32"
      />
    </svg>
  );
}
