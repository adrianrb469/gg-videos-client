import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import userRefreshToken from "@/hooks/useRefreshToken";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

function Home() {
    const { refreshToken } = userRefreshToken();
    const axiosPrivate = useAxiosPrivate();

    const funky = async () => {
        const { data } = await axiosPrivate.get("/users/me");
        console.log(data);
    };

    const handleRefresh = () => {
        return async () => {
            await refreshToken();
        };
    };

    return (
        <>
            <h1>Home</h1>
            <Button onClick={funky}>Refresh token</Button>
        </>
    );
}

export default Home;
