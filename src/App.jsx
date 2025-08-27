import { useState, useEffect } from "react";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import StudyPage from "./pages/StudyPage";
import ThoughtsPage from "./pages/ThoughtsPage";
import MessagePage from "./pages/MessagePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/RegisterPage";
import PublishPage from "./pages/PublishPage";
import "./index.css";

function Logout(){
  localStorage.clear();
  return <Navigate to="/login"/>;
}

function RegisterAndLogout(){
  return <Register />;
}

function App() {
  const [isLanding, setIsLanding] = useState(true);

  // 滚动切换到主页
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsLanding(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isLanding ? (
        <LandingPage onEnter={() => setIsLanding(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/thoughts" element={<ThoughtsPage />} />
          <Route 
            path="/message" 
            element={
              <ProtectedRoute>
                <MessagePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/publish" 
            element={ // 新增路由
              <ProtectedRoute>
                <PublishPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
