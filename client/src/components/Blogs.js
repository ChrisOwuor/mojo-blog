import React from "react";
import { NavLink } from "react-router-dom";
import Blog2 from "./Blog2";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import BlogsSleleton from "./BlogsSleleton";

export default function Blogs() {
  let {  logoutUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  let getBlogs = async () => {
    setLoading(true);
    let response = await fetch("http://localhost:8000/api/trending-blogs/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setData(data);

      console.log(data);
    } else if (response.statusText === "Unauthorized") {
      setError(error);
      logoutUser();
    }
  };
  let getCategory = async () => {
    let response = await fetch("http://localhost:8000/api/all/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + String(AuthTokens.access),
      },
    });
    let categories = await response.json();

    if (response.status === 200) {
      setCategory(categories);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (response.statusText === "Unauthorized") {
      setError(error);
      setLoading(false);
      logoutUser();
    }
  };
  useEffect(() => {
    getCategory();
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main_cont w-full flex justify-center ">
      <div className="pt-20 lg:pt-25 pb-15">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="mb-8 text-center">
            <h2 className="text-dark mb-3.5 text-2xl font-bold sm:text-4xl xl:text-heading-3">
              Trending Now{" "}
            </h2>
            <p>Select a category to see more related content</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 items-center mb-8">
            {category &&
              category.map((cat) => (
                <NavLink
                  key={cat.id}
                  to={`/blogs/${cat.category_name}/${cat.id}/${cat.uid}`}
                  className={({ isActive }) => {
                    return (
                      "rounded-full border py-2.5 px-4 font-medium hover:bg-black hover:border-dark hover:text-white ease-in duration-200 bg-gray-200 border-gray-3 " +
                      (isActive ? "text-red-400" : "text-dark")
                    );
                  }}
                >
                  {cat.category_name}
                </NavLink>
              ))}
          </div>
          <div className="bg-dark border-dark ">
            {loading ? (
              <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 gap-y-8 gap-x-8">
                <BlogsSleleton />
                <BlogsSleleton />
                <BlogsSleleton />
                <BlogsSleleton />
                <BlogsSleleton />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-8 gap-x-8">
                {data &&
                  data.map((blog) => <Blog2 key={blog.id} blog={blog} />)}
              </div>
            )}
          </div>
        </div>{" "}
        <NavLink
          to="/blogs"
          className="bg-blue-100 w-max flex justify-center text-blue-800 text-sm font-medium  px-8 py-3 rounded dark:bg-blue-200 ease-in duration-200 mx-auto mt-8 lg:mt-12 hover:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 mb-2"
        >
          Browse all Posts
        </NavLink>
      </div>
    </div>
  );
}
