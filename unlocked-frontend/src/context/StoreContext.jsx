import React, { useEffect, useState, createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "https://unlockedu-auth-backend.onrender.com";

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [courses, setCourses] = useState([]); // Store courses

  // ✅ Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${url}/api/courses`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [token]); // re-fetch if token changes

  const contextValue = {
    url,
    token,
    setToken,
    courses,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
