import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

type ChatItemProps = {
  content: string;
  role: "user" | "assistant";
};

// Markdown Parser Function
const parseMarkdown = (text: string): React.ReactNode => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const formattedText = text.replace(codeBlockRegex, (_, lang, code) => {
    return `<pre style="background-color:#1e1e1e; color:white; padding:1rem; border-radius:0.5rem; overflow-x:auto;"><code class="language-${lang || ''}">${code}</code></pre>`;
  });

  const inlineFormatted = formattedText
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
    .replace(/\*(.*?)\*/g, "<em>$1</em>")             // italic
    .replace(/__(.*?)__/g, "<strong>$1</strong>")     // bold alt
    .replace(/_(.*?)_/g, "<em>$1</em>")               // italic alt
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color:#7aa2f7; text-decoration:underline;">$1</a>'); // links

  return <div dangerouslySetInnerHTML={{ __html: inlineFormatted }} />;
};

const ChatItem = ({ content, role }: ChatItemProps) => {
  const auth = useAuth();
  const isUser = role === "user";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: isUser ? "flex-end" : "flex-start",
        p: 2,
        gap: 2,
      }}
    >
      {/* Bot Avatar */}
      {!isUser && (
        <Avatar sx={{ ml: "0" }}>
          <img src="KalpaGen.png" alt="assistant" width={"30px"} />
        </Avatar>
      )}

      {/* Message Bubble */}
      <Box
        sx={{
          bgcolor: isUser ? "#4A90E2" : "#2c1b5f",
          color: "white",
          px: 3,
          py: 2,
          borderRadius: 3,
          maxWidth: "70%",
          textAlign: isUser ? "right" : "left",
          fontFamily: "Varela Round",
          fontSize: "18px",
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {parseMarkdown(content)}
      </Box>

      {/* User Avatar */}
      {isUser && (
        <Avatar sx={{ bgcolor: "white", color: "black", fontWeight: 700 }}>
          {auth?.user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()}
        </Avatar>
      )}
    </Box>
  );
};

export default ChatItem;
