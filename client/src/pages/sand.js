import React from "react";
import Comment from "../components/Comment";
import Feedback from "../components/Feedback";
import { NavLink, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
const moment = require("moment");

export default function Single() {
  const { id } = useParams();

  let { AuthTokens, logoutUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let details = data[0];

  useEffect(() => {
    let getBlogs = async () => {
      let response = await fetch(`http://localhost:8000/api/blogs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(AuthTokens.access),
        },
      });
      let data = await response.json();

      if (response.status === 200) {
        setData(data);
        setLoading(false);
      } else if (response.statusText === "Unauthorized") {
        setError(error);
        setLoading(false);
        logoutUser();
      }
    };

    getBlogs();
  }, [id]);
  const isSmallScreen = window.innerWidth < 600;

  const dateFormat = isSmallScreen
    ? "DD/MM/YYYY"
    : "MMMM DD, YYYY [at] HH:mm:ss";

  return (
    <div className="pageelem w-full flex justify-center">
      <div className="w-5/6 mx-auto px-4 sm:px-8 xl:px-0  pb-8">
        <div className="w-full  mx-auto text-center ">
          <Link
            className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 mb-2"
            to="/tags/"
          >
            {details.category}
          </Link>
          <h1 className="font-bold text-2xl sm:text-4xl lg:text-custom-2 text-dark mb-5">
            {details.title}{" "}
          </h1>
          <p className="text-body">{details.content} </p>
          <div className="flex items-center justify-center gap-4 mt-7.5">
            <div className="flex w-12 h-12 rounded-full overflow-hidden">
              src={`http://127.0.0.1:8000/${data.profile}`}
              <img src={details.profile} alt="user" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-custom-lg text-dark mb-1">
                {details.creator}{" "}
                <span>
                  <NavLink
                    to={`/bio/${details.creator_id}`}
                    className="text-blue-700 text-sm hover:underline ease-in duration-500"
                  >
                    Read Bio
                  </NavLink>
                </span>
              </h4>
              <div className="flex items-center gap-1.5">
                <p> {moment(details.created_at).format(dateFormat)} </p>
                <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                <p>1 min read</p>
              </div>
            </div>
          </div>
        </div>
        <div className="full  flex justify-center">
          <img src={details.image} alt="blog" className="mt-10 mb-11" />
        </div>
        <div className="max-w-[770px] mx-auto">
          <div>
            <p className="mb-5 text-body">
              As discussed in the introduction post, one of the best things
              about Ghost is just how much you can customize to turn your site
              into something unique. Everything about your layout and design can
              be changed, so you're not stuck with yet another clone of a social
              network profile.
            </p>
            <p className="font-semibold text-dark mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
              quam at justo ullamcorper vulputate. Donec mattis aliquam urna,
              sed placerat dolor volutpat vel. Maecenas posuere sem purus, quis
              feugiat.
            </p>
          </div>
        </div>
        <Feedback />
        <Comment />
      </div>
    </div>
  );
}
