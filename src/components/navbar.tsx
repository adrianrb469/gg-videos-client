import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const routes = [
    {
        path: "/home",
        name: "Home",
    },
    {
        path: "/faq",
        name: "About",
    },
    {
        path: "/profile",
        name: "Profile",
    },
];

export default function Navbar() {
    const currentRoute = window.location.pathname;

    return (
        <header className="flex justify-between items-center p-2  shadow-sm">
            <h1 className=" font-extrabold ">
                <Link to="/">GG</Link>
            </h1>
            <nav>
                {routes.map((route) =>
                    route.path === currentRoute ? (
                        <Button
                            asChild
                            variant={"link"}
                            className={`text-md font-bold`}
                        >
                            <Link to={route.path}>{route.name}</Link>
                        </Button>
                    ) : (
                        <Button
                            asChild
                            variant={"link"}
                            className={`text-md text-purple/75`}
                        >
                            <Link to={route.path}>{route.name}</Link>
                        </Button>
                    )
                )}
            </nav>
        </header>
    );
}
