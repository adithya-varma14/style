import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import io, { Socket } from "socket.io-client";
import * as timeago from "timeago.js";
import axios from "axios";
import "./style.css";

interface ChatMessage {
  username?: string;
  text: string;
  timestamp?: number;
}

interface Room {
  _id: string;
  name: string;
}

type ServerToClientEvents = {
  "message history": (msgs: ChatMessage[]) => void;
  "chat message": (msg: ChatMessage) => void;
  "show typing": (name: string) => void;
  "hide typing": () => void;
  "room list": (rooms: Room[]) => void;
  "online count": (data: { room: string; count: number }) => void;
};

type ClientToServerEvents = {
  "chat message": (msg: { username: string; text: string; room: string }) => void;
  "join room": (data: { username: string; room: string }) => void;
  typing: (data: { username: string; room: string }) => void;
  "stop typing": (data: { room: string }) => void;
};

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:5000");

export default function ChatApp() {
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const [typingUser, setTypingUser] = useState<string>("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [newRoomName, setNewRoomName] = useState<string>("");
  const [inRoom, setInRoom] = useState<boolean>(false);
  const [onlineCount, setOnlineCount] = useState<number>(0);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const name = prompt("Enter your name:") || "Anonymous";
    setUsername(name);
  }, []);

  useEffect(() => {
    axios.get<Room[]>("http://localhost:5000/api/rooms").then(res => {
      setRooms(res.data);
    });
  }, [username]);

  useEffect(() => {
    socket.on("message history", msgs => setMessages(msgs));
    socket.on("chat message", msg => {
      setMessages(prev => [...prev, msg]);
      setTypingUser("");
    });
    socket.on("show typing", name => {
      if (name !== username) setTypingUser(name);
    });
    socket.on("hide typing", () => setTypingUser(""));
    socket.on("room list", updatedRooms => setRooms(updatedRooms));
    socket.on("online count", ({ room, count }) => {
      if (room === currentRoom) setOnlineCount(count);
    });

    return () => {
      socket.off();
    };
  }, [username, currentRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUser]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      socket.emit("chat message", { username, text: messageText, room: currentRoom });
      setMessageText("");
      socket.emit("stop typing", { room: currentRoom });
    }
  };

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
    socket.emit("typing", { username, room: currentRoom });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop typing", { room: currentRoom });
    }, 1500);
  };

  const handleRoomSelect = (roomName: string) => {
    setCurrentRoom(roomName);
    setMessages([]);
    socket.emit("join room", { username, room: roomName });
    setInRoom(true);
  };

  const handleLeaveRoom = () => {
    setCurrentRoom("");
    setInRoom(false);
    setMessages([]);
    setOnlineCount(0);
  };

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;
    await axios.post("http://localhost:5000/api/rooms", { name: newRoomName });
    setNewRoomName("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {!inRoom ? (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Available Rooms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {rooms.map(r => (
              <div
                key={r._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleRoomSelect(r.name)}
              >
                <h3 className="text-xl font-semibold text-gray-800">{r.name}</h3>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white rounded-lg shadow-md flex gap-2">
            <input
              type="text"
              placeholder="Create new room..."
              value={newRoomName}
              onChange={e => setNewRoomName(e.target.value)}
              className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleCreateRoom}
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          <div className="p-4 border-b flex justify-between items-center bg-white shadow-sm">
            <button onClick={handleLeaveRoom} className="text-blue-500 hover:text-blue-700">
              &larr; Back
            </button>
            <h2 className="text-xl font-bold">{currentRoom}</h2>
            <span className="text-sm text-gray-500">{onlineCount} online</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.username === username ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg shadow-sm ${
                    msg.username === username
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div className="text-xs opacity-70">
                    {msg.username} • {timeago.format(msg.timestamp || Date.now())}
                  </div>
                  <div>{msg.text}</div>
                </div>
              </div>
            ))}
            {typingUser && (
              <div className="text-center text-gray-400 text-sm animate-pulse">
                💬 {typingUser} is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2 bg-white">
            <input
              type="text"
              autoComplete="off"
              placeholder="Type your message..."
              value={messageText}
              onChange={handleTyping}
              className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
