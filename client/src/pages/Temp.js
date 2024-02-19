import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import Blog3 from "../components/Blog3";
import Skeleton from "../components/skeleton";
import { useParams } from "react-router-dom";

export default function Temp() {
  let {  logoutUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const {  id } = useParams();
  useEffect(() => {
    let getBlogs = async () => {
      let response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL + "/blogs/category/" + id + "/"}`,
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
  }, [error, id, logoutUser]);

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-8 gap-x-8">
          {data && data.length === 0 ? (
            <p>No blogs underthis category</p>
          ) : (
            data.map((blog) => <Blog3 key={blog.id} blog={blog} />)
          )}
        </div>
      )}
    </>
  );
}
