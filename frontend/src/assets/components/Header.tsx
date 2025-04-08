import Logo from './shared/Logo';
import { useAuth } from '../../context/AuthContext';
import NavigationLinks from './shared/NavigationLinks';

const Header = () => {
  const auth = useAuth();

  return (
    <header className="sticky top-0 left-0 !w-full z-50 !bg-[#2A0E55] shadow-md">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4">
        <Logo />
        <div className="flex gap-4">
          {auth?.isLoggedIn ? (
            <>
              <NavigationLinks
                bg="!#22D3EE"
                to="/Chat"
                text="Go to Chat"
                textColor="white"
              />
              <NavigationLinks
                bg="!#9333EA"
                to="/Login"
                text="Logout"
                textColor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLinks
                bg="!#22D3EE"
                to="/Login"
                text="Login"
                textColor="white"
              />
              <NavigationLinks
                bg="!#9333EA"
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
