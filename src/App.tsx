import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<h1>Upload</h1>} />
                <Route path="/dashboard" element={<h1>Approve Video</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
