import "../static/Study.css";
import React, { useState } from "react";

// 统一处理路径：补上 BASE_URL + URL 编码
const toGhUrl = (url = "") =>
  encodeURI(`${import.meta.env.BASE_URL}${url.replace(/^\//, "")}`);

const studyData = [
  {
    semester: "2024 fall semester",
    subjects: [
      {
        name: "数学分析/Calculus",
        files: [
          { title: "数学分析习题课讲义（上册）（谢惠民）", url: "/files/math/file1.pdf" }
        ],
      },
      {
        name: "c语言程序设计/ programming in C",
        files: [
          { title: "作家书写习惯分析大作业源代码", url: "/files/code/c/PB24061302 赵国华 大作业-作家书写习惯分析.rar" },
          { title: "作家书写习惯分析大作业报告", url: "/files/code/c/作业报告.pdf" },
          { title: "习题课讲义", url: "/files/code/c/习题课讲义.pdf" },
        ],
      },
      {
        name: "大学生心理学/ Introduction to Psychology",
        files: [
          { title: "大学生心理学大作业", url: "/files/others/大作业.pdf" },
        ]
      }
    ],
  },
  {
    semester: "2025 spring semester",
    subjects: [
      {
        name: "数学分析/Calculus",
        files: [
          { title: "课后题答案", url: "/files/math/answer.pdf" },
          { title: "微积分学习指导下册", url: "/files/math/微积分学习指导 下册.pdf" },
          { title: "数学分析习题课讲义（第二版）下册 谢惠民", url: "/files/math/数学分析习题课讲义（第二版）下册 谢惠民.pdf" },
          { title: "期中复习资料", url: "/files/math/midterm-review.pdf" },
          { title: "期末复习资料", url: "/files/math/final-review.pdf" }
        ],
      },
      {
        name: "数据结构/Data Structures",
        files: [
          { title: "复习资料", url: "/files/code/ds/data_structure.pdf" },
        ]
      }
    ],
  },
];

const StudyMaterialsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = studyData
    .map((semester) => ({
      ...semester,
      subjects: semester.subjects
        .map((subject) => ({
          ...subject,
          files: subject.files.filter(
            (file) =>
              file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              subject.name.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((subject) => subject.files.length > 0),
    }))
    .filter((semester) => semester.subjects.length > 0);

  return (
    <div className="study-container">
      <input
        type="text"
        placeholder="搜索文件或科目..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredData.length === 0 ? (
        <p className="no-results">未找到匹配的资料</p>
      ) : (
        filteredData.map((semesterData, index) => (
          <div key={index} className="semester-block">
            <h2 className="semester-title">{semesterData.semester}</h2>
            {semesterData.subjects.map((subject, sIndex) => (
              <div key={sIndex} className="subject-block">
                <h3 className="subject-title">{subject.name}</h3>
                <ul className="file-list">
                  {subject.files.map((file, fIndex) => (
                    <li key={fIndex} className="file-item">
                      <a
                        href={toGhUrl(file.url)}
                        download
                        className="file-link"
                      >
                        {file.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default StudyMaterialsPage;
