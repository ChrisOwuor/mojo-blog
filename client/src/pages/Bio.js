import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import BlogBio from "../components/BlogBio";

export default function Profile() {
  let { AuthTokens, logoutUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    let getBlogs = async () => {
      let response = await fetch(`http://localhost:8000/auth/bio/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + String(AuthTokens.access),
        },
      });
      let data = await response.json();

      if (response.status === 200) {
        setData(data);
        console.log(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else if (response.statusText === "Unauthorized") {
        setError(error);
        setLoading(false);
        logoutUser();
      }
    };

    getBlogs();
  }, []);
  const isSmallScreen = window.innerWidth < 600;

  const dateFormat = isSmallScreen
    ? "DD/MM/YYYY"
    : "MMMM DD, YYYY [at] HH:mm:ss";
  return (
    <div className="lg:container mx-auto my-5  w-full p-5">
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
        <div className="md:flex  no-wrap md:-mx-2  ">
          {
            <>
              <div className="w-full md:w-3/12 md:mx-2">
                <div className="bg-white p-3 border-t-4 border-red-400">
                  <div className="image overflow-hidden rounded-md">
                    <img
                      className="h-auto w-full mx-auto"
                      src={`http://127.0.0.1:8000/${data.user_info.image}`}
                      alt=""
                    />
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                    {data.user_info.user_name}
                  </h1>

                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Member Since</span>
                      <span className="ml-auto">
                        <span className="bg-red-400 py-1 px-2 rounded text-white text-sm">
                          12/3/2014
                        </span>
                      </span>
                    </li>

                    <li className="flex items-center py-3">
                      <span>Country</span>
                      <span className="ml-auto"> {data.user_info.country}</span>
                    </li>
                  </ul>
                </div>
                <div className="my-4"></div>
              </div>
              <div className="w-full md:w-9/12 mx-2 h-64 ">
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Contact Section</span>
                  </div>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-1 text-sm w-3/5 ">
                      <div className="grid grid-cols-2 my-2">
                        <div className="px-1 py-2 font-semibold">Phone</div>
                        <div className="px-1 py-2 bg-gray-100 rounded-md w-max text-center">
                          {data.user_info.phone}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 my-2">
                        <div className="px-1 py-2 font-semibold ">Email</div>
                        <div className="px-1 py-2 bg-gray-100 rounded-md w-max text-center">
                          {data.user_info.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="grid grid-cols-1">
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span className="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">About Author</span>
                      </div>
                      <div className="list-inside space-y-2">
                        {data.user_info.bio}
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="grid grid-cols-1">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 font-semibold  text-gray-900 leading-8 mb-3">
                        <span className="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">
                          Author`s Blogs{" "}
                          <span className="font-bold">
                            ({data.total_blogs})
                          </span>
                        </span>
                      </div>
                      {data.blogs.map((blog) => (
                        <BlogBio key={blog.id} blog={blog} />
                      ))}
                    </div>
                  </div>
                </div>{" "}
              </div>
            </>
          }
        </div>
      )}
    </div>
  );
}
