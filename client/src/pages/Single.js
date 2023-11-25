import React, { useContext, useEffect, useState } from "react";
import Comment from "../components/Comment";
import Feedback from "../components/Feedback";
import { NavLink, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";
const moment = require("moment");

export default function Single() {
  const { id } = useParams();

  let {  user, logoutUser, data } = useContext(AuthContext);
  const [datasingle, setdatasingle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let getBlogs = async () => {
    let response = await fetch(`http://localhost:8000/api/blogs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + String(AuthTokens.access),
      },
    });
    let datasingle = await response.json();

    if (response.status === 200) {
      setdatasingle(datasingle[0]);
      setLoading(false);
    } else if (response.statusText === "Unauthorized") {
      setError(error);
      setLoading(false);
      logoutUser();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getBlogs();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isSmallScreen = window.innerWidth < 600;
  console.log(loading);
  const dateFormat = isSmallScreen
    ? "DD/MM/YYYY"
    : "MMMM DD, YYYY [at] HH:mm:ss";

  return (
    <div className="pageelem w-full flex justify-center">
      {loading ? (
        <div class="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="w-5/6 mx-auto px-4 sm:px-8 xl:px-0  pb-8">
          <div className="w-full  mx-auto text-center ">
            <div className="flex justify-center gap-4">
              {" "}
              <Link
                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 mb-2"
                to={`/blogs/${datasingle.category}`}
              >
                # {datasingle.category}
              </Link>
              <p
                className={`${
                  !datasingle.is_premium && "hidden"
                }  bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 mb-2`}
              >
                {" "}
                {datasingle.is_premium && "Premium"}
              </p>
            </div>
            <h1 className="font-bold text-xl mx-auto lg:w-5/6 sm:text-4xl lg:text-custom-2 text-dark mb-5">
              {datasingle.title}{" "}
            </h1>
            <p> </p>
            <div className="flex items-center justify-center gap-4 mt-7.5">
              <div
                className={`${
                  !datasingle.profile ? "hidden" : "flex"
                } w-12 h-12 rounded-full overflow-hidden`}
              >
                <img
                  src={`http://127.0.0.1:8000/${datasingle.profile}`}
                  alt="user"
                />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-custom-lg text-dark mb-1">
                  {datasingle.creator}{" "}
                  <span>
                    <NavLink
                      to={`/bio/${datasingle.creator_uid}`}
                      className="text-blue-700 text-sm hover:underline ease-in duration-500"
                    >
                      Read Bio
                    </NavLink>
                  </span>
                </h4>
                <div className="flex items-center gap-1.5">
                  <p> {moment(datasingle.created_at).format(dateFormat)} </p>
                  <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                  <p>1 min read</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              !datasingle.image
                ? "hidden"
                : "flex mb-12 lg:w-4/6 mx-auto rounded-lg  w-full justify-center"
            }`}
          >
            <img
              src={`http://127.0.0.1:8000/${datasingle.image}`}
              alt="blog"
              className="mt-10 mb-11"
            />
          </div>
          <div className="max-w-[770px] mx-auto">
            {user ? (
              <>
                {" "}
                <>
                  {datasingle.is_premium && data.premium && (
                    <div>
                      <p className="mb-5 text-body">{datasingle.content}</p>
                      <p>{"premium content for premium user"}</p>
                      <div></div>
                    </div>
                  )}
                </>
                <>
                  {datasingle.is_premium && !data.premium && (
                    <div>
                      <p className="mb-5 text-body">
                        {datasingle.content.slice(0, 100)}
                      </p>
                      <p>premium content only for premium user</p>
                      <div></div>
                    </div>
                  )}
                </>{" "}
                <>
                  {!datasingle.is_premium && !data.premium && (
                    <div>
                      <p className="mb-5 text-body">{datasingle.content}</p>
                      <p>free content for non premium user</p>
                      <div></div>
                    </div>
                  )}
                </>{" "}
                <>
                  {!datasingle.is_premium && data.premium && (
                    <div>
                      <p className="mb-5 text-body">{datasingle.content}</p>
                      <p>free content for a premium user</p>
                      <div></div>
                    </div>
                  )}
                </>
              </>
            ) : (
              <div>
                <p className="mb-5 text-body">
                  {datasingle.is_premium
                    ? datasingle.content.slice(0, 150)
                    : datasingle.content.slice(0)}
                </p>
                <p className="mt0-12">
                  {datasingle.is_premium
                    ? " create account and Upgrade to premium to view premium content"
                    : "Login to view all blog"}
                </p>
              </div>
            )}
          </div>
          <Feedback like={datasingle.likes} blog_uuid={datasingle.uid} />
          <Comment
            comment={datasingle.comments}
            no={datasingle.comments_no}
            blog_uuid={datasingle.uid}
              getBlogs={getBlogs}
              data ={datasingle}
          />
        </div>
      )}
    </div>
  );
}
