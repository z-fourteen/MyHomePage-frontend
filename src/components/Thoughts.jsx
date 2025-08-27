// src/components/Thoughts.jsx
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";
import api from "../api";
import "../static/Thoughts.css";

export default function Thoughts() {
  const [thoughtsByYear, setThoughtsByYear] = useState({});
  const [expandedThoughts, setExpandedThoughts] = useState({});
  const [expandedYears, setExpandedYears] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const yearRefs = useRef({}); 

  useEffect(() => {
    const fetchThoughts = async () => {
        try {
            const res = await api.get("/api/mythoughts/");
            const data = res.data;
            // 按日期倒序
            const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            // 按年份分组
            const grouped = sorted.reduce((acc, thought) => {
                const year = new Date(thought.date).getFullYear();
                if (!acc[year]) acc[year] = [];
                acc[year].push(thought);
                return acc;
            }, {});
            setThoughtsByYear(grouped);
            // 默认全部展开
            const expandState = {};
            Object.keys(grouped).forEach((y) => (expandState[y] = true));
            setExpandedYears(expandState);
        } catch (error) {
            console.error("获取日志失败:", error);
        }
    };

    fetchThoughts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN"); // 注意 key 要正确
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.username === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("解码 JWT 失败:", error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []); // 只在组件挂载时运行

  const toggleThought = (id) => {
    setExpandedThoughts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleYear = (year) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  const handlePublish = () => {
    navigate("/publish"); // 新增: 导航到新页面
  };

  const scrollToYear = (year) => {
    yearRefs.current[year]?.scrollIntoView({ behavior: "smooth" });
  };

  const years = Object.keys(thoughtsByYear).sort((a, b) => b - a);

  return (
    <div className="thoughts-page">
      {/* 侧边栏 */}
      <div className="sidebar">
        <h3>年份导航</h3>
        <ul>
          {years.map((year) => (
            <li key={year} onClick={() => scrollToYear(year)}>
              {year}
            </li>
          ))}
        </ul>
      </div>

      {/* 主体内容 */}
      <div className="thoughts-container">
        <h1 className="page-title">成长碎碎念归档</h1>
        <p className="page-description">点击年份或标题以展开/收起内容。</p>

        {isAdmin && ( // 新增: 条件渲染发布按钮
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <button onClick={handlePublish} className="publish-button">
              发布日志
            </button>
          </div>
        )}

        {years.map((year) => (
          <div
            key={year}
            ref={(el) => (yearRefs.current[year] = el)}
            className="year-section"
          >
            <h2 className="year-title" onClick={() => toggleYear(year)}>
              {year} 年 {expandedYears[year] ? "▼" : "▶"}
            </h2>

            {expandedYears[year] &&
              thoughtsByYear[year].map((thought) => {
                return (
                  <div key={thought.id} className="thought-card">
                    <h3
                      className="thought-title"
                      onClick={() => toggleThought(thought.id)}
                    >
                      {thought.title}
                    </h3>
                    <p className="thought-meta">
                      <span>日期: {thought.date}</span>
                      <span>作者: {thought.author_name}</span>
                    </p>
                    <div className="thought-content">
                      <ReactMarkdown>
                        {expandedThoughts[thought.id]
                          ? thought.content
                          : thought.content.slice(0, 80) + "..."}
                      </ReactMarkdown>
                    </div>
                    <button
                      className="read-more-btn"
                      onClick={() => toggleThought(thought.id)}
                    >
                      {expandedThoughts[thought.id] ? "收起" : "阅读全文"}
                    </button>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}