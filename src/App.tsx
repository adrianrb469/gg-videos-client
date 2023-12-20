import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";

import { AuthProvider } from "./context/authProvider";

import RequireAuth from "./utils/RequireAuth";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route element={<RequireAuth />}>
                        <Route path="/home" element={<h1>Upload</h1>} />
                        <Route
                            path="/dashboard"
                            element={<h1>Approve Video</h1>}
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
