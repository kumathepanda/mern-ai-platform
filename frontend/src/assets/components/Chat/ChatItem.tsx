import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

type ChatItemProps = {
  content: string;
  role: "user" | "assistant";
};

const ChatItem = ({ content, role }: ChatItemProps) => {
  const auth = useAuth();
  const isUser = role === "user";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: isUser ? "flex-end" : "flex-start",
        p: 2,
        gap: 2,
      }}
    >
      {/* AI Avatar (Left) */}
      {!isUser && (
        <Avatar sx={{ ml: "0" }}>
          <img src="KalpaGen.png" alt="assistant" width={"30px"} />
        </Avatar>
      )}

      {/* Message Box */}
      <Box
        sx={{
          bgcolor: isUser ? "#4A90E2" : "#004d5612", // Blue for user, Dark for AI
          color: "white",
          px: 3,
          py: 2,
          borderRadius: 3,
          maxWidth: "70%",
          textAlign: isUser ? "right" : "left",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Varela Round",
            fontSize: "18px",
          }}
        >
          {content}
        </Typography>
      </Box>

      {/* User Avatar (Right) */}
      {isUser && (
        <Avatar
          sx={{
            bgcolor: "white",
            color: "black",
            fontWeight: 700,
          }}
        >
          {auth?.user?.name?.split(" ").map((word) => word[0]).join("").toUpperCase()}
        </Avatar>
      )}
    </Box>
  );
};

export default ChatItem;
