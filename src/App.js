import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ArtistProvider } from "./context/ArtistContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import FeaturedPage from "./pages/FeaturedPage";
import PromoTab from "./components/PromoTab";
import WelcomeModal from "./components/WelcomeModal";

export default function App() {
  return (
    <ArtistProvider>
      <BrowserRouter>
        <div className="min-h-screen transition-colors duration-300" style={{ background: "var(--bg)" }}>
          <PromoTab />
          <Header />
          <WelcomeModal />
          <Routes>
            <Route path="/"           element={<HomePage />} />
            <Route path="/artist/:id" element={<ProfilePage />} />
            <Route path="/featured"   element={<FeaturedPage />} />
          </Routes>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#0A0A0A",
                color: "#fff",
                borderRadius: "6px",
                fontSize: "12px",
                letterSpacing: "0.05em",
                fontFamily: "'DM Sans', sans-serif",
              },
            }}
          />
        </div>
      </BrowserRouter>
    </ArtistProvider>
  );
}