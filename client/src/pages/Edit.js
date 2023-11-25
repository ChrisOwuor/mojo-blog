import React, { useState, useContext, useEffect } from "react";
import Banner from "../components/Banner";
import { TextareaAutosize } from "@mui/base";
import ImageIcon from "@mui/icons-material/Image";
import "../App.css";
import Tooltip from "@mui/material/Tooltip";
import AuthContext from "../contexts/AuthContext";
import { useParams } from "react-router-dom";

export default function Edit() {
  let { AuthTokens, user, logoutUser, data } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const {  user_uid, blog_uid } = useParams();
  const [datasingle, setdatasingle] = useState(null);

  let getBlogs = async () => {
    let response = await fetch(`http://localhost:8000/api/blogs/${blog_uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(AuthTokens.access),
      },
    });
    let datasingle = await response.json();

    if (response.status === 200) {
      setdatasingle(datasingle[0]);
      setLoading(false);
      console.log(datasingle);
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

  const handleTagChange = (tag) => {
    setSelectedTags(tag);
  };

  const handleImageChange = async (event) => {
    const file = await event.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", blogContent);
    formData.append("category", selectedTags);
    formData.append("image", selectedImage);
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/api/blogs/add", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + String(AuthTokens.access),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Post successful:", result);
    } catch (error) {
      setError(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      });
    }
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="content w-5/6 ">
        <Banner />
        <div className="w-full flex justify-center mt-3 ">
          <form className="mb-6 w-full " onSubmit={handleSubmit}>
            <div className="py-2 px-4 mb-4  rounded-lg rounded-t-lg dark:bg-gray-800 dark:border-gray-700">
              <input
                id="comment"
                // value={datasingle.title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="px-0 mb-3 h-12 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Title"
                required
              ></input>
              <TextareaAutosize
                id="comment"
                minRows={18}
                // value={datasingle.content}
                onChange={(e) => setBlogContent(e.target.value)}
                className="px-0 h-max  w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write your blog "
              />
              <button
                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 mb-2
"
              >
                Generate with Ai
              </button>{" "}
            </div>
            <div className="flex flex-wrap justify-center gap-4 items-center mb-8">
              <p className="rounded-full border py-1 px-2 font-medium  ">
                Tags
              </p>

              <input
                type="radio"
                id="food"
                name="group1"
                value="Food"
                onChange={() => handleTagChange("Food")}
                className="hidden"
              />
              <label for="food">
                <p class="rounded-full border py-1 px-2 font-medium hover:bg-black hover:border-dark hover:text-white ease-in duration-200 bg-gray-200 border-dark text-dark ">
                  Food
                </p>
              </label>

              <input
                type="radio"
                id="nature"
                name="group1"
                value="Nature"
                onChange={() => handleTagChange("Nature")}
                className="hidden "
              />
              <label for="nature">
                <p class="rounded-full border py-1 px-2 font-medium hover:bg-black hover:border-dark hover:text-white ease-in duration-200 bg-gray-200 border-gray-3 text-dark">
                  Nature{" "}
                </p>
              </label>

              <input
                type="radio"
                id="astronomy"
                name="group1"
                value="Astronomy"
                onChange={() => handleTagChange("Astronomy")}
                className="hidden"
              />
              <label for="astronomy">
                <p class="rounded-full border py-1 px-2 font-medium hover:bg-black hover:border-dark hover:text-white ease-in duration-200 bg-gray-200 border-gray-3 text-dark">
                  Astronomy{" "}
                </p>
              </label>
              <input
                type="radio"
                id="Politics"
                name="group1"
                value="Politics"
                onChange={() => handleTagChange("Politics")}
                className="hidden"
              />
              <label for="Politics">
                <p class="rounded-full border py-1 px-2 font-medium hover:bg-black hover:border-dark hover:text-white ease-in duration-200 bg-gray-200 border-gray-3 text-dark">
                  Politics{" "}
                </p>
              </label>
            </div>
            <div className=" py-2 mb-2 flex justify-center">
              <div className=" py-2 mb-2 ">
                <div className="preview grid grid-cols-1 lg:grid-cols-3 place-content-center lg:place-content-start">
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Selected Preview"
                      className="rounded-md border border-l object-cover max-h-[400px]  lg:max-h-[200px] w-full  "
                    />
                  )}
                </div>
                <div className=" flex mt-3 justify-center items-baseline gap-4">
                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Tooltip title="Select Image">
                    <label htmlFor="file">
                      {" "}
                      <ImageIcon fontSize="large" color="primary" />
                    </label>{" "}
                  </Tooltip>
                  <div>
                    <button
                      disabled={loading}
                      type="submit"
                      class="inline-flex items-center py-1.5 ml-4 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 "
                    >
                      {loading ? "Posting" : "Post"}{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
