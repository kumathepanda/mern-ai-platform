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

export const getUserChats = async () => {

    const res = await axios.get('/chat/all-chats');
    if(res.status!=200)
    {
        throw new Error("There seems to be an error in the server");
    }
    const data = res.data;
    return data;
};
export const deleteUserChats = async () => {

    const res = await axios.delete('/chat/delete-chats');
    if(res.status!=200)
    {
        throw new Error("There seems to be an error in the server,unable to delete");
    }
    const data = res.data;
    return data;
};
export const logoutuser = async () => {

    const res = await axios.get('/user/logout');
    if(res.status!=200)
    {
        throw new Error("There seems to be an error in the server,unable to logout");
    }
    const data = res.data;
    return data;
};




export const signupuser = async (name: string, email: string, password: string) => {
    try {
        const res = await axios.post('/user/signup', { name, email, password });
        console.log("Signup Success:", res.data);
        return res.data;
    } catch (error) {
        console.error("Axios Error:", error);

        if (axios.isAxiosError(error) && error.response) {
            console.error("Response Data:", error.response.data);
            console.error("Response Status:", error.response.status);
            throw new Error(error.response.data || "Unable to Signup");
        }

        throw new Error("Unable to Signup");
    }
}