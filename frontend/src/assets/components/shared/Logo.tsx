import { Link } from 'react-router-dom';
import LogoSvg from '../../../assets/logo-no-background.svg'; // adjust path if needed

const Logo = () => {
  return (
    <div className="flex items-center gap-2 mr-auto pl-4">
      <Link to="/" className="block">
        <img
          src={LogoSvg}
          alt="Velura"
          className="w-[300px] h-[100px] object-contain transition-transform duration-300 hover:scale-105 filter brightness-0 invert"
        />
      </Link>
    </div>
  );
};

export default Logo;