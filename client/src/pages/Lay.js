import React from "react";

export default function Lay() {
  return (
    <div className="grow">
      <div className="pt-8">
        <div className="flex justify-between mx-auto px-4 max-w-7xl bg-red-200 h-screen">
          <div className="hidden xl:block mb-6  lg:w-80 bg-slate-600 h-full"></div>
          <div className="w-full max-w-2xl mx-auto bg-yellow-500 h-80"></div>
          <aside className="hidden lg:block lg:w-80 bg-green-300 h-1/2"></aside>
        </div>
      </div>
    </div>
  );
}
