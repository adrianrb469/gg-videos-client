import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import userRefreshToken from "@/hooks/useRefreshToken";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
function Home() {
    const { refreshToken } = userRefreshToken();
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();

    const funky = async () => {
        try {
            const { data } = await axiosPrivate.get("/users/me");

            console.log(data);
        } catch (error: any) {
            if (error.response.status === 401) {
                console.log("refresh token expired");
                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });
            }
        }
    };

    const handleRefresh = () => {
        return async () => {
            try {
                await refreshToken();
            } catch (error: any) {
                if (error.response.status === 401) {
                    console.log("refresh token expired");
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                }
            }
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
