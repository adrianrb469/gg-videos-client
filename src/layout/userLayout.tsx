import { Outlet } from "react-router-dom";

export default function UserLayout() {
    return (
        <div>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>Profile</li>
                    <li>Settings</li>
                </ul>
            </nav>

            <Outlet />

            <footer>
                <p>Footer</p>
            </footer>
        </div>
    );
}
