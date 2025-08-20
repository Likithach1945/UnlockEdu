//
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ChapterDropdown from "./ChapterDropdown";
// import "./CourseDetails.css";
//
// const CourseDetail = ({ courseId }) => {
//   const [course, setCourse] = useState(null);
//   const [assessmentAttempted, setAssessmentAttempted] = useState(false);
//   const [assessmentPassed, setAssessmentPassed] = useState(false);
//
//   // Fetch course details
//   const fetchCourseDetails = async () => {
//     try {
//       const response = await axios.get(
// <<<<<<< HEAD
//         `"https://unlockedu.onrender.com/api/courses"/${courseId}`
// =======
//         `http://localhost:8080/api/courses/${courseId}`
// >>>>>>> bd11d3eb4494ded1be46c4859bac7b9f1399a284
//       );
//       setCourse(response.data);
//     } catch (error) {
//       console.error("Error fetching course:", error);
//     }
//   };
//
//   useEffect(() => {
//     fetchCourseDetails();
//   }, [courseId]);
//
//   // Unlock the next chapter after assessment
//   const unlockNextChapter = async (courseId, chapterId, score) => {
//     try {
//       const response = await axios.post(
// <<<<<<< HEAD
//         `https://unlockedu.onrender.com/api/unlock/chapter`,
// =======
//         `http://localhost:8080/api/unlock/chapter`,
// >>>>>>> bd11d3eb4494ded1be46c4859bac7b9f1399a284
//         { courseId, chapterId, score }
//       );
//
//       if (response.data === "Next chapter unlocked!") {
//         setAssessmentPassed(true);
//         await fetchCourseDetails(); // ✅ Update state instead of reload
//       } else {
//         console.warn("You need at least 70% to unlock the next chapter.");
//         setAssessmentAttempted(true);
//         setAssessmentPassed(false);
//       }
//     } catch (error) {
//       console.error("Error unlocking chapter:", error);
//     }
//   };
//
//   // Unlock the next module after completing module
//   const unlockNextModule = async (courseId, chapterId, moduleId) => {
//     try {
//       const response = await axios.post(
// <<<<<<< HEAD
//         `https://unlockedu.onrender.com/api/unlock/module`,
// =======
//         `http://localhost:8080/api/unlock/module`,
// >>>>>>> bd11d3eb4494ded1be46c4859bac7b9f1399a284
//         { courseId, chapterId, moduleId }
//       );
//
//       if (response.data === "Next module unlocked!") {
//         await fetchCourseDetails(); // ✅ Update state instead of reload
//       } else {
//         console.warn("Unable to unlock the next module. Try again.");
//       }
//     } catch (error) {
//       console.error("Error unlocking module:", error);
//     }
//   };
//
//   if (!course) {
//     return <div className="loading">Loading course...</div>;
//   }
//
//   return (
//     <div className="course-detail">
//       {/* Display the course title */}
//       <h2 className="course-title">{course.title || course.courseTitle}</h2>
//
// {/*      loop to render chapters of a course */}
//       {course.chapters && course.chapters.length > 0 ? (
//         course.chapters.map((chapter) => (
//           <ChapterDropdown
//             key={chapter.chapterId || chapter.id}
//             chapter={chapter}
//             courseId={courseId}
//             unlockNextChapter={unlockNextChapter}
//             unlockNextModule={unlockNextModule}
//             assessmentAttempted={assessmentAttempted}
//             assessmentPassed={assessmentPassed}
//           />
//         ))
//       ) : (
//         <div>No chapters available for this course.</div>
//       )}
//     </div>
//   );
// };
//
// export default CourseDetail;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ChapterDropdown from "./ChapterDropdown";
import "./CourseDetails.css";

const CourseDetail = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [assessmentAttempted, setAssessmentAttempted] = useState(false);
  const [assessmentPassed, setAssessmentPassed] = useState(false);


  const API_BASE_URL = "https://unlockedu.onrender.com/api";

  // Fetch course details
  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  // Unlock the next chapter after assessment
  const unlockNextChapter = async (courseId, chapterId, score) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/unlock/chapter`, {
        courseId,
        chapterId,
        score,
      });

      if (response.data === "Next chapter unlocked!") {
        setAssessmentPassed(true);
        await fetchCourseDetails(); // Refresh course details
      } else {
        console.warn("You need at least 70% to unlock the next chapter.");
        setAssessmentAttempted(true);
        setAssessmentPassed(false);
      }
    } catch (error) {
      console.error("Error unlocking chapter:", error);
    }
  };

  // Unlock the next module after completing module
  const unlockNextModule = async (courseId, chapterId, moduleId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/unlock/module`, {
        courseId,
        chapterId,
        moduleId,
      });

      if (response.data === "Next module unlocked!") {
        await fetchCourseDetails(); // Refresh course details
      } else {
        console.warn("Unable to unlock the next module. Try again.");
      }
    } catch (error) {
      console.error("Error unlocking module:", error);
    }
  };

  if (!course) {
    return <div className="loading">Loading course...</div>;
  }

  return (
    <div className="course-detail">
      <h2 className="course-title">{course.title || course.courseTitle}</h2>

      {course.chapters && course.chapters.length > 0 ? (
        course.chapters.map((chapter) => (
          <ChapterDropdown
            key={chapter.chapterId || chapter.id}
            chapter={chapter}
            courseId={courseId}
            unlockNextChapter={unlockNextChapter}
            unlockNextModule={unlockNextModule}
            assessmentAttempted={assessmentAttempted}
            assessmentPassed={assessmentPassed}
          />
        ))
      ) : (
        <div>No chapters available for this course.</div>
      )}
    </div>
  );
};

export default CourseDetail;
