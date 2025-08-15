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
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

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

  // Auto-scroll only within the chat container
  useEffect(() => {
    if (chatContainerRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "end",
        inline: "nearest"
      });
    }
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-purple-50 pt-20">
      {!inRoom ? (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Discussion Rooms</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join conversations with like-minded people in our community spaces
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {rooms.map(r => (
              <div
                key={r._id}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/20 hover:bg-white/90 group"
                onClick={() => handleRoomSelect(r.name)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{r.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                    Online
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                  {r.name}
                </h3>
                <p className="text-gray-600 text-sm">Join the conversation</p>
              </div>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Room</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Room name..."
                value={newRoomName}
                onChange={e => setNewRoomName(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/90"
              />
              <button
                onClick={handleCreateRoom}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm sticky top-0 z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 container mx-auto">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLeaveRoom} 
                  className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  <span className="text-xl">&larr;</span>
                  <span className="hidden sm:inline">Back to Rooms</span>
                  <span className="sm:hidden">Back</span>
                </button>
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{currentRoom.charAt(0).toUpperCase()}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{currentRoom}</h2>
              </div>
              <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-green-700">
                  {onlineCount} {onlineCount === 1 ? 'person' : 'people'} online
                </span>
              </div>
            </div>
          </div>

          {/* Chat Messages Container - This is where scrolling is constrained */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white"
            style={{ maxHeight: 'calc(100vh - 140px)' }}
          >
            <div className="container mx-auto px-4 py-6 space-y-4 max-w-4xl">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.username === username ? "justify-end" : "justify-start"} animate-fade-in-up`}
                >
                  <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[70%]">
                    {msg.username !== username && (
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {(msg.username || 'A').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-md ${
                        msg.username === username
                          ? "bg-gradient-to-br from-teal-600 to-emerald-600 text-white rounded-br-sm"
                          : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                      }`}
                    >
                      <div className={`text-xs mb-1 ${msg.username === username ? 'text-teal-100' : 'text-gray-500'}`}>
                        {msg.username} • {timeago.format(msg.timestamp || Date.now())}
                      </div>
                      <div className="text-sm leading-relaxed">{msg.text}</div>
                    </div>
                    {msg.username === username && (
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {(msg.username || 'Y').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typingUser && (
                <div className="flex justify-start animate-pulse">
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">{typingUser} is typing...</span>
                  </div>
                </div>
              )}

              {/* This div ensures smooth scrolling within the chat container only */}
              <div ref={messagesEndRef} className="h-1" />
            </div>
          </div>

          {/* Message Input - Fixed at bottom */}
          <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200/50 shadow-lg">
            <div className="container mx-auto px-4 py-4 max-w-4xl">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={handleTyping}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-sm resize-none"
                />
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}