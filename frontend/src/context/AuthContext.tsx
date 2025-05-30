import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginuser, logoutuser, signupuser } from "../helpers/api-communicator";

type User = {
    name: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

// Fix: Use undefined as default value for createContext
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Fetch if the user's cookies are valid then skip login
        async function checkStatus() {
            const data = await checkAuthStatus();
            if(data){
                setUser({email:data.email,name:data.name});
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, []);

    const login = async (email: string, password: string) => {
        const data = await loginuser(email, password);
        if(data){
            setUser({email:data.email,name:data.name});
            setIsLoggedIn(true);
        }
    };
    const signup = async (name: string, email: string, password: string) => {
        const data  = await  signupuser(name, email, password);
        if(data){
            setUser({email:data.email,name:data.name});
            setIsLoggedIn(true);
        }
    };
    const logout = async () => {
        await logoutuser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload(); // Reload the page to clear cookies and local storage
    }
    

    const value: UserAuth = {
        user,
        isLoggedIn,
        login,
        signup,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
