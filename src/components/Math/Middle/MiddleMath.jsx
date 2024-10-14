import "./MiddleMath.css";
import React, { useEffect, useState } from 'react';
import MultiActionAreaCardWithDialog from '../../CourseCard/Card.jsx';
import coursesData from "../../../assets/Data/coursesData/Maths/MiddleMath.json"; 
import TextField from '@mui/material/TextField'; 
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import InputAdornment from '@mui/material/InputAdornment'; 

const MiddleMathCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setCourses(coursesData);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedCourses = filteredCourses.reduce((acc, course) => {
    if (!acc[course.grade]) {
      acc[course.grade] = [];
    }
    acc[course.grade].push(course);
    return acc;
  }, {});

  return (
    <div className="course-wrapper">
      <h1 className="pinkText course-title">Middle School Math Courses</h1>
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={searchQuery}
        placeholder="Search for courses"
        onChange={handleSearch}
        className="search-bar"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchSharpIcon />
            </InputAdornment>
          ),
        }}
      />
      <div className="course-container">
        {Object.keys(groupedCourses).map((grade) => (
          <div key={grade} className="grade-section">
            <h2 className="grade-title">Grade {grade}</h2>
            <div className="grade-courses">
              {groupedCourses[grade].map((course) => (
                <MultiActionAreaCardWithDialog
                  key={course.id}
                  title={course.courseName}
                  description={course.description}
                  detailedDescription={course.detailedDescription}
                  feeStructure={course.feeStructure}
                  image={course.image} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiddleMathCourses;