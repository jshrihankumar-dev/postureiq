import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import AnalyzePage from "./pages/AnalyzePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050816]">
        <Header />

        <Routes>
          <Route path="/" element={<AnalyzePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}