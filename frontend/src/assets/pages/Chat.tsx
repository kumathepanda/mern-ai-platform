import { Box, Avatar, Typography, Button, IconButton, TextField, Paper } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import ChatItem from "../components/Chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useRef, useState, useEffect } from "react";
import { sendChatRequest } from "../../helpers/api-communicator";

// Define ChatMessage type
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState(""); // Controlled input
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const auth = useAuth();

  // Auto-scroll to latest message
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages]);

  // Handle message submission
  const handleSubmit = async () => {
    const content = inputValue.trim();
    if (!content) return;

    setInputValue(""); // Clear input after sending

    const newMessage: ChatMessage = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      const chatData = await sendChatRequest(content);
      setChatMessages((prev) => [...prev, ...chatData.chats]);
    } catch (error) {
      console.error("Chat API error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flex: 1, height: "100%", width: "100%", mt: 3, gap: 3, px: 2 }}>
      {/* Sidebar */}
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            bgcolor: "#111C27",
            height: "60vh",
            width: "100%",
            borderRadius: 3,
            p: 3,
            textAlign: "center",
          }}
          elevation={5}
        >
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: "bold" }}>
            {auth?.user?.name?.split(" ").map((word) => word[0]).join("").toUpperCase()}
          </Avatar>

          <Typography sx={{ fontFamily: "Varela Round", color: "white", mb: 2 }}>
            Welcome, {auth?.user?.name}! Have fun chatting with the bot!
          </Typography>

          <Button
            sx={{
              width: "100%",
              bgcolor: "#9C27B0",
              color: "white",
              fontWeight: "bold",
              ":hover": { bgcolor: "#D32F2F" },
              mt: 2,
            }}
          >
            Clear Chats
          </Button>
        </Paper>
      </Box>

      {/* Chat Container */}
      <Box sx={{ flex: { md: 0.8, xs: 1, sm: 1 }, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ textAlign: "center", fontSize: "28px", color: "white", fontWeight: "bold", mt: 2 }}>
          Model GPT 3.5 Turbo
        </Typography>

        {/* Chat Messages (Fixed Height) */}
        <Box
          ref={chatContainerRef}
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "55vh", // 🔥 FIX: Set a fixed height so it won't expand
            borderRadius: 3,
            overflowY: "auto", // 🔥 FIX: Scrolling enabled
            p: 2,
            bgcolor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem key={index} content={chat.content} role={chat.role} />
          ))}
        </Box>

        {/* Chat Input */}
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            width: "100%",
          }}
          elevation={3}
        >
          <TextField
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            variant="outlined"
            sx={{
              input: { color: "white", fontFamily: "Varela Round" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" },
              },
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", ml: 1 }}>
            <IoMdSend size={24} />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default Chat;
