import React from 'react'
import "../static/About.css";

export default function About() {
  return (
    <section id="about" className="about container">
      <h3>About Me / 关于我</h3>

      <div className="about-columns">
        <div className="col">
          <p>I’m a Data Science major at the University of Science and Technology of China.</p>
          <p>Here, I wish to record my learning journey and reflections, and connect with kindred spirits to share ideas and inspiration.</p>
          <p>I have a solid grasp of front-end development and am now diving into Python and back-end technologies. My long-term goal is to explore Human-Computer Interaction, driven by my fascination with blending humanistic thinking and rational tools.</p>
          <p>
            At times, I feel lost or anxious.  
            So I write down these fragments of thought,  
            in hopes of seeking answers together with you —  
            the one reading my words right now.  
          </p>
        </div>

        <div className="col">
          <p>我目前就读于中国科学技术大学，主修大数据专业。</p>
          <p>我想在这里记录学习历程与成长思考，和志同道合的人一起交流探讨。</p>
          <p>我已掌握前端开发的技能，正在深入学习 Python 和后端技术。希望未来能投身人机交互领域，致力于理性工具与人文思考的结合。</p>
          <p>
            我也时时会感到迷茫和焦虑，
            所以同样会记录一些碎碎念，
            和此刻正在阅读我文字的你一起寻找答案。
          </p>
        </div>
      </div>
    </section>
  )
}