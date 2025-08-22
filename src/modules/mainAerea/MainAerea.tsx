import { useEffect } from "react";
import { Suspense, lazy } from "react";
import "./MainAerea.css";
const ActivityMap = lazy(() => import("../activityMap/ActivityMap"));
const BagPacker = lazy(() => import("../bagPacker/BagPacker"));
const CampBuilder = lazy(() => import("../campBuilder/CampBuilder"));

interface MainAereaProps {
  game: string;
}

const MainAerea = ({ game }: MainAereaProps) => {
  useEffect(() => {}, [game]);

  const renderComponent = () => {
    switch (game) {
      case "activity":
        return <ActivityMap />;
      case "bag":
        return <BagPacker />;
      case "camp":
        return <CampBuilder />;
      default:
        return <div>Unknown game mode</div>;
    }
  };

  return (
    <div className="main-aerea-container">
      {
        <Suspense fallback={<div>Nalaganje...</div>}>
          {renderComponent()}
        </Suspense>
      }
    </div>
  );
};

export default MainAerea;
