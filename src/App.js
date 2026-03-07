import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ArtistProvider } from "./context/ArtistContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <ArtistProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artist/:id" element={<ProfilePage />} />
          </Routes>

          {/* Global toast notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1f2937",
                color: "#f9fafb",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: {
                iconTheme: { primary: "#f97316", secondary: "#fff" },
              },
            }}
          />
        </div>
      </BrowserRouter>
    </ArtistProvider>
  );
}