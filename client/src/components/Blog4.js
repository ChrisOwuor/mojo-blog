import React from "react";
import { Link} from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
export default function Blog4 ({ blog,  Delete }) {
  return (
    <article class="py-6 w-full rounded-lg bg-slate-100 lg:p-4 p-6 h-max">
      <div class="flex items-center justify-between mb-3 text-gray-500"></div>
      <h2 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900  dark:text-white hover:underline">
        {blog.title}
      </h2>
      <p class="mb-5 text-gray-500 dark:text-gray-400">
        {blog.content.slice(0, 200)}.
      </p>
      <div class="flex items-center justify-between mb-1">
        <div className="flex gap-4 px-2">
          <p>
            {" "}
            <Link
              className="hover:cursor-pointer font-thin"
              to={`/edit/blog/${blog.uid}`}
            >
              <EditNoteIcon />{" "}
            </Link>
          </p>
          <button
            onClick={(e) => {
              Delete(e, blog.id);
            }}
          >
            <DeleteOutlineIcon
              fontSize="medium"
              className="hover:cursor-pointer"
            />
          </button>
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
