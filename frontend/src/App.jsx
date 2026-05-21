import { BrowserRouter, Routes, Route } from "react-router-dom";

import AnalyzePage from "./pages/AnalyzePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnalyzePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}