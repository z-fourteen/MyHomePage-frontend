import "../static/Explore.css";
import { Link } from 'react-router-dom';


export default function Explore() {
  const branches = [
    { cn: "个人信息", en: "About Me", icon: "🍃", link: "/about" },
    { cn: "学习资料", en: "Study Resources", icon: "📚", link: "/study" },
    { cn: "成长碎碎念", en: "Growth Musings", icon: "💭", link: "/thoughts" },
    { cn: "留言发芽地", en: "Message Board", icon: "🌱", link: "/message" }
  ];

  return (
    <div className="explore-container " id="explore" >

      {/* PC端分支按钮 */}
      <div className="branch-buttons">
        {branches.map((b, i) => (
          <Link key={i} to={b.link} className={`branch-btn branch-${i}`}>
            <span className="icon">{b.icon}</span>
            <span className="cn">{b.cn}</span>
            <span className="en">{b.en}</span>
          </Link>
        ))}
      </div>

      {/* 移动端列表 */}
      <div className="branch-list">
        {branches.map((b, i) => (
          <a key={i} href={b.link} className="list-item">
            <span className="list-icon">{b.icon}</span>
            <div className="text">
              <span className="cn">{b.cn}</span>
              <span className="en">{b.en}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
