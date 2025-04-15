import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Velura.ai explanation section */}
      <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 text-white px-6 py-8 rounded-3xl m-4 mb-6 shadow-xl relative z-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-500">Velura.ai - Seamless Intelligence</h1>
          <p className="text-lg mb-4 text-indigo-100">
            Your intelligent AI platform with specialized AI assistants designed for specific tasks.
          </p>
          <p className="text-white">
            At Velura.ai, we offer AI agents that are experts in their fields. Whether you need help with 
            customer support, content creation, or data analysis, our specialized AI assistants are 
            designed to understand your specific needs and provide accurate, helpful responses.
          </p>
        </div>
      </div>

      {/* Original main content */}
      <div className="min-h-screen bg-indigo-950 text-white px-6 py-10 relative overflow-hidden rounded-3xl m-4 shadow-2xl">
        {/* Top curve */}
        <div className="absolute top-0 left-0 w-full h-40 bg-indigo-800 rounded-b-[50%] z-0"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-10 text-center">Welcome to Velura</h1>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Chatbot Service Card */}
            <div
              onClick={() => navigate("/Chat")}
              className="cursor-pointer bg-indigo-700 hover:bg-indigo-800 transition-all duration-300 rounded-2xl p-6 shadow-xl hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-2 text-white">AI Chatbot</h2>
              <p className="text-sm text-indigo-100">
                Talk with our smart AI assistant to get answers, help, or just chat!
              </p>
            </div>

            {/* More service cards can go here later */}
          </div>
        </div>  
      </div>
    </>
  );
};

export default Home;