import axios from "@/api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth, auth } = useAuth()!;

    const refreshToken = async () => {
        const response = await axios.get("/auth/refresh", {
            withCredentials: true,
        });

        console.log("prev access token", auth.access_token);

        const newAuth = {
            ...auth,
            user: response.data.user,
            access_token: response.data.access_token,
        };

        console.log("new access token", response.data.access_token);
        setAuth(newAuth);
        return response.data.access_token;
    };

    return { refreshToken };
};

export default useRefreshToken;
