import React, { useEffect, useState } from "react";
import Author from "./Author";

export default function Top() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let getUsers = async () => {
      setLoading(true)
      let response = await fetch("http://localhost:8000/auth/user/top", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + String(AuthTokens.access),
        },
      });
      let categories = await response.json();

      if (response.status === 200) {
        setData(categories);
        setLoading(false);
      } else if (response.statusText === "Unauthorized") {
        setError(error);
        setLoading(false);
      }
    };
getUsers()
 },[error])
  return (
    <div className="w-full justify-center flex">
      <section className="pb-8 w-5/6">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-8 mb-6">
            <h2 className="font-semibold  text-3xl text-dark">Top Authors</h2>
          </div>
          <div className="pt-14 border-t border-gray-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-8 place-items-center">
              {!loading && data && data.map((item) => <Author det={ item}  key={item.id}/>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
