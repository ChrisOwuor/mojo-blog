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
        <p>Loading</p>
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
                      <span className="ml-auto">Kenya </span>
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam quo consequuntur eos placeat animi adipisci
                        consequatur doloribus ex odio deleniti!
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
