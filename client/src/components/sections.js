import React, { useState } from "react";

const CreateBlogPage = () => {
  const [blogSections, setBlogSections] = useState([]);

  const addSection = (type) => {
    // Add a new section to the state based on the type (title or body)
    setBlogSections([...blogSections, { type, content: "" }]);
  };

  const updateSectionContent = (index, content) => {
    // Update the content of a specific section
    const updatedSections = [...blogSections];
    updatedSections[index].content = content;
    setBlogSections(updatedSections);
  };

  const displaySections = () => {
    // Display sections, separated by quotes
    return blogSections.map((section, index) => (
      <div key={index}>
        <p>
          {section.type}: {section.content}
        </p>
        <hr />
      </div>
    ));
  };

  return (
    <div>
      <h2>Create Blog Page</h2>

      {/* Button to add title section */}
      <button onClick={() => addSection("title")}>Add Title Section</button>

      {/* Button to add body section */}
      <button onClick={() => addSection("body")}>Add Body Section</button>

      {/* Display and update sections */}
      {blogSections.map((section, index) => (
        <div key={index}>
          <textarea
            value={section.content}
            onChange={(e) => updateSectionContent(index, e.target.value)}
            placeholder={`Type your ${section.type} here...`}
          />
        </div>
      ))}

      {/* Display button to show sections */}
      <button onClick={() => console.log(displaySections())}>
        Show Sections
      </button>
    </div>
  );
};

export default CreateBlogPage;
