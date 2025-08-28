// src/components/ThoughtCreateForm.jsx
import { useState } from "react";
import api from "../api";
import {useNavigate} from "react-router-dom";
import "../static/Form.css";

export default function ThoughtCreateForm(){
    const [content, setContent] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const newThought = {
                content,
                is_public: isPublic,
            };
            await api.post("/api/messages/", newThought);
            alert("留言成功！你已经播下一颗种子！")
            navigate("/message");
        } catch (error) {
            console.error("发布留言失败:", error);
            alert("发布留言失败，请稍后再试。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-container">
                <h1>播下话语的种子吧！</h1>
                <textarea
                    className="form-input"
                    placeholder="在这里写下你想说的话..."
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
                    {loading ? "发布中..." : "播种"}
                </button>
            </form>
        </div>
    );
}