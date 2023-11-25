import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
const moment = require("moment");

export default function Comment({ comment, no, blog_uuid, getBlogs }) {
  const { user, AuthTokens } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [blogcomment, setBlogComment] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  const handleAction = async (e, id) => {
    e.preventDefault();

    if (editingCommentId === id) {
      // Perform edit action
      await editComment(id);
    } else {
      // Perform post action
      await postComment();
    }
  };

  const postComment = async () => {
    // ... Your post comment logic
  };

  const editComment = async (id) => {
    // ... Your edit comment logic
  };

  const deleteComment = async (id) => {
    // ... Your delete comment logic
  };
    ? "DD/MM/YYYY"
    : "MMMM DD, YYYY [at] HH:mm:ss";

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased w-full lg:w-5/6 mx-auto">
      <div className=" mx-auto ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments <span className="ml-2">{no}</span>
          </h2>
        </div>
        <form className="mb-6" onSubmit={(e) => handleAction(e, null)}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder={user ? "Write a comment..." : "Login to comment"}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            {editingCommentId ? "Edit comment" : "Post comment"}
          </button>
        </form>
        {comment.map((comment) => (
          <article
            key={comment.id}
            className=" mb-6 py-2 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
          >
            {/* ... Comment rendering code ... */}
          </article>
        ))}
      </div>
    </section>
  );
}
