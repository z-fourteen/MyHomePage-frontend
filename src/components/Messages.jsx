import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../static/Message.css";

export default function Messages() {
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await api.get("/api/messages/");
            setMessages(res.data);
        } catch (error) {
            console.error("获取留言失败:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = () => {
        navigate("/send-message");
      };

    if (loading) {
        return <div className="loading-container">加载中...</div>;
    }

    return (
        // 使用一个新的、专门的容器类来居中内容
        <div className="message-board-container">
            <h1 className="page-title">发芽地</h1>
            <p className="page-description">如果你有什么想说的话，就请留在这里吧。</p>
            <p className="page-description">或许是问候，或许是困惑，又或许是你的成长碎碎念。</p>
            <p className="page-description">它们都将作为种子在这片森林里发芽</p> 

            <button onClick={handlePublish} className="publish-button">
              播种留言
            </button>

            {/* 留言列表 */}
            <div className="message-list">
                {messages.map((msg) => (
                    <div key={msg.id} className="message-card">
                        <p className="message-content">
                            <span className="message-sender">{msg.sender_username}：</span>
                            {msg.content}
                        </p>
                        <span className="message-timestamp">
                            {new Date(msg.timestamp).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            
        </div>
    );
}