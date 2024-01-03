import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Upload from "./pages/upload";
import Signup from "./pages/signup";
import Home from "./pages/home";
import { AuthProvider } from "./context/authProvider";
import RequireAuth from "./utils/RequireAuth";
import PersistLogin from "./components/persistLogin";
import UserLayout from "./layout/userLayout";
import { Toaster } from "./components/ui/toaster";

function App() {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route element={<PersistLogin />}>
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
                        </Route>

                        <Route
                            path="/unauthorized"
                            element={<h1>Unauthorized</h1>}
                        />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
