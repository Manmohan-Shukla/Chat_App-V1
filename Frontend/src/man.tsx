import { useState } from "react";

import App from "./App";
import Sidebar from "./Sidebar";
function Appa() {
  const [user, setUser] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);
 const [roomType, setRoomType] = useState<"public" | "private">("public");

  return (
    <div className="h-screen bg-stone-950 flex justify-center items-center">
      {/* 🔥 IF NOT IN ROOM → SHOW SIDEBAR */}
      {!room && (
        <Sidebar
          user={user}
          setUser={setUser}
          setRoom={setRoom}
          setRoomType={setRoomType}
        />
      )}

      {/* 🔥 IF IN ROOM → SHOW CHAT */}
      {room && (
        <App
          roomi={room}
          leaveRoom={() => setRoom(null)}
          roomType={roomType}
        />
      )}
    </div>
  );
}

export default Appa;

