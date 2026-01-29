import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayTransition, setDisplayTransition] = useState(false);

  useEffect(() => {
    // Déclencher l'animation au changement de route
    setDisplayTransition(true);

    // Garder l'overlay pendant toute l'animation
    const timer = setTimeout(() => {
      setDisplayTransition(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Smooth transition overlay */}
      {displayTransition && (
        <>
          {/* Wipe in - noir arrive de la droite */}
          <div
            className="fixed inset-0 bg-black pointer-events-none z-50"
            style={{
              animation: "transitionWipeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />
          {/* Wipe out - noir part vers la gauche */}
          <div
            className="fixed inset-0 bg-black pointer-events-none z-50"
            style={{
              animation: "transitionWipeOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards",
            }}
          />
        </>
      )}
    </>
  );
}
