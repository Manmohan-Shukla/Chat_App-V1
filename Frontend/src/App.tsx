import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ChatIcon } from "./assets/chatIcon";
import { DuplicateIcon } from "./assets/duplicateIcon";
import { Button } from "./button";
import { LogOut } from "lucide-react";

type Message = {
  text: string;
  isMe: boolean;
};
type Props = {
  roomi: string;
  leaveRoom: () => void;
  roomType: "public" | "private";
};
function Appe({ roomi, leaveRoom }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [copied, setCopied] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const lastSentRef = useRef<string | null>(null);

  const roomCode = roomi;
  const inviteLink = `${window.location.origin}?room=${roomCode}`;

  const outgoingColor = "hsl(160, 40%, 70%)";
  const incomingColor = "#e5e7eb";

  useEffect(() => {
    const WS_URL =
      import.meta.env.VITE_BACKEND_URL ||
      "wss://chat-app-v1-backend.onrender.com";
console.log("Connecting to WebSocket at:", WS_URL);
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      const incoming = event.data;

      if (incoming === lastSentRef.current) {
        lastSentRef.current = null;
        return;
      }

      setMessages((prev) => [
        ...prev,
        { text: incoming, isMe: false },
      ]);
    };

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: { roomId: roomCode },
        })
      );
    };

    wsRef.current = ws;

    return () => ws.close();
  }, []);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // copy
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  

  // send
  const sendMessage = () => {
    const message = inputRef.current?.value;

    if (!message || !wsRef.current) return;
    if (wsRef.current.readyState !== WebSocket.OPEN) return;

    lastSentRef.current = message;

    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: { message },
      })
    );

    setMessages((prev) => [
      ...prev,
      { text: message, isMe: true },
    ]);

    inputRef.current!.value = "";
  };

  return (
    <div className="h-screen bg-stone-950 flex justify-center items-center">
      <div className="rounded-xl border bg-card border-zinc-800 shadow w-[40vw] px-4 flex flex-col">

        {/* Header */}
        <div>
          <div className="flex items-center">
            <div className="text-white px-2 pt-4">
              <ChatIcon />
            </div>
            <div className="text-white text-3xl mt-4">
              Real Time Chat
            </div>
          </div>

          <div className="text-zinc-600 pl-2 mb-2">
            temporary room that expires after all users exit
          </div>

          <div className="flex p-4 justify-between items-center">
            <div
              onClick={() => copyToClipboard(inviteLink)}
              className="text-zinc-600 h-10 bg-zinc-900 pl-4 flex items-center cursor-pointer hover:bg-zinc-800 pr-4 rounded-lg"
            >
              {copied ? "Copied!" : `Room: ${roomCode}`}
              <DuplicateIcon />
            </div>
<button
          onClick={leaveRoom}
          className="px-3 py-1 rounded-full bg-red-600/70 hover:bg-red-600 text-white"
        >
          <LogOut size={18} />
        </button>
            



          </div>
        </div>

        {/* Chat Box */}
        <div className="h-[450px] min-h-[450px] max-h-[450px] bg-zinc-900 my-4 rounded-lg overflow-y-auto p-3 pb-6 flex flex-col scrollbar-hide">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-3 ${
                msg.isMe ? "justify-start" : "justify-end"
              }`}
            >
              <div
                style={{
                  backgroundColor: msg.isMe
                    ? outgoingColor
                    : incomingColor,
                }}
                className="px-4 py-2 rounded-xl max-w-[60%] text-black"
              >
                {msg.text}
              </div>
            </div>
          ))}

          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div className="flex">
          <div className="w-5/6 mb-4">
            <input
              type="text"
              ref={inputRef}
              className="p-2 text-white w-full bg-zinc-900 rounded-md border-zinc-800"
              placeholder="Type a message ..."
            />
          </div>

          <div className="w-1/6 mb-4">
            <Button text="Send" onClick={sendMessage} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Appe;