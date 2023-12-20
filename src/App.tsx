import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import { AuthProvider } from "./context/authProvider";
import RequireAuth from "./utils/RequireAuth";
import UserLayout from "./layout/userLayout";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route element={<RequireAuth />}>
                        <Route path="/home" element={<UserLayout />}>
                            <Route path="" element={<Home />} />
                        </Route>

                        <Route element={<RequireAuth adminOnly />}>
                            <Route
                                path="/dashboard"
                                element={<h1>Dashboard</h1>}
                            />
                        </Route>
                    </Route>

                    <Route
                        path="/unauthorized"
                        element={<h1>Unauthorized</h1>}
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
