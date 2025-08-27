import { useState } from "react";
import api from "../api";
import {useNavigate} from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../static/Form.css"

export default function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 根据 method 属性设置表单标题和按钮文本
    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault(); 

        try {
            // 根据 method 决定是否发送 email
            const postData = method === "login" 
                ? { username, password } 
                : { username, password, email };
            
            const res = await api.post(route, postData);
            
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/message");
            } else {
                navigate("/login");
            }
        }
        catch (error) {
            console.error("Error during form submission:", error);
            alert(error);
        } finally {
            setLoading(false);
        }

    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="form-container">
            <h1>{name}</h1>

            <input 
                className="form-input"
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
            /> 
            <input 
                className="form-input"
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
            />
            {/* 只有在注册页面才显示 Email 输入框 */}
            {method === "register" && (
                <input 
                    className="form-input"
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
            )}
            
            <button
                className="form-button" 
                type="submit" 
                disabled={loading}
            >
                {loading ? "Loading..." : name}
            </button> 

            {/* 新增的切换按钮 */}
            <div className="switch-container">
                {method === "login" ? (
                    <p>没有账号？ <span onClick={() => navigate("/register")} className="switch-link">立即注册</span></p>
                ) : (
                    <p>已有账号？ <span onClick={() => navigate("/login")} className="switch-link">立即登录</span></p>
                )}
            </div>
        </form>
    );
}