import { useEffect, useState } from "react";
import PromoTab from "./PromoTab";

const STORAGE_KEY = "artista_welcome_shown";

export default function WelcomeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  // Render PromoTab with modal forced open on first visit
  return <PromoTab autoOpen={true} onAutoClose={() => setShow(false)} />;
}