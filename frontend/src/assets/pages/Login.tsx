import { BiLogInCircle } from "react-icons/bi";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Kindly wait, we are logging you in...", { id: "login" });
      await auth?.login(email, password);
      toast.success("Logged in successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Oops, there was an error logging you in", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate('/');
    }
  }, [auth]);

  return (
    <div className="relative flex items-center justify-end min-h-screen">
      {/* Left-side Text */}
      <div className="max-w-md text-white text-lg leading-relaxed absolute left-10 top-1/2 transform -translate-y-1/2 z-10">
        <h1 className="text-3xl font-bold mb-4">Welcome to Velura</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eaque officia voluptas soluta ea praesentium, illum quis magni! Tenetur repellat qui error ipsa cum quae aut veniam provident omnis quo.
        </p>
      </div>

      {/* Login Form */}
      <form 
        onSubmit={handleSubmit} 
        className="relative z-20 w-full max-w-[420px] bg-indigo-950/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-8"
      >
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl font-semibold text-center text-white tracking-wide">
            Login
          </h2>
          <CustomizedInput name="email" type="email" label="Email" />
          <CustomizedInput name="password" type="password" label="Password" />
          <button
            type="submit"
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-semibold text-lg py-2 rounded-xl hover:from-indigo-700 hover:to-indigo-400 hover:text-white transition-all duration-300"
          >
            Login <BiLogInCircle size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;