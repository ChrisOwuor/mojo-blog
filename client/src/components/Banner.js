import { NavLink } from "react-router-dom";



import { XMarkIcon } from '@heroicons/react/20/solid'

export default function Example() {
  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden  px-6 py-1 sm:px-3.5 sm:before:flex-1 rounded-md">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-gray-900">
          <strong className="font-semibold">Intoducing Ai Creator </strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          You Can Now Create Your Content easily using our Ai{" "}
        </p>
        <NavLink to="/">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 mb-2">
            New For You
          </span>
        </NavLink>
      </div>
      <div className="flex flex-1 justify-end ">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon
            className="h-5 w-5 text-gray-900 sr-only"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
