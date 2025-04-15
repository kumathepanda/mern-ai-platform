import { useAuth } from '../../context/AuthContext';
import NavigationLinks from './shared/NavigationLinks';
import Logo from './shared/Logo';

const Header = () => {
  const auth = useAuth();

  return (
    <header className="!sticky top-0 left-0 w-full z-50 bg-indigo-900 shadow-lg backdrop-blur-sm rounded-b-2xl">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="-ml-4">
          <Logo />
        </div>
        <div className="flex gap-4">
          {auth?.isLoggedIn ? (
            <>
              <NavigationLinks
                bg="!bg-indigo-600"
                to="/Chat"
                text="Go to Chat"
                textColor="white"
              />
              <button
                onClick={auth?.logout}
                className="nav-link text-white hover:text-indigo-300 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavigationLinks
                bg="!bg-indigo-600"
                to="/Login"
                text="Login"
                textColor="white"
              />
              <NavigationLinks
                bg="!bg-indigo-700"
                to="/Signup"
                text="Signup"
                textColor="white"
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;