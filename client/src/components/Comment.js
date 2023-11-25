import React, { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
const moment = require("moment");

export default function Comment({ comment, no, blog_uuid, getBlogs }) {
  const { user, AuthTokens } = useContext(AuthContext);
console.log(user);
  const [loading, setLoading] = useState(true);
  const [blogcomment, SetBlogComment] = useState(null);
  const [blog_content, setBlog_Content] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  const upd = (id) => {
    const comment_to_edit = comment.find((item) => item.id === id);
    setBlog_Content(comment_to_edit.content);
  };

  const Edit = async (id) => {
    const comment_to_edit = comment.find((item) => item.id === id);
    setBlog_Content(comment_to_edit.content);

    const body = {
      content: blog_content,
    };

    try {
      let response = await fetch(
        `http://localhost:8000/api/comment/${comment_to_edit.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(AuthTokens.access),
          },
          body: JSON.stringify(body),
        }
      );

      let data = await response.json();

      if (response.status === 200) {
        setLoading(false);
        setBlog_Content("");
        console.log(data);
        getBlogs();
      } else if (response.statusText === "Unauthorized") {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error Editing comment:", error);
    }
  };

  const Delete = async (id) => {
    const comment_to_delete = comment.find((item) => item.id === id);

    try {
      let response = await fetch(
        `http://localhost:8000/api/comment/${comment_to_delete.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(AuthTokens.access),
          },
        }
      );

      if (response.status === 204) {
        setLoading(false);
        console.log("Comment deleted successfully");
        getBlogs();
      } else if (response.statusText === "Unauthorized") {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const Post = async (e) => {
    e.preventDefault();
    const body = {
      content: blog_content,
      uuid: blog_uuid,
    };

    try {
      let response = await fetch(`http://localhost:8000/api/comment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(AuthTokens.access),
        },
        body: JSON.stringify(body),
      });

      let data = await response.json();

      if (response.status === 201) {
        SetBlogComment(data);
        setLoading(false);
        setBlog_Content("");
        getBlogs();
        setEditingCommentId(null);
      } else if (response.statusText === "Unauthorized") {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const HandleAction = async (e, id) => {
    e.preventDefault();
    if (editingCommentId !== id) {
      Edit(editingCommentId);
      setEditingCommentId(null);
    } else {
      Post(e);
    }
  };

  const isSmallScreen = window.innerWidth < 600;

  const dateFormat = isSmallScreen
    ? "DD/MM/YYYY"
    : "MMMM DD, YYYY [at] HH:mm:ss";

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased w-full lg:w-5/6 mx-auto">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments <span className="ml-2">{no}</span>
          </h2>
        </div>
        <form
          className="mb-6"
          onSubmit={(e) => {
            HandleAction(e, null);
          }}
        >
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              value={blog_content}
              onChange={(e) => {
                setBlog_Content(e.target.value);
              }}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder={user ? "Write a comment..." : "Login to comment"}
              required
            ></textarea>
          </div>
          {user && (
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {editingCommentId == null ? " Post comment" : " Edit Comment"}{" "}
            </button>
          )}
        </form>
        {comment.map((comment) => (
          <article
            key={comment.id}
            className="mb-6 py-2 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={`http://127.0.0.1:8000/${comment.comment_by_profile}`}
                    alt="Bonnie Green"
                  />
                  {comment.comment_by}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time pubdate dateTime="2022-03-12" title="March 12th, 2022">
                    {moment(comment.created_at).format(dateFormat)}
                  </time>
                </p>
                <button
                  className={`text-sm ${
                    user && user.user_name === comment.comment_by
                      ? "block"
                      : "hidden"
                  } text-gray-600 dark:text-gray-400 ml-3  underline hover:cursor-pointer`}
                  onClick={(e) => {
                    setEditingCommentId(comment.id);
                    upd(comment.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className={`text-sm text-gray-600 dark:text-gray-400 ml-3 ${
                    user && user.user_name === comment.comment_by
                      ? "block"
                      : "hidden"
                  } underline hover:cursor-pointer`}
                  onClick={(id) => {
                    Delete(comment.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">
              {comment.content}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
