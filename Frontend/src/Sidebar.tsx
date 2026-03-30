import { useState, useEffect } from "react";
import { Eye, Zap, Shield, User, LogOut, Plus, DoorOpen, Lock, Unlock, Copy, Check } from "lucide-react";

type Props = {
  user: string | null;
  setUser: (u: string | null) => void;
  setRoom: (r: string | null) => void;
  setRoomType: (t: "public" | "private") => void;
};

export default function Sidebar({
  user,
  setUser,
  setRoom,
  setRoomType,
}: Props) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [roomInput, setRoomInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [pendingRoom, setPendingRoom] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const FRONTEND_URL =
    import.meta.env.VITE_FRONTEND_URL || window.location.origin;

  // 🔥 load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.username);
    }
  }, []);

  // 🔐 SIGNUP
  const handleSignup = () => {
    if (!username || !email || !password) return;

    const userData = {
      username,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(username);
  };

  // 🔐 SIGNIN
  const handleSignin = () => {
    if (!username || !password) return;

    const stored = localStorage.getItem("user");
    if (!stored) return alert("No account found");

    const parsed = JSON.parse(stored);

    if (parsed.username !== username || parsed.password !== password) {
      alert("Invalid credentials");
      return;
    }

    setUser(parsed.username);
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // 🏠 CREATE ROOM
  const handleCreateRoom = () => {
    if (!roomInput.trim()) return;

    setRoom(roomInput.trim());
    setRoomType(isPrivate ? "private" : "public");
  };

  // 🚪 JOIN ROOM
  const handleJoinRoom = () => {
    if (!roomInput.trim()) return;

    if (isPrivate) {
      setPendingRoom(roomInput.trim());
      setShowPopup(true);
    } else {
      setRoom(roomInput.trim());
    }
  };

  const approveJoin = () => {
    if (pendingRoom) setRoom(pendingRoom);
    setShowPopup(false);
  };

  const rejectJoin = () => setShowPopup(false);

  const inviteLink = `${FRONTEND_URL}?room=${roomInput || "ROOM"}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 🔥 SIDEBAR CARD - BlinkRoom Design */}
      <div className="sidebar-container ">
        {/* Gradient border effect */}
        <div className="sidebar-glow"></div>
        
        <div className="sidebar-content">
          {!user ? (
            <>
              <div className="sidebar-header">
                <div className="sidebar-logo">
                  <div className="sidebar-logo-icon">B</div>
                  <span className="sidebar-logo-text">BlinkRoom</span>
                </div>
                <p className="sidebar-subtitle">
                  {mode === "signin" ? "Welcome back" : "Join the ephemeral experience"}
                </p>
              </div>

              <div className="sidebar-form">
                {/* USERNAME */}
                <div className="input-group">
                  <User size={16} className="input-icon" />
                  <input
                    className="sidebar-input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* EMAIL (ONLY SIGNUP) */}
                {mode === "signup" && (
                  <div className="input-group">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <input
                      className="sidebar-input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                )}

                {/* PASSWORD */}
                <div className="input-group">
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type="password"
                    className="sidebar-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* BUTTON */}
                <button
                  className="sidebar-btn-primary"
                  onClick={mode === "signin" ? handleSignin : handleSignup}
                >
                  {mode === "signin" ? "Sign In" : "Sign Up"}
                </button>

                {/* TOGGLE */}
                <p className="sidebar-toggle">
                  {mode === "signin"
                    ? "No account?"
                    : "Already have an account?"}
                  <span
                    className="sidebar-toggle-link"
                    onClick={() =>
                      setMode(mode === "signin" ? "signup" : "signin")
                    }
                  >
                    {mode === "signin" ? "Sign Up" : "Sign In"}
                  </span>
                </p>
              </div>

              {/* Feature badges */}
              <div className="sidebar-features">
                <div className="sidebar-feature"><Eye size={12} /> No tracking</div>
                <div className="sidebar-feature"><Zap size={12} /> Instant vanish</div>
                <div className="sidebar-feature"><Shield size={12} /> Encrypted</div>
              </div>
            </>
          ) : (
            <>
              {/* DASHBOARD */}
              <div className="sidebar-header">
                <div className="sidebar-logo">
                  <div className="sidebar-logo-icon">B</div>
                  <span className="sidebar-logo-text">BlinkRoom</span>
                </div>
                <div className="sidebar-user-badge">
                  <User size={14} />
                  <span>{user}</span>
                </div>
              </div>

              <div className="sidebar-form">
                <div className="input-group">
                  <DoorOpen size={16} className="input-icon" />
                  <input
                    className="sidebar-input"
                    placeholder="Room name"
                    value={roomInput}
                    onChange={(e) => setRoomInput(e.target.value)}
                  />
                </div>

                {/* PRIVATE TOGGLE */}
                <div className="sidebar-checkbox-group">
                  <label className="sidebar-checkbox-label">
                    <input
                      type="checkbox"
                      checked={isPrivate}
                      onChange={() => setIsPrivate(!isPrivate)}
                      className="sidebar-checkbox"
                    />
                    <span className="sidebar-checkbox-text">
                      {isPrivate ? <Lock size={14} /> : <Unlock size={14} />}
                      Private Room
                    </span>
                  </label>
                </div>

                {/* BUTTONS */}
                <div className="sidebar-button-group">
                  <button
                    className="sidebar-btn-create"
                    onClick={handleCreateRoom}
                  >
                    <Plus size={16} />
                    Create
                  </button>

                  <button
                    className="sidebar-btn-join"
                    onClick={handleJoinRoom}
                  >
                    <DoorOpen size={16} />
                    Join
                  </button>
                </div>

                {/* LINK */}
                {roomInput && (
                  <div className="sidebar-link-container">
                    <div className="sidebar-link-label">Invite link</div>
                    <div className="sidebar-link-wrapper">
                      <div className="sidebar-link">{inviteLink}</div>
                      <button
                        className="sidebar-copy-btn"
                        onClick={copyToClipboard}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* LOGOUT */}
              <button
                className="sidebar-btn-logout"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* 🔥 TOAST POPUP */}
      {showPopup && (
        <div className="popup-toast">
          <div className="popup-content">
            <p className="popup-text">
              Request to join <strong>{pendingRoom}</strong>
            </p>
            <div className="popup-buttons">
              <button
                className="popup-btn-approve"
                onClick={approveJoin}
              >
                Approve
              </button>
              <button
                className="popup-btn-reject"
                onClick={rejectJoin}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Sidebar Container */
        .sidebar-container {
          position: relative;
          width: 300px;
          min-height: 500px;
          background: #000000;
          border-radius: 1rem;
          margin-top: 2rem;
          margin-left: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .sidebar-glow {
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 1px;
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(6, 182, 212, 0.3));
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .sidebar-content {
          position: relative;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 500px;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 1rem;
          backdrop-filter: blur(20px);
        }

        /* Header */
        .sidebar-header {
          margin-bottom: 1.5rem;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .sidebar-logo-icon {
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

        .sidebar-logo-text {
          font-weight: bold;
          font-size: 1.125rem;
          background: linear-gradient(135deg, #ffffff, #e5e7eb);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .sidebar-subtitle {
          font-size: 0.75rem;
          color: #9ca3af;
          margin-top: 0.5rem;
        }

        .sidebar-user-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(147, 51, 234, 0.2);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 9999px;
          padding: 0.375rem 0.75rem;
          font-size: 0.75rem;
          color: #c084fc;
          margin-top: 0.5rem;
        }

        /* Form */
        .sidebar-form {
          flex: 1;
        }

        .input-group {
          position: relative;
          margin-bottom: 0.75rem;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          z-index: 10;
        }

        .sidebar-input {
          width: 100%;
          padding: 0.625rem 0.75rem 0.625rem 2.25rem;
          background: rgba(39, 39, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: #ffffff;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .sidebar-input:focus {
          outline: none;
          border-color: #9333ea;
          box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.2);
        }

        .sidebar-input::placeholder {
          color: #6b7280;
        }

        /* Buttons */
        .sidebar-btn-primary {
          width: 100%;
          padding: 0.625rem;
          background: linear-gradient(135deg, #9333ea, #06b6d4);
          border: none;
          border-radius: 0.5rem;
          color: white;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 0.5rem;
        }

        .sidebar-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
        }

        .sidebar-toggle {
          text-align: center;
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 1rem;
        }

        .sidebar-toggle-link {
          color: #60a5fa;
          cursor: pointer;
          margin-left: 0.25rem;
        }

        .sidebar-toggle-link:hover {
          text-decoration: underline;
        }

        /* Features */
        .sidebar-features {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar-feature {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.625rem;
          color: #6b7280;
        }

        /* Checkbox */
        .sidebar-checkbox-group {
          margin-bottom: 1rem;
        }

        .sidebar-checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.75rem;
          color: #9ca3af;
        }

        .sidebar-checkbox {
          width: 1rem;
          height: 1rem;
          cursor: pointer;
          accent-color: #9333ea;
        }

        .sidebar-checkbox-text {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* Button Group */
        .sidebar-button-group {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .sidebar-btn-create {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem;
          background: rgba(34, 197, 94, 0.2);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 0.5rem;
          color: #4ade80;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sidebar-btn-create:hover {
          background: rgba(34, 197, 94, 0.3);
          transform: translateY(-1px);
        }

        .sidebar-btn-join {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem;
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 0.5rem;
          color: #60a5fa;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sidebar-btn-join:hover {
          background: rgba(59, 130, 246, 0.3);
          transform: translateY(-1px);
        }

        .sidebar-btn-logout {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 0.5rem;
          color: #f87171;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 1rem;
        }

        .sidebar-btn-logout:hover {
          background: rgba(239, 68, 68, 0.3);
          transform: translateY(-1px);
        }

        /* Link Container */
        .sidebar-link-container {
          margin-top: 1rem;
        }

        .sidebar-link-label {
          font-size: 0.625rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .sidebar-link-wrapper {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          background: rgba(39, 39, 42, 0.6);
          border-radius: 0.5rem;
          padding: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sidebar-link {
          flex: 1;
          font-size: 0.625rem;
          color: #9ca3af;
          font-family: monospace;
          overflow-x: auto;
          white-space: nowrap;
        }

        .sidebar-copy-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 0.25rem;
          padding: 0.25rem 0.5rem;
          color: #9ca3af;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sidebar-copy-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        /* Popup Toast */
        .popup-toast {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 50;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .popup-content {
          background: rgba(24, 24, 27, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 0.75rem;
          padding: 1rem;
          width: 260px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
        }

        .popup-text {
          font-size: 0.875rem;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }

        .popup-text strong {
          color: #c084fc;
        }

        .popup-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .popup-btn-approve {
          flex: 1;
          padding: 0.375rem;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border: none;
          border-radius: 0.375rem;
          color: white;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .popup-btn-approve:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
        }

        .popup-btn-reject {
          flex: 1;
          padding: 0.375rem;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 0.375rem;
          color: #f87171;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .popup-btn-reject:hover {
          background: rgba(239, 68, 68, 0.3);
        }
      `}</style>
    </>
  );
}