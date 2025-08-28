// src/components/ThoughtCreateForm.jsx
import { useState } from "react";
import api from "../api";
import {useNavigate} from "react-router-dom";
import "../static/Form.css"; // 重用现有的 Form.css 样式

export default function ThoughtCreateForm(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault(); 
        
        try {
            const newThought = {
                title,
                content,
                is_public: isPublic,
            };
            await api.post("/api/thoughts/", newThought);
            navigate("/thoughts"); // 发布成功后跳转回日志列表页面
        } catch (error) {
            console.error("发布日志失败:", error);
            alert("发布日志失败，请稍后再试。");
        } finally {
            setLoading(false);
        }
    };

    return (
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
    );
}