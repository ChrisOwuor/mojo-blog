import React, { useState, useContext } from "react";
import Banner from "../components/Banner";
import { TextareaAutosize } from "@mui/base";
import ImageIcon from "@mui/icons-material/Image";
import Tooltip from "@mui/material/Tooltip";
import AuthContext from "../contexts/AuthContext";
import { Alert } from "@mui/material";
import ModalDialogScrollable from "../components/Modal";
import AlertMoadal from "../components/AlertModal";

const Create = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [blogSections, setBlogSections] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
    const [loadin, setLoadin] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);
  const { AuthTokens } = useContext(AuthContext);
  const [entered, setEnterd] = useState(false);
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
    const file = await event.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
   const removeLastSection = () => {
     const updatedSections = [...blogSections];
     updatedSections.pop();
     setBlogSections(updatedSections);
   };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

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

    const response = await fetch("http://192.168.43.55:8000/api/blogs/add", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + String(AuthTokens.access),
      },
      body: formData,
    });
    const result = await response.json();

    if (response.ok) {
      setAlertMessage("blog added successfully");
      setShowAlert(true);
    } else {
      console.log(result);
    }
  };
  const generatAi = async (e) => {
    e.preventDefault();

    if (mainTitle.length === 0) {
      setEnterd(true);
      setTimeout(() => {
        setEnterd(false);
      }, 2000);
    } else {
      setLoadin(true)
      const formData = new FormData();
      formData.append("prompt", mainTitle);

      const response = await fetch(
        "http://192.168.43.55:8000/api/generate_response/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 200) {
        setLoadin(false)
        const fetchedData = await response.json();
        const  content = fetchedData.mes;

        const sections = content.split("\n").map((section) => {
          const formattedContent = section.trim();
          const type = formattedContent.startsWith("*") ? "title" : "body";
          const contentWithoutMarkers = formattedContent.replace(/[*"]/g, ""); 

          return { type, content: contentWithoutMarkers };
        });

        setBlogSections(sections);
      } else if (response.statusText === 500) {
        setLoadin(false)
      }
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
        {showAlert && (
          // <Alert onClose={() => setShowAlert(false)}>{alertMessage}</Alert>
          <AlertMoadal/>

        )}
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
                <button
                  type="button"
                  className="px-2 w-max rounded bg-gray-200"
                  onClick={removeLastSection}
                >
                  Remove Section
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
                {loadin ? (
                  <div class="text-center">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>{" "}
                    </div>
                  </div>
                ) : (
                  "Generate with Ai"
                )}
              </button>{" "}
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
                  <label for={tag.name}>
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
};

export default Create;
