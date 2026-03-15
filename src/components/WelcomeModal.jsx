import { useEffect, useState } from "react";
import UpgradeModal from "./UpgradeModal";

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

  return (
    <UpgradeModal
      artist={null}
      isWelcome={true}
      onClose={() => setShow(false)}
    />
  );
}