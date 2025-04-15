import { BiLogInCircle } from "react-icons/bi";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Kindly wait , we are Signing you up ...", { id: "Signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed up  successfully", { id: "Signup" });
    } catch (error) {
      console.log(error);
      toast.error("Oops there was an error Signing you up", { id: "Signup" });
    }
  };
  return (
    <div className="relative flex items-center justify-end min-h-screen">

      {/* Left-side Text */}
      <div className="max-w-md text-white text-lg leading-relaxed absolute left-10 top-1/2 transform -translate-y-1/2 z-10">
        <h1 className="text-3xl font-bold mb-4">Welcome to Velura</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eaque
          officia voluptas soluta ea praesentium, illum quis magni! Tenetur repellat
          qui error ipsa cum quae aut veniam provident omnis quo.
        </p>
      </div>

      {/* Signup Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-20 w-full max-w-[420px] bg-indigo-950/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-8"
      >
        <div className="flex flex-col gap-5">
          <h2 className="text-4xl font-semibold text-center text-white tracking-wide">Signup</h2>
          <CustomizedInput name="name" type="text" label="Name" />
          <CustomizedInput name="email" type="email" label="Email" />
          <CustomizedInput name="password" type="password" label="Password" />

          <button
            type="submit"
            className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-tr from-purple-700 to-indigo-800 text-white font-semibold text-lg py-2 rounded-lg hover:from-indigo hover:to-white hover:text-purple-800 transition-all duration-300"
          >
            Signup <BiLogInCircle size={20} />
          </button>
        </div>
      </form>
    </div>

  )
}

export default Signup
