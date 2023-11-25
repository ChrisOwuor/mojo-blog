import React, { useState, useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function All() {
  let { AuthTokens, logoutUser } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);

  let getBlogs = async () => {
    let response = await fetch("http://localhost:8000/api/blogs", {
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
      setLoading(false);
    } else if (response.statusText === "Unauthorized") {
      setError(error);
      setLoading(false);
      logoutUser();
    }
  };
  useEffect(() => {
    getCategory()
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main_cont w-full flex justify-center  ">
      <div className="lg:w-5/6   mx-auto px-4 sm:px-4 xl:px-0 sticky top-24">
        <div className="mb-8 text-center">
          <h2 className="text-dark mb-3.5 text-2xl font-bold sm:text-4xl xl:text-heading-3">
            Browse by Category
          </h2>
          <p>Select a category to see more related content</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 items-center mb-8">
          <NavLink
            to="/blogs/all"
            className={({ isActive }) => {
              return (
                "rounded-full border py-2.5 px-4 font-medium hover:bg-black hover:border-dark hover:text-white ease-in duration-200 bg-gray-200 border-gray-3 " +
                (isActive ? "text-red-400" : "text-dark")
              );
            }}
          >
            All (20)
          </NavLink>

          <>
            { category && category.map((cat) => (
              <NavLink key={cat.id}
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
          </>
        </div>
        <div className="bg-dark border-dark ">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1  place-items-center gap-y-8 gap-x-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
