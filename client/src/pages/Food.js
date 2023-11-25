import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import Blog3 from "../components/Blog3";
import Skeleton from "../components/skeleton";

export default function Food() {
  let { AuthTokens, logoutUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let getBlogs = async () => {
      let response = await fetch("http://localhost:8000/api/blogs/", {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const isSmallScreen = window.innerWidth < 600;

  // const dateFormat = isSmallScreen
  //   ? "DD/MM/YYYY"
  //   : "MMMM DD, YYYY [at] HH:mm:ss";

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-8 gap-x-8">
          {data.map((blog) => (
            <Blog3 key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
}
