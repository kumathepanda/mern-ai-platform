import { useAuth } from "../../context/AuthContext";
import ChatItem from "../components/Chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { getUserChats, sendChatRequest } from "../../helpers/api-communicator";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'
import { deleteUserChats } from "../../helpers/api-communicator";
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const auth = useAuth();

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages]);

  const handleSubmit = async () => {
    const content = inputValue.trim();
    if (!content) return;

    setInputValue("");

    const newMessage: ChatMessage = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      const chatData = await sendChatRequest(content);
      setChatMessages((prev) => [...prev, ...chatData.chats]);
    } catch (error) {
      console.error("Chat API error:", error);
    }
  };
const handleDeleteChats = async () => {
  try {
    toast.loading("Deleting your chats...", {id:"deleting-chats"});
    await deleteUserChats();
    setChatMessages([]);
    toast.success("Chats Deleted Successfully", {id:"deleting-chats"});
  } catch (error) {
    console.log(error);
    toast.error("Unable to delete chats", {id:"deleting-chats"});
    
  }
}

  useLayoutEffect(() => {
    if(auth?.isLoggedIn && auth?.user)
    {
      toast.loading("loading your chats...", {id:"loading-chats"});
      getUserChats().then((data)=>{
        setChatMessages([...data.chats]);
        toast.success("Chats Loaded Successfully", {id:"loading-chats"});
      }).catch(err=>{
        console.log(err);
        toast.error("Unable to load chats", {id:"loading-chats"});
      })
    }
  },[auth])

  useEffect(() => {
    const checkAuth = async () => {
      if (!auth?.user) {
        navigate('/login');
      }
    };
  
    checkAuth();
  }, [auth]);
  

  return (
    <div className="flex flex-col md:flex-row w-full h-full mt-4 gap-3 px-4">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col items-center w-1/5">
        <div className="bg-[#111C27] rounded-2xl h-[60vh] w-full p-6 text-center shadow-lg">
          <div className="bg-white text-black font-bold w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
            {auth?.user?.name?.split(" ").map((word) => word[0]).join("").toUpperCase()}
          </div>

          <p className="text-white font-varela mb-4">
            Welcome, {auth?.user?.name}! Have fun chatting with the bot!
          </p>

          <button
            className="w-full bg-purple-700 text-white font-bold py-2 rounded-xl hover:bg-red-600 transition-colors"
            onClick={handleDeleteChats}
          >
            Clear Chats
          </button>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col w-full md:w-4/5 gap-4">
        {/* Chat Container */}
        <div
          ref={chatContainerRef}
          className="flex flex-col gap-4 bg-white/10 rounded-2xl p-4 overflow-y-auto h-[75vh]"
        >
          {chatMessages.map((chat, index) => (
            <ChatItem key={index} content={chat.content} role={chat.role} />
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center bg-white/10 rounded-2xl px-4 py-3 shadow-md w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-white outline-none font-varela placeholder-white"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
          <button onClick={handleSubmit} className="text-white ml-3">
            <IoMdSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
