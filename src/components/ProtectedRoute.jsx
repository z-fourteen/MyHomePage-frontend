import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const auth = async () => {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            if (!accessToken) {
                setIsAuthenticated(false);
                return;
            }

            const decoded = jwtDecode(accessToken);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                await refreshToken();
            } else {
                setIsAuthenticated(true);
            }
        };

        const refreshToken = async () => {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            if (!refreshToken) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const res = await api.post("/api/token/refresh/", {
                    refresh: refreshToken
                });
                if (res.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Failed to refresh token", error);
                setIsAuthenticated(false);
            }
        };

        auth().catch(() => setIsAuthenticated(false));
    }, []);

    // 在认证状态为 null 时，显示加载状态
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // 根据认证状态渲染子组件或重定向
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;