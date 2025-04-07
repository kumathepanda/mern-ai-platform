import axios from 'axios';

export const loginuser = async (email: string, password: string) => {
    try {
        const res = await axios.post('/user/login', { email, password });
        console.log("Login Success:", res.data);
        return res.data;
    } catch (error) {
        console.error("Axios Error:", error);

        if (axios.isAxiosError(error) && error.response) {
            console.error("Response Data:", error.response.data);
            console.error("Response Status:", error.response.status);
            throw new Error(error.response.data || "Unable to Login");
        }

        throw new Error("Unable to Login");
    }
};
export const checkAuthStatus = async () => {

    const res = await axios.get('/user/auth-status');
    if(res.status!=200)
    {
        throw new Error("Unable To Authenticate");
    }
    const data = res.data;
    return data;
};

export const sendChatRequest = async (message:string) => {

    const res = await axios.post('/chat/new', { message });
    if(res.status!=200)
    {
        throw new Error("There seems to be an error in the server");
    }
    const data = res.data;
    return data;
};
