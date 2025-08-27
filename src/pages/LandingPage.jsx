import "../static/Landing.css";

export default function LandingPage({ onEnter }) {
  return (
    <div className="landing-container">
      
      {/* 背景树木 */}
      <div className="skyview-background"></div>
      <div className="landing-content">
        <h1 className="fade-in name">Z-FOURTEEN</h1>
        <p className="fade-in delay role">Daydreamer | Creator |Explore</p>
        <button className="enter-button fade-in delay2" onClick={onEnter}>
          Enter
        </button>
      </div>
    </div>
  );
}