import React from "react";

export default function HeroSkeleton() {
  return (
    <div className="flex flex-wrap gap-x-7 gap-y-9 justify-center animate-pulse">

      <div className="max-w-[1170px] w-full flex flex-col lg:flex-row lg:items-center gap-7.5 lg:gap-11  rounded-xl ">
        <div className="lg:max-w-[536px] w-full ">
          <p className="w-full aspect-auto object-cover rounded-m bg-gray-200 dark:bg-gray-700 rounded-lg lg:h-[300px] "></p>
        </div>
        <div className="lg:max-w-[540px] w-full h-full   ">
          <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>
          <h1 className="font-bold text-custom-4 w-3/4 xl:text-heading-4 text-dark mb-4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>
          <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>
          <h1 className="font-bold text-custom-4 w-3/4 xl:text-heading-4 text-dark mb-4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>{" "}
          <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>
          <h1 className="font-bold text-custom-4 w-3/4 xl:text-heading-4 text-dark mb-4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>
          <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4 w-12  h-12 bg-gray-200 dark:bg-gray-700 rounded-full ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>
        </div>
      </div>

      <div className="lg:max-w-[570px] w-full flex flex-col sm:flex-row sm:items-center gap-6  rounded-xl p-2.5">
        <div className="lg:max-w-[238px] w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg">
          <p className="w-full object-cover aspect-auto rounded-md"></p>
        </div>
        <div className="lg:max-w-[272px] w-full h-full ">
          <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>{" "}
          <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4 w-1/4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>{" "}
          <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4 w-3/4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>{" "}
          <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>
        </div>
      </div>

      <div className="lg:max-w-[570px] w-full flex flex-col sm:flex-row sm:items-center gap-6  rounded-xl p-2.5">
        <div className="lg:max-w-[238px] w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg">
          <p className="w-full object-cover aspect-auto rounded-md"></p>
        </div>
        <div className="lg:max-w-[272px] w-full h-full ">
          <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>{" "}
          <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4 w-1/4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>{" "}
          <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4 w-3/4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>{" "}
          <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4  h-4 bg-gray-200 dark:bg-gray-700 rounded-lg ">
            <p className="bg-gray-200 dark:bg-gray-700 rounded-lg "></p>
          </h1>
        </div>
      </div>
    </div>
  );
}
