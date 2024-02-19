import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import Blog3 from "../components/Blog3";
import Skeleton from "../components/skeleton";

export default function All() {
  let { logoutUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let getBlogs = async () => {
      let response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL + "/blogs"}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + String(AuthTokens.access),
          },
        }
      );
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
  }, [error, logoutUser]);

  
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
