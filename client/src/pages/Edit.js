import React, { useState, useContext, useEffect } from "react";
import Banner from "../components/Banner";
import { TextareaAutosize } from "@mui/base";
import ImageIcon from "@mui/icons-material/Image";
import Tooltip from "@mui/material/Tooltip";
import AuthContext from "../contexts/AuthContext";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [blogSections, setBlogSections] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { AuthTokens, logoutUser } = useContext(AuthContext);
  const [entered, setEnterd] = useState(false);
  const [previewImage1, setPreviewImage1] = useState(null);

  const { user_uid, blog_uid } = useParams();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/blogs/${blog_uid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(AuthTokens.access),
            },
          }
        );

        if (response.status === 200) {
          const fetchedData = await response.json();
          const { title, content, category, image } = fetchedData[0];

          setMainTitle(title);

          const sections = content.split("\n").map((section) => {
            const formattedContent = section.trim();
            const type = formattedContent.startsWith("*") ? "title" : "body";
            const contentWithoutMarkers = formattedContent.replace(/[*"]/g, ""); // Remove asterisks or quotes

            return { type, content: contentWithoutMarkers };
          });

          setBlogSections(sections);
          setSelectedTags(category);
          setPreviewImage1(image); // Assuming image is a URL
        } else if (response.statusText === "Unauthorized") {
          setError(error);
          logoutUser();
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSection = (type) => {
    setBlogSections([...blogSections, { type, content: "" }]);
  };

  const updateSectionContent = (index, content) => {
    const updatedSections = [...blogSections];
    updatedSections[index].content = content;
    setBlogSections(updatedSections);
  };

  const handleTagChange = (tag) => {
    setSelectedTags(tag);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Add main title to formData
    formData.append("title", mainTitle);

    const allContent = blogSections
      .map((section) => {
        const formattedContent =
          section.type === "title"
            ? `*${section.content}*`
            : `"${section.content}"`;
        return formattedContent;
      })
      .join("\n");

    formData.append(`content`, allContent);

    // Add other fields to the formData as needed
    formData.append("category", selectedTags);
    formData.append("image", selectedImage);

    const response = await fetch(
      `http://localhost:8000/api/blogs/edit/${blog_uid}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + String(AuthTokens.access),
        },
        body: formData,
      }
    );
    const result = await response.json();

    if (response.ok) {
      setAlertMessage("Blog updated successfully");
      setShowAlert(true);
    } else {
      console.log(result);
    }
  };

  const generatAi = (e) => {
    e.preventDefault();
    if (mainTitle.length === 0) {
      setEnterd(true);
      setTimeout(() => {
        setEnterd(false);
      }, 2000);
    }
  };

  const tags = [
    { name: "Politics", value: "Politics" },
    { name: "Technology", value: "Technology" },
    { name: "Science", value: "Science" },
    { name: "Travel", value: "Travel" },
    { name: "Food", value: "Food" },
    { name: "Health", value: "Health" },
    { name: "Fashion", value: "Fashion" },
    { name: "Sports", value: "Sports" },
    { name: "Movies", value: "Movies" },
    { name: "Music", value: "Music" },
    { name: "Books", value: "Books" },
    { name: "Art", value: "Art" },
    { name: "History", value: "History" },
    { name: "Education", value: "Education" },
    { name: "Environment", value: "Environment" },
    { name: "Fitness", value: "Fitness" },
    { name: "Business", value: "Business" },
    { name: "Gaming", value: "Gaming" },
    { name: "Photography", value: "Photography" },
    { name: "Parenting", value: "Parenting" },
  ];

  return (
    <div className="w-full flex justify-center ">
      <div className="content lg:w-5/6 w-full px-2 lg:px-28 ">
        <Banner />
        <div className="w-full flex justify-center mt-3 ">
          <form className="mb-6 w-full " onSubmit={handleSubmit}>
            <div className="py-2 px- mb-4  rounded-lg rounded-t-lg dark:bg-gray-800 dark:border-gray-700">
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  className="px-2 w-max rounded bg-gray-200"
                  onClick={() => addSection("title")}
                >
                  Add Title
                </button>
                <button
                  type="button"
                  className="px-2 w-max rounded bg-gray-200"
                  onClick={() => addSection("body")}
                >
                  Add Section
                </button>
              </div>
              <TextareaAutosize
                id="inputa"
                minRows={3}
                className="   w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  bg-gray-100 rounded-sm p-3 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder={`Type your main title here...`}
                value={mainTitle}
                onChange={(e) => setMainTitle(e.target.value)}
              />
              {entered && <p className="warn">Please Enter Avalue</p>}{" "}
              {blogSections.map((section, index) => (
                <div key={index}>
                  <TextareaAutosize
                    minRows={`${section.type === "title" ? 2 : 5}`}
                    className={`${
                      section.type === "title" ? "bg-slate-500" : "bg-white"
                    }px-0 h-max  w-full text-sm text-gray-900 border-0 bg-gray-100 rounded-sm p-3 focus:outline-1  `}
                    value={section.content}
                    onChange={(e) =>
                      updateSectionContent(index, e.target.value)
                    }
                    placeholder={`Type your ${section.type} here...`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={(e) => generatAi(e)}
                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 mb-2
"
              >
                Generate with Ai
              </button>{" "}
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              {showAlert && (
                <Alert onClose={() => setShowAlert(false)}>
                  {alertMessage}
                </Alert>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 items-center mb-8">
              <p className="rounded-full border py-1 px-2 font-medium  ">
                Tags
              </p>
              {tags.map((tag, index) => (
                <div className="temp" key={index}>
                  {" "}
                  <input
                    type="radio"
                    id={tag.name}
                    name="group1"
                    value={tag.value}
                    onChange={() => handleTagChange(tag.name)}
                    className="hidden"
                  />
                  <label htmlFor={tag.name}>
                    <p class="rounded-full border py-1 px-2 font-medium hover:bg-black hover:border-dark hover:text-white ease-in duration-200 bg-gray-200 border-gray-3 text-dark">
                      {tag.name}
                    </p>
                  </label>
                </div>
              ))}
            </div>
            <div className=" py-2 mb-2 flex justify-center">
              <div className=" py-2 mb-2 ">
                <div className="preview grid grid-cols-1 lg:grid-cols-3 place-content-center lg:place-content-start">
                  {previewImage1 && (
                    <img
                      src={`http://127.0.0.1:8000/${previewImage1}`}
                      alt="Selected Preview"
                      className="rounded-md border border-l object-cover max-h-[400px]  lg:max-h-[200px] w-full  "
                    />
                  )}
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Selected Preview"
                      className="rounded-md border border-l object-cover max-h-[400px] lg:ml-6 mb-8 lg:max-h-[200px] w-full  "
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
};

export default Edit;
