

import React, { useState } from "react";
import ModuleDetails from "./ModuleDetails";
import Assessment from "./Assessment";
import "./ChapterDropdown.css";

const ChapterDropdown = ({
  chapter,
  courseId,
  unlockNextChapter,
  unlockNextModule,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(null);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  // Toggle chapter open/close
  const toggleDropdown = () => {
    if (!chapter.unlocked) return; // Do nothing if chapter is locked
    setIsOpen(!isOpen);
    setSelectedModuleIndex(null); // Close any open module when closing the chapter
    setIsAssessmentOpen(false); // Close assessment if chapter is closed
  };

  // Handle module click to expand content
  const handleModuleClick = (index) => {
    if (!chapter.unlocked || chapter.modules[index].unlocked === false) return; // Do nothing if module is locked
    setSelectedModuleIndex(index === selectedModuleIndex ? null : index);
  };

  // Toggle assessment
  const toggleAssessment = () => {
    if (!chapter.unlocked) return; // Do nothing if chapter is locked
    setIsAssessmentOpen(!isAssessmentOpen);
  };

  return (
    <div
      className={`chapter-container ${chapter.unlocked ? "unlocked" : "locked"
        }`}
    >
      {/* Chapter Header */}
      <div className="chapter-header" onClick={toggleDropdown}>
        <h4 style={{ color: isOpen ? "violet" : "white" }}>
          {chapter.title || chapter.name}
        </h4>
        <span >
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {/* Show Modules if Chapter is Open */}
      {isOpen && (
        <div className="chapter-content">
          {chapter.modules?.length > 0 ? (
            chapter.modules.map((module, idx) => (
              <div
                key={idx}
                className={`module-item ${module.unlocked ? "unlocked" : "locked"
                  }`}
              >
                <div
                  className={`module-header ${module.unlocked ? "" : "disabled"}`}
                  onClick={() => handleModuleClick(idx)}
                >
                  <span
                    style={{ color: selectedModuleIndex === idx ? "violet" : "white" }}
                  >
                    📚 {module.name || module.title}
                  </span>
                  <span>
                    {selectedModuleIndex === idx ? "▲" : "▼"}
                  </span>
                </div>


                {/* Show Module Details if Clicked */}
                {selectedModuleIndex === idx && (
                  <div className="module-details-dropdown">
                    <ModuleDetails
                      module={module}
                      unlockNextModule={unlockNextModule}
                      chapterId={chapter.chapterId} // Pass chapterId to unlock module
                      courseId={courseId} // Pass courseId to unlock module
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No modules available for this chapter.</p>
          )}

          {/* Show Assessment at the End of Modules */}
          <div className="assessment-section">
            <div
              className={`assessment-header ${chapter.unlocked ? "" : "disabled"
                }`}
              onClick={toggleAssessment}
            >
              <span style={{ color: isAssessmentOpen ? "violet" : "white" }}>
    🎯 Chapter Assessment
  </span>
              <span>{isAssessmentOpen ? "▲" : "▼"}</span>
            </div>
            {isAssessmentOpen && (
              <div className="assessment-details">
                <Assessment
                  assessment={chapter.assessment}
                  unlockNextChapter={unlockNextChapter} // Pass unlock function to Assessment
                  courseId={courseId} // Pass courseId
                  chapterId={chapter.chapterId} // Pass chapterId
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterDropdown;
