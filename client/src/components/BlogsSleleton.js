import React from "react";

export default function BlogsSleleton() {
  return (
    <article class="py-6 w-full rounded-lg bg-slate-100 p-4 h-72 aspect-video ">
      <div class="flex items-center justify-between mb-3 text-gray-500">
        <div>
          <p class=" text-sm font-medium mr-2 px-14 py-0.5 w-full h-4  mb-2 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <span></span>
          </p>
        </div>
      </div>
      <h2 class="mb-2 text-2xl h-6 font-bold tracking-tight bg-gray-200 dark:bg-gray-700 rounded-lg ">
        <p></p>
      </h2>
      <h2 class="mb-2 text-2xl h-6 font-bold tracking-tight bg-gray-200 w-3/5 dark:bg-gray-700 rounded-lg ">
        <p></p>
      </h2>
      <p class=" h-3 mt-5 bg-gray-200 dark:bg-gray-700 rounded-lg"></p>
      <p class=" h-3 mt-2  bg-gray-200 dark:bg-gray-700 w-3/5 rounded-lg"></p>
      <p class=" h-3 mt-2 bg-gray-200 dark:bg-gray-700 w-2/5 rounded-lg"></p>

      <div class="flex items-center justify-between mb-1">
        <p class="flex items-center h-12 w-12 mt-5 space-x-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <p />
          <span class="font-medium dark:text-white"></span>
        </p>
        <p class="inline-flex items-center font-medium text-blue-600 hover:underline dark:text-blue-500"></p>
      </div>
    </article>
  );
}
