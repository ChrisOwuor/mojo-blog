import React from "react";

export default function Payment() {
  return (
      <div class="p-4">
          <div class="relative ">
            <div class="absolute inset-y-0 left-1/2 -ml-[55vw] w-[110vw] bg-gradient-to-b from-white/100 shadow-slate-900/5 lg:hidden"></div>
            <div class="relative">
              
              <div class=" flex space-x-3 lg:mt-0">
                <h1 class="text-base font-semibold leading-6 text-sky-500">
                  All-access
                </h1>
                <span class="rounded-full bg-slate-300/25 px-3 text-xs font-semibold leading-6 text-slate-500">
                  Personal license
                </span>
              </div>
              <div class="mt-4 flex items-center space-x-3">
                <p class="text-4xl font-bold text-slate-900">$299.00</p>
                <p class="text-sm font-semibold text-slate-500">
                  one-time payment
                </p>
              </div>
              <p class="mt-6 text-base leading-7 text-slate-700">
                Includes access to all 500+ components and templates available
                in Tailwind UI today, plus all future updates.
              </p>
              <p class="mt-6 text-sm leading-6 text-slate-600">
                All prices in USD
              </p>

              <dl class="mt-16 hidden divide-y divide-slate-900/5 text-base leading-6 text-slate-700 lg:block">
                <div class="flex justify-between pb-4">
                  <dt>Subtotal</dt>
                  <dd class="font-semibold text-slate-900">$299.00</dd>
                </div>
                <div class="flex justify-between py-4">
                  <dt>Taxes</dt>
                  <dd class="text-slate-700">Calculated at next step</dd>
                </div>
                <div class="flex justify-between pt-4 font-semibold text-slate-900">
                  <dt>Total price</dt>
                  <dd>$299.00</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
  );
}
