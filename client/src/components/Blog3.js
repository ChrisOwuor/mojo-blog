import React from "react";
import { Link } from "react-router-dom";

export default function Blog3({ blog }) {
  return (
    <article class="py-6 w-full rounded-lg bg-slate-100 p-4 h-max">
      <div class="flex items-center justify-between mb-3 text-gray-500">
        <div>
          <p class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 mb-2">
            # <span>{blog.category}</span>
          </p>
        </div>
      </div>
      <h2 class="mb-2 text-2xl font-semibold tracking-tight h-16 text-gray-900   dark:text-white hover:underline">
        {blog.title.slice(0,90)}
      </h2>
      <p class="mb-5 text-gray-500 dark:text-gray-400">
        {blog.content.slice(0, 200)}....
      </p>
      <div class="flex items-center justify-between mb-1">
        <div class="flex items-center space-x-2">
          <img
            class="rounded-full w-16 h-16 object-cover"
            src={`http://127.0.0.1:8000${blog.profile}`}
            alt="Rich Klein profile_picture"
          />
          <span class="font-medium dark:text-white">{blog.creator}</span>
        </div>
        <Link
          class="inline-flex items-center font-medium text-blue-600 hover:underline dark:text-blue-500"
          to={`/single/${blog.uid}`}
        >
          Read more
          <svg
            class="w-4 h-4 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </article>
  );
}
