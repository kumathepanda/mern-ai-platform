import { Box, Button, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import { BiLogInCircle } from "react-icons/bi";
import CustomizedInput from "../components/shared/CustomizedInput";
import {toast} from 'react-hot-toast'
import { useAuth } from "../../context/AuthContext";
// Floating animation for the mascot
const FloatingImage = styled("img")({
  width: "400px",
  marginTop: "100px",
  animation: `${keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  `} 5s ease-in-out infinite`,
});

const Login = () => {
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email  = formData.get("email") as string;
    const password   = formData.get("password") as string ;
    try {
      toast.loading("Kindly wait , we are logging you in ...",{id:"login"});
      await auth?.login(email,password);
      toast.success("Logged in successfully",{id:"login"});
    } catch (error) {
      console.log(error);
      toast.error("Oops there was an error logging you in",{id:"login"});
    }
  }
  return (
    <Box width="100%" height="100%" display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}></Box>
      <FloatingImage src="Mascot.png" alt="mascot" />
      <Box 
        display="flex" 
        flex={{ xs: 1, md: 0.5 }} 
        justifyContent="center" 
        alignItems="center" 
        ml="auto" 
        mt={16} 
        padding={2}
      >
        <form 
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "12px",
            border: "none",
            width: "100%",
            maxWidth: "500px"
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography 
              variant="h4" 
              textAlign="center" 
              fontWeight="600" 
              paddingBottom={2}
            >
              Login
            </Typography>
            <CustomizedInput name="email" type="email" label="Email" />
            <CustomizedInput name="password" type="password" label="Password" />
            <Button 
              type="submit"
              sx={{
                mt: 2, 
                width: "100%",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                bgcolor: "linear-gradient(45deg, #4C1D95, #7B1FA2)",
                color: "white",
                ":hover": {
                  bgcolor: "white",
                  color: "#4C1D95" // Contrast fix
                }
              }}
              endIcon={<BiLogInCircle />} // Corrected the prop
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
