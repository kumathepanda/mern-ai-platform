import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="flex items-center gap-2 mr-auto">
            <Link to="/">
                <img 
                    src="KalpaGen.png" 
                    alt="KalpaGen" 
                    className="w-[60px] h-[60px] object-cover rounded-full border-2 border-white"
                />
            </Link>
            <span className="hidden sm:hidden md:block font-bold text-[#F1F5F9] text-[22px] drop-shadow-[1px_1px_10px_rgba(0,0,0,0.2)]">
                KalpaGen
            </span>
        </div>
    );
}

export default Logo;
