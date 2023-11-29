import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";

import { NavLink, useParams } from "react-router-dom";
import Blog4 from "../components/Blog4";
import PayModal from "../components/PayModal";

export default function Profile() {
  let { AuthTokens, logoutUser, user, data } = useContext(AuthContext);
  const [data_p, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  let getBlogs = async () => {
    let response = await fetch(`http://localhost:8000/auth/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(AuthTokens.access),
      },
    });
    let data_p = await response.json();

    if (response.status === 200) {
      setData(data_p);
      setLoading(false);
    } else if (response.statusText === "Unauthorized") {
      setError(error);
      setLoading(false);
      logoutUser();
    }
  };

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Edit = async (e, id) => {
    e.preventDefault();

    console.log(id);
    const comment_to_edit = data_p[2].blogs.find((blog) => blog.id === id);
    console.log(comment_to_edit);
  };
  const Delete = async (e, id) => {
    e.preventDefault();

    const blog_to_del = data_p[2].blogs.find((blog) => blog.id === id);
    console.log(blog_to_del);
    try {
      let response = await fetch(
        `http://localhost:8000/api/blog/action/${blog_to_del.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(AuthTokens.access),
          },
        }
      );

      if (response.status === 204) {
        setLoading(false);
        getBlogs();
        console.log("Comment deleted successfully");
      } else if (response.statusText === "Unauthorized") {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="lg:container mx-auto my-5  w-full p-5">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="md:flex  no-wrap md:-mx-2  ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-red-400">
              <div className="image overflow-hidden w-4/5 mx-auto rounded-md">
                <img
                  src={`http://127.0.0.1:8000/${data_p[0].user_data.image}`}
                  className="h-auto w-full mx-auto object-cover"
                  alt=""
                />
              </div>
              <h1 className=" leading-8 my-1 bg-gray-100 py-2  lg:px-2 px-1  mt-3 rounded text-gray-800 text-lg">
                {data_p[0].user_data.user_name}
              </h1>

              <ul className="  py-2  mt-3  ">
                <li className="flex items-center bg-gray-100 py-2 rounded-sm px-1 text-gray-600 hover:text-gray-700 hover:bg-slate-200 ">
                  <span>Membership</span>
                  <span className="ml-auto">
                    <p className="bg-red-400 py-1  lg:px-2 px-1 rounded text-white text-sm">
                      {data_p[1].premium ? (
                        "Premium "
                      ) : (
                        <PayModal
                          id={data_p[0].user_data.id}
                          no={data_p[0].user_data.phone}
                        />
                      )}
                    </p>
                  </span>
                </li>
                <li>
                  {" "}
                  <NavLink
                    className="w-max"
                    to={`/edit/user/${data_p[0].user_data.id}/${data_p[0].user_data.uid}`}
                  >
                    <p className="bg-gray-100 py-2  lg:px-2 px-1  mt-3 rounded-sm text-gray-600 text-lg hover:bg-slate-200">
                      Update Profile
                    </p>
                  </NavLink>{" "}
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
                <span className="tracking-wide">Demographics</span>
              </div>
              <div className="text-gray-700  lg:w-auto w-3/5">
                <div className="grid md:grid-cols-1 text-sm ">
                  <div
                    className={` grid-cols-2 my-2 ${
                      data_p[0].user_data.gender.length < 1 ? "hidden" : "grid"
                    }`}
                  >
                    <div className="px-1 py-2 font-semibold">Gender</div>
                    <div className="px-1 py-2 bg-gray-100 rounded-md lg:w-1/4 text-center">
                      {data_p[0].user_data.gender}{" "}
                    </div>
                  </div>
                  <div
                    className={` grid-cols-2 my-2 ${
                      data_p[0].user_data.age === 0 ? "hidden" : "grid"
                    }`}
                  >
                    <div className="px-1 py-2 font-semiboldx">Age</div>
                    <div className="px-1 py-2 bg-gray-100 rounded-md lg:w-1/4 text-center">
                      {data_p[0].user_data.age}{" "}
                    </div>
                  </div>
                  <div
                    className="grid-cols-2 my-2 
                       grid
                    "
                  >
                    <div className="px-1 py-2 font-semibold">Email</div>
                    <div className="px-1 py-2 bg-gray-100 rounded-md w-max text-center">
                      {data_p[0].user_data.email}
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
                    <span className="tracking-wide">My Bio</span>
                  </div>
                  <div className="list-inside space-y-2">
                    {data && data_p[0].user_data.bio.length < 5 ? (
                      <p className="font-bold ml-1 text-lg h-24 bg-slate-100 rounded-lg p-4">
                        Update Bio
                      </p>
                    ) : (
                      data && data_p[0].user_data.bio
                    )}
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="grid grid-cols-1">
                <div className="space-y-4">
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
                    <span className="tracking-wide">My Blogs</span>
                  </div>
                  {data && data_p[2].blogs.length <= 0 ? (
                    <p> You have No blogs</p>
                  ) : (
                    data &&
                    data_p[2].blogs.map((blog) => (
                      <Blog4
                        key={blog.id}
                        blog={blog}
                        Edit={Edit}
                        Delete={Delete}
                        user={user && user}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      )}
    </div>
  );
}
