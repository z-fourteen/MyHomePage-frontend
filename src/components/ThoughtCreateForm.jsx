// src/components/ThoughtCreateForm.jsx
import { useState } from "react";
import api from "../api";
import {useNavigate} from "react-router-dom";
import "../static/Form.css";

export default function ThoughtCreateForm(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // 默认值为今天的日期
    const [isPublic, setIsPublic] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const newThought = {
                title,
                date, // 确保日期字段被正确发送
                content,
                is_public: isPublic,
            };
            await api.post("/api/thoughts/", newThought);
            navigate("/thoughts");
        } catch (error) {
            console.error("发布日志失败:", error);
            alert("发布日志失败，请稍后再试。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-container">
                <h1>发布新日志</h1>
                <input
                    className="form-input"
                    type="text"
                    placeholder="日志标题"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                {/* 新增日期输入框 */}
                <input
                    className="form-input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <textarea
                    className="form-input"
                    placeholder="写下你的想法..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="10"
                    required
                />
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                    />
                    <label>公开</label>
                </div>
                <button
                    className="form-button"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "发布中..." : "发布日志"}
                </button>
            </form>
        </div>
    );
}