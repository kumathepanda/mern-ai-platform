import { BiLogInCircle } from "react-icons/bi";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Kindly wait , we are logging you in ...", { id: "login" });
      await auth?.login(email, password);
      toast.success("Logged in successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Oops there was an error logging you in", { id: "login" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px]  !bg-transparent !bg-opacity-2 backdrop-blur-md rounded-xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/10"
      >
        <div className="flex flex-col gap-5">
          <h2 className="text-4xl font-semibold text-center !text-white tracking-wide">
            Login
          </h2>

          <CustomizedInput name="email" type="email" label="Email" />
          <CustomizedInput name="password" type="password" label="Password" />

          <button
            type="submit"
            className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-tr from-purple-700 to-indigo-800 text-white font-semibold text-lg py-2 rounded-lg hover:from-indigo hover:to-white hover:text-purple-800 transition-all duration-300"
          >
            Login <BiLogInCircle size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
