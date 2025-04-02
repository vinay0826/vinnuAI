import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './mainpage.css';

export function Mainpage(): React.ReactElement {
  const [loaded, setLoaded] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoaded(true);
    
    const handleMouseMove = (e: MouseEvent): void => {
      const mainpage = document.querySelector('.mainpage') as HTMLElement;
      if (!mainpage) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      mainpage.style.backgroundPosition = `${50 + x * 2}% ${50 + y * 2}%`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
 
  
  return (
    <div className={`mainpage ${loaded ? 'loaded' : ''}`}>
      <video autoPlay loop muted className="background-video">
        <source src="/video.mp4" type="video/mp4" /> {/* Replace with your video path */}
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      
      <div className="content-container">
        <h1 className="title">
          <span>V</span>
          <span>I</span>
          <span>N</span>
          <span>N</span>
          <span>U</span>
          <span className="text-highlight">AI</span>
        </h1>
        
        <p className="caption">Code with Purpose</p>

        <div className="outer">
          <div className="dot"></div>
          <div className="card">
            <div className="ray"></div>
            <div className="text">vinnuAI</div>
            <button type="button" className="btn" onClick={()=>navigate("/chat")}>
              <strong>chat</strong>
              <div id="container-stars">
                <div id="stars"></div>
              </div>
              <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </button>
            <div className="line topl"></div>
            <div className="line leftl"></div>
            <div className="line bottoml"></div>
            <div className="line rightl"></div>
          </div>
        </div>

        


      </div>
    </div>
  );
}
