import React, { useEffect, useRef } from 'react';
import { ArrowRight, Eye, Zap, Shield, Users, XCircle, Moon, Sun, Sparkles, Clock } from 'lucide-react';

const BlinkRoomLanding: React.FC = () => {
  // Refs for scroll reveal animations
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = [featuresRef.current, stepsRef.current, ctaRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="blinkroom-container">
      {/* Gradient background glow */}
      <div className="gradient-bg">
        <div className="gradient-blur-1"></div>
        <div className="gradient-blur-2"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <div className="logo-icon">B</div>
            <span className="logo-text">BlinkRoom</span>
          </div>
          <div className="nav-links">
            <a href="" className="nav-link">Concept</a>
            <a href="#" className="nav-link">How it works</a>
            <a href="#" className="nav-link">Rooms</a>
          </div>
          <button  onClick={() => window.location.href = `${window.location.origin}/Login` }className="btn-launch">Launch Room</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Ephemeral Spaces, Real Connections</span>
          </div>
          <h1 className="hero-title">
            Rooms that exist
            <span className="hero-title-gradient">
              only while you're inside.
            </span>
          </h1>
          <p className="hero-description">
            BlinkRoom creates vanishing digital spaces. No history, no traces — just pure presence. When the last person leaves, the room blinks out of existence.
          </p>
          <div className="hero-buttons">
            <button onClick={() => window.location.href = `${window.location.origin}/Login` } className="btn-primary">
              Start a BlinkRoom <ArrowRight size={20} />
            </button>
            <button className="btn-secondary">
              Watch Demo
            </button>
          </div>
          <div className="hero-features">
            <div className="hero-feature"><Eye size={16} /> No tracking</div>
            <div className="hero-feature"><Zap size={16} /> Instant vanish</div>
            <div className="hero-feature"><Shield size={16} /> Encrypted</div>
          </div>
        </div>
        <div className="scroll-hint">
          <div className="scroll-hint-wheel"></div>
        </div>
      </section>

      {/* Features Section */} 
      <div ref={featuresRef} className="reveal-section">
        <section className="features">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Ephemeral by design</h2>
              <p className="section-subtitle">Rooms that fade like memories — here now, gone when you leave.</p>
            </div>
            <div className="features-grid">
              {[
                {
                  icon: <XCircle size={32} />,
                  title: "Auto-vanishing",
                  desc: "When the last member exits, the room is permanently deleted. No archives, no backups.",
                  color: "feature-1"
                },
                {
                  icon: <Clock size={32} />,
                  title: "Time-limited invites",
                  desc: "Links self-destruct after use or expire in minutes. Control who enters, always.",
                  color: "feature-2"
                },
                {
                  icon: <Shield size={32} />,
                  title: "Zero-knowledge",
                  desc: "End-to-end encryption with no server logs. What happens in the room, stays in the moment.",
                  color: "feature-3"
                }
              ].map((feat, idx) => (
                <div key={idx} className={`feature-card ${feat.color}`}>
                  <div className="feature-icon">{feat.icon}</div>
                  <h3 className="feature-title">{feat.title}</h3>
                  <p className="feature-desc">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Sticky + Reveal Immersive Section */}
      <section className="immersive">
        <div className="container immersive-grid">
          <div className="immersive-content">
            <div className="immersive-badge">✦ The Blink Principle</div>
            <h2 className="immersive-title">
              Presence is the only persistence.
            </h2>
            <p className="immersive-text">
              No databases storing your conversations. No "rooms" waiting empty. Every BlinkRoom is a living moment — it exists only when minds meet. When silence falls, so does the room.
            </p>
            <div className="immersive-stats">
              <div className="immersive-stat"><Users size={18} /> Active rooms = active minds</div>
              <div className="immersive-stat"><Sun size={18} /> Born & die in real-time</div>
            </div>
          </div>
          <div className="immersive-visual">
            <div className="visual-container">
              <div className="visual-pulse"></div>
              <div className="visual-core">
                <span className="visual-symbol">⟳</span>
              </div>
              <div className="visual-caption">Room ID: blink_7f3a • expires when empty</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works steps */}
      <div ref={stepsRef} className="reveal-section">
        <section className="steps">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Start a moment, watch it fade</h2>
              <p className="section-subtitle">Three steps to ephemeral connection.</p>
            </div>
            <div className="steps-grid">
              {[
                { step: "01", title: "Create BlinkLink", desc: "Generate a temporary room link with optional time-to-live. Share it privately.", icon: <Zap size={24} /> },
                { step: "02", title: "Enter Together", desc: "Once the first person joins, the room awakens. Invite others before it vanishes.", icon: <Users size={24} /> },
                { step: "03", title: "Leave & Erase", desc: "When the last person exits, the room blinks out — forever. No traces, no leftovers.", icon: <Moon size={24} /> }
              ].map((item, idx) => (
                <div key={idx} className="step-card">
                  <div className="step-number">{item.step}</div>
                  <div className="step-icon">{item.icon}</div>
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Immersive full-width story block */}
      <section className="story-block">
        <div className="story-content">
          <blockquote className="story-quote">
            "Rooms shouldn't outlive the people in them. BlinkRoom returns digital spaces to their natural state: <span className="story-highlight">nothingness</span>."
          </blockquote>
          <div className="story-attribution">— The Ephemeral Manifesto</div>
        </div>
      </section>

      {/* CTA Section */}
      <div ref={ctaRef} className="reveal-section">
        <section className="cta">
          <div className="cta-card">
            <h2 className="cta-title">Rooms are waiting to blink.</h2>
            <p className="cta-text">
              Start your first ephemeral room. It will exist only as long as you're there — and disappear when you leave.
            </p>
            <div className="cta-buttons">
              <button className="btn-cta-primary">
                Launch a BlinkRoom <ArrowRight size={18} />
              </button>
              <button className="btn-cta-secondary">
                Learn the protocol
              </button>
            </div>
            <div className="cta-features">
              <span>⚡ No signup required</span>
              <span>🌀 Auto-destruct on empty</span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="footer-logo-icon">B</div>
            <span>BlinkRoom — ephemeral spaces</span>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Twitter</a>
          </div>
          <div className="footer-copyright">© 2025 BlinkRoom — rooms that exist only while inside</div>
        </div>
      </footer>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background: #000000;
          color: #ffffff;
          overflow-x: hidden;
        }

        /* Container */
        .blinkroom-container {
          position: relative;
          min-height: 100vh;
          background: #000000;
        }

        /* Gradient Background */
        .gradient-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .gradient-blur-1 {
          position: absolute;
          top: 0;
          left: -160px;
          width: 320px;
          height: 320px;
          background: #9333ea;
          border-radius: 50%;
          filter: blur(96px);
          opacity: 0.2;
          animation: pulse 4s ease-in-out infinite;
        }

        .gradient-blur-2 {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 384px;
          height: 384px;
          background: #06b6d4;
          border-radius: 50%;
          filter: blur(96px);
          opacity: 0.2;
          animation: pulse 4s ease-in-out infinite 1s;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #9333ea, #06b6d4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.125rem;
          box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
        }

        .logo-text {
          font-weight: bold;
          font-size: 1.25rem;
          letter-spacing: -0.025em;
          background: linear-gradient(135deg, #ffffff, #e5e7eb);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .nav-links {
          display: none;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .nav-links {
            display: flex;
          }
        }

        .nav-link {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #ffffff;
        }

        .btn-launch {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(4px);
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.2s;
          color: white;
        }

        .btn-launch:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Hero Section */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 1.5rem 5rem;
          z-index: 10;
        }

        .hero-content {
          max-width: 1152px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(4px);
          border-radius: 9999px;
          padding: 0.375rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 2rem;
          font-size: 0.875rem;
          color: #d1d5db;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: bold;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 4.5rem;
          }
        }

        @media (min-width: 1024px) {
          .hero-title {
            font-size: 6rem;
          }
        }

        .hero-title-gradient {
          display: block;
          background: linear-gradient(135deg, #c084fc, #22d3ee, #c084fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientX 3s ease infinite;
        }

        @keyframes gradientX {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-description {
          font-size: 1.125rem;
          color: #9ca3af;
          max-width: 672px;
          margin: 0 auto 2.5rem;
        }

        @media (min-width: 768px) {
          .hero-description {
            font-size: 1.25rem;
          }
        }

        .hero-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
        }

        @media (min-width: 640px) {
          .hero-buttons {
            flex-direction: row;
          }
        }

        .btn-primary {
          background: linear-gradient(135deg, #9333ea, #06b6d4);
          padding: 1rem 2rem;
          border-radius: 9999px;
          font-weight: 500;
          font-size: 1.125rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
          box-shadow: 0 4px 20px rgba(147, 51, 234, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(147, 51, 234, 0.4);
        }

        .btn-secondary {
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: transparent;
          backdrop-filter: blur(4px);
          padding: 1rem 2rem;
          border-radius: 9999px;
          font-weight: 500;
          font-size: 1.125rem;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .hero-features {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .hero-feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }

        .scroll-hint-wheel {
          width: 24px;
          height: 40px;
          border: 2px solid #6b7280;
          border-radius: 9999px;
          display: flex;
          justify-content: center;
        }

        .scroll-hint-wheel::before {
          content: '';
          width: 4px;
          height: 12px;
          background: #9ca3af;
          border-radius: 9999px;
          margin-top: 8px;
          animation: pulse 1.5s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }

        /* Container */
        .container {
          max-width: 1152px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Section Header */
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 1.875rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        @media (min-width: 768px) {
          .section-title {
            font-size: 2.25rem;
          }
        }

        .section-subtitle {
          color: #9ca3af;
          font-size: 1.125rem;
          max-width: 672px;
          margin: 0 auto;
        }

        /* Features */
        .features {
          padding: 6rem 0;
          position: relative;
          z-index: 10;
        }

        .features-grid {
          display: grid;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .feature-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 2rem;
          backdrop-filter: blur(4px);
          transition: transform 0.3s;
        }

        .feature-card:hover {
          transform: scale(1.02);
        }

        .feature-1 {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(249, 115, 22, 0.1));
        }

        .feature-2 {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1));
        }

        .feature-3 {
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1));
        }

        .feature-icon {
          margin-bottom: 1rem;
          color: #c084fc;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .feature-desc {
          color: #9ca3af;
        }

        /* Immersive Section */
        .immersive {
          padding: 6rem 0;
          position: relative;
          z-index: 10;
        }

        .immersive-grid {
          display: grid;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 768px) {
          .immersive-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .immersive-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 9999px;
          padding: 0.25rem 1rem;
          font-size: 0.875rem;
          font-family: monospace;
          color: #22d3ee;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 1.5rem;
        }

        .immersive-title {
          font-size: 1.875rem;
          font-weight: bold;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .immersive-title {
            font-size: 2.25rem;
          }
        }

        .immersive-text {
          color: #9ca3af;
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
        }

        .immersive-stats {
          display: flex;
          gap: 1rem;
          padding-top: 1rem;
        }

        .immersive-stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #c084fc;
        }

        .immersive-visual {
          position: relative;
          height: 400px;
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
        }

        .visual-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .visual-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(147, 51, 234, 0.3);
          filter: blur(32px);
          width: 192px;
          height: 192px;
          margin: auto;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .visual-core {
          position: absolute;
          inset: 1rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #9333ea, #06b6d4);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 192px;
          height: 192px;
          margin: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .visual-symbol {
          font-size: 3rem;
          font-weight: bold;
          position: relative;
          z-index: 10;
        }

        .visual-caption {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          text-align: center;
          font-size: 0.75rem;
          color: #6b7280;
          font-family: monospace;
        }

        /* Steps */
        .steps {
          padding: 6rem 0;
          position: relative;
          z-index: 10;
        }

        .steps-grid {
          display: grid;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .steps-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .step-card {
          position: relative;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 2rem;
          backdrop-filter: blur(4px);
          transition: all 0.2s;
        }

        .step-card:hover {
          border-color: rgba(147, 51, 234, 0.5);
        }

        .step-number {
          position: absolute;
          top: -1rem;
          left: 1.5rem;
          background: linear-gradient(135deg, #9333ea, #06b6d4);
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.875rem;
        }

        .step-icon {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #c084fc;
        }

        .step-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .step-desc {
          color: #9ca3af;
        }

        /* Story Block */
        .story-block {
          position: relative;
          padding: 8rem 1.5rem;
          margin: 3rem 0;
          overflow: hidden;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E");
        }

        .story-content {
          position: relative;
          z-index: 10;
          max-width: 896px;
          margin: 0 auto;
          text-align: center;
        }

        .story-quote {
          font-size: 1.5rem;
          font-weight: 300;
          font-style: italic;
          color: #e5e7eb;
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .story-quote {
            font-size: 1.875rem;
          }
        }

        .story-highlight {
          color: #c084fc;
          font-weight: 500;
        }

        .story-attribution {
          font-size: 0.875rem;
          color: #6b7280;
        }

        /* CTA */
        .cta {
          padding: 6rem 1.5rem;
          position: relative;
          z-index: 10;
        }

        .cta-card {
          max-width: 896px;
          margin: 0 auto;
          text-align: center;
          background: linear-gradient(135deg, rgba(88, 28, 135, 0.3), rgba(0, 0, 0, 0.8), rgba(8, 145, 178, 0.3));
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 3rem;
          backdrop-filter: blur(4px);
        }

        .cta-title {
          font-size: 1.875rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .cta-title {
            font-size: 3rem;
          }
        }

        .cta-text {
          color: #d1d5db;
          font-size: 1.125rem;
          margin-bottom: 2rem;
          max-width: 576px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        @media (min-width: 640px) {
          .cta-buttons {
            flex-direction: row;
          }
        }

        .btn-cta-primary {
          background: #ffffff;
          color: #000000;
          padding: 1rem 2rem;
          border-radius: 9999px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cta-primary:hover {
          background: #e5e7eb;
        }

        .btn-cta-secondary {
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: transparent;
          padding: 1rem 2rem;
          border-radius: 9999px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
        }

        .btn-cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .cta-features {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          font-size: 0.75rem;
          color: #6b7280;
        }

        /* Footer */
        .footer {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 3rem 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .footer-content {
          max-width: 1152px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-logo-icon {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #9333ea, #06b6d4);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .footer-links {
          display: flex;
          gap: 1.5rem;
        }

        .footer-link {
          color: #6b7280;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: #ffffff;
        }

        /* Reveal animations */
        .reveal-section {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.7s ease-out;
        }

        .opacity-100 {
          opacity: 1;
        }

        .translate-y-0 {
          transform: translateY(0);
        }

        .opacity-0 {
          opacity: 0;
        }

        .translate-y-10 {
          transform: translateY(40px);
        }

        .delay-200 {
          transition-delay: 0.2s;
        }

        .delay-300 {
          transition-delay: 0.3s;
        }

        .delay-400 {
          transition-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default BlinkRoomLanding;