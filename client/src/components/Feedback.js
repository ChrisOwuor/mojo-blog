import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import { faHeart, faShare } from "@fortawesome/free-solid-svg-icons";

const FeedbackSection = ({like}) => {
  const [likeCount, setLikeCount] = useState(like);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(likeCount + (isLiked ? -1 : 1));
  };

  const handleShare = () => {
    alert("Sharing...");
  };

  return (
    <div className="w-full max-w-[770px] mx-auto sm:px-8 xl:px-0  pb-8 flex justify-start ">
      <div className="flex items-center space-x-4 mt-4">
        <button
          className={`feedback-icon ${isLiked ? "liked" : ""}`}
          onClick={toggleLike}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <span className="feedback-count">{likeCount}</span>

        <button className="feedback-icons" onClick={handleShare}>
          <FontAwesomeIcon icon={faShare} />
        </button>
      </div>
    </div>
  );
};

export default FeedbackSection;
