import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import HeroSkeleton from "./HeroSkeleton";
const moment = require("moment");

export default function Hero() {
  let {  logoutUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let getBlogs = async () => {
      let response = await fetch("http://localhost:8000/api/featured-blogs/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + String(AuthTokens.access),
        },
      });
      let data = await response.json();

      if (response.status === 200) {
        setData(data);
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
  // const isSmallScreen = window.innerWidth < 600;

  // const dateFormat = isSmallScreen
  //   ? "DD/MM/YYYY"
  //   : "MMMM DD, YYYY [at] HH:mm:ss";
  return (
    <div className="main_cont w-full flex justify-center ">
      <div className="w-5/6  ">
        {loading ? (
          <HeroSkeleton />
        ) : (
          <div className="flex flex-wrap gap-x-7 gap-y-9 justify-center">
            <div className="font-semibold  text-3xl text-dark max-w-[1170px] w-full flex flex-col lg:flex-row lg:items-center gap-7.5 lg:gap-11 bg-white shadow-sm rounded-xl p-4 lg:p-2.5">
              Latest Blogs
            </div>

            <div className="max-w-[1170px] w-full flex flex-col lg:flex-row lg:items-center gap-7.5 lg:gap-11 bg-white shadow-md rounded-xl p-4 lg:p-2.5">
              <div className="lg:max-w-[536px] w-full">
                <Link to="/single">
                  <img
                    className="w-full aspect-auto object-cover rounded-md lg:h-[300px]"
                    src={`http://127.0.0.1:8000/${data[0].image}`}
                    alt="hero"
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className="lg:max-w-[540px] w-full">
                <Link
                  to={`blogs/${data[0].category}`}
                  className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 mt-4 ring-1 ring-inset ring-purple-700/10"
                >
                  {data[0].category}{" "}
                </Link>
                <h1 className="font-bold text-custom-4 xl:text-heading-4 text-dark mb-4">
                  <Link to={`/single/${data[0].uid}`}>{data[0].title}</Link>
                </h1>
                <p className="max-w-[524px">
                  {data[0].content.slice(0, 100)}...
                </p>
                <div className="flex items-center gap-2.5 mt-5">
                 
                    <div className="flex w-6 h-6 rounded-full overflow-hidden" />
                    <img
                      src={`http://127.0.0.1:8000/${data[0].profile}`}
                      alt="user"
                      className=" w-12 h-12 rounded-full"
                    />
                    <p className="text-sm">
                      {" "}
                      <span className="mr-2">By</span>
                      {data[0].creator}
                    </p>
                  <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                  <p className="text-sm">
                    {moment(data[0].created_at).fromNow()}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:max-w-[570px] w-full flex flex-col sm:flex-row sm:items-center gap-6 bg-white shadow-md rounded-xl p-2.5">
              <div className="lg:max-w-[238px] w-full aspect-video ">
                <Link to={`/single/${data[1].uid}`}>
                  <img
                    className="w-full object-cover aspect-auto rounded-md"
                    src={`http://127.0.0.1:8000/${data[1].image}`}
                    alt="hero"
                  />
                </Link>
              </div>
              <div className="lg:max-w-[272px] w-full">
                <Link
                  to={`blogs/${data[1].category}`}
                  className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                >
                  {data[1].category}{" "}
                </Link>
                <h2 className="font-semibold text-custom-lg text-dark mb-3">
                  <Link to={`/single/${data[1].uid}`}>{data[1].title}</Link>
                </h2>
                <div className="flex items-center gap-2.5">
                  <p className="text-sm">
                    By {data[1].creator}
                  </p>
                  <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                  <p className="text-sm">
                    {" "}
                    {moment(data[1].created_at).fromNow()}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:max-w-[570px] w-full flex flex-col sm:flex-row sm:items-center gap-6 bg-white shadow-md rounded-xl p-2.5">
              <div className="lg:max-w-[238px] w-full aspect-video ">
                <Link to={`/single/${data[2].uid}`}>
                  <img
                    className="w-full  object-cover rounded-md"
                    src={`http://127.0.0.1:8000/${data[2].image}`}
                    alt="hero"
                  />
                </Link>
              </div>
              <div className="lg:max-w-[272px] w-full">
                <p
                  className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                >
                  {data[2].category}{" "}
                </p>
                <h2 className="font-semibold text-custom-lg text-dark mb-3">
                  <Link to={`/single/${data[2].uid}`}>{data[2].title}</Link>
                </h2>
                <div className="flex items-center gap-2.5">
                  <p className="text-sm">
                    By {data[2].creator}
                  </p>
                  <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                  <p className="text-sm">
                    {" "}
                    {moment(data[2].created_at).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
