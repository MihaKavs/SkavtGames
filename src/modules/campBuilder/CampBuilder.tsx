import { useState, useRef, useEffect, useMemo } from "react";
import { Stage, Layer, Image as KonvaImage, Group } from "react-konva";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import { Rect } from "react-konva";
import "./CampBuilder.css";
interface CampProp {
  id: string;
  type: string;
  x: number;
  y: number;
  rotation?: number;
}

const CampPropImage = ({
  type,
  x,
  y,
  rotation,
  onPositionChange,
  placingAerea,
  isSelected,
  onSelect,
}: {
  type: string;
  x: number;
  y: number;
  rotation: number;
  placingAerea: number[][];
  isSelected: boolean;
  onSelect: () => void;
  onPositionChange: (newX: number, newY: number) => void;
}) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [pos, setPos] = useState({ x, y });

  useEffect(() => {
    const img = new Image();
    img.src = `/images/${type}.png`;
    img.onload = () => setImage(img);
  }, [type]);

  useEffect(() => {
    setPos({ x, y });
  }, [x, y]);

  const isWithinArea = (x: number, y: number) => {
    return placingAerea.some(([areaX, areaY, areaW, areaH]) => {
      return (
        x >= areaX && x <= areaX + areaW && y >= areaY && y <= areaY + areaH
      );
    });
  };

  return image ? (
    <>
      <KonvaImage
        image={image}
        x={pos.x}
        y={pos.y}
        width={60}
        height={60}
        rotation={rotation}
        offset={{ x: 30, y: 30 }}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          const newX = e.target.x();
          const newY = e.target.y();
          if (isWithinArea(newX + 30, newY + 30)) {
            setPos({ x: newX, y: newY });
            onPositionChange(newX, newY);
          } else {
            e.target.to({ x: pos.x, y: pos.y, duration: 0.2 });
          }
        }}
      />
      {isSelected && (
        <Rect
          x={pos.x - 30}
          y={pos.y - 30}
          width={60}
          height={60}
          stroke="blue"
          strokeWidth={2}
          dash={[4, 4]}
          listening={false}
        />
      )}
    </>
  ) : null;
};
const CampBuilder = () => {
  const [propsList, setPropsList] = useState<CampProp[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<number>(1);
  const [placingAerea, setPlacingAerea] = useState<number[][]>([]);
  const stageRef = useRef<any>(null);
  const [selectedPropId, setSelectedPropId] = useState<string | null>(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateSize = () => {
      const padding = 40; // optional margin
      const maxWidth = 800;
      const maxHeight = 600;
      console.log(window, padding, maxWidth);
      const width = Math.min(window.outerWidth - padding, maxWidth);
      const height = (width / maxWidth) * maxHeight;
      setStageSize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPropId) return;

      if (e.key === "Delete" || e.key === "Backspace") {
        setPropsList((prev) => prev.filter((p) => p.id !== selectedPropId));
        setSelectedPropId(null);
      }

      if (e.key.toLowerCase() === "r") {
        setPropsList((prev) =>
          prev.map((p) =>
            p.id === selectedPropId
              ? { ...p, rotation: ((p.rotation || 0) + 15) % 360 }
              : p
          )
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPropId]);

  useEffect(() => {
    setPropsList([]);
  }, [activeTemplate]);

  // Memoized templates so they keep their randomized elements
  const renderedTemplate1 = useMemo(
    () => (
      <Template1
        width={stageSize.width}
        height={stageSize.height}
        setPlacingAerea={setPlacingAerea}
      />
    ),
    [stageSize]
  );
  const renderedTemplate2 = useMemo(
    () => (
      <Template2
        width={stageSize.width}
        height={stageSize.height}
        setPlacingAerea={setPlacingAerea}
      />
    ),
    [stageSize]
  );
  const renderedTemplate3 = useMemo(
    () => (
      <Template3
        width={stageSize.width}
        height={stageSize.height}
        setPlacingAerea={setPlacingAerea}
      />
    ),
    [stageSize]
  );
  const renderedTemplate4 = useMemo(
    () => (
      <Template4
        width={stageSize.width}
        height={stageSize.height}
        setPlacingAerea={setPlacingAerea}
      />
    ),
    [stageSize]
  );

  const addProp = (type: string) => {
    setPropsList((prev) => [
      ...prev,
      { id: Date.now().toString(), type, x: 100, y: 100 },
    ]);
  };

  const exportImage = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.download = "camp.png";
    link.href = uri;
    link.click();
  };

  return (
    <div className="builder-container">
      {/* Template Selector Sidebar */}
      <div className="selecting-template">
        <h3 className="template-header">Izberi podlogo</h3>

        <div className="template-container">
          <div
            onClick={() => setActiveTemplate(1)}
            className="template-card"
            style={{
              border:
                activeTemplate === 1 ? "2px solid blue" : "1px solid #ccc",
            }}
          >
            <Stage
              width={stageSize.width / 4}
              height={stageSize.height / 4}
              style={{ pointerEvents: "none" }}
            >
              <Layer>
                <Group scale={{ x: 0.25, y: 0.25 }}>{renderedTemplate1}</Group>
              </Layer>
            </Stage>
          </div>

          <div
            onClick={() => setActiveTemplate(2)}
            className="template-card"
            style={{
              border:
                activeTemplate === 2 ? "2px solid blue" : "1px solid #ccc",
            }}
          >
            <Stage
              width={stageSize.width / 4}
              height={stageSize.height / 4}
              style={{ pointerEvents: "none" }}
            >
              <Layer>
                <Group scale={{ x: 0.25, y: 0.25 }}>{renderedTemplate2}</Group>
              </Layer>
            </Stage>
          </div>
          <div
            onClick={() => setActiveTemplate(3)}
            className="template-card"
            style={{
              border:
                activeTemplate === 3 ? "2px solid blue" : "1px solid #ccc",
            }}
          >
            <Stage
              width={stageSize.width / 4}
              height={stageSize.height / 4}
              style={{ pointerEvents: "none" }}
            >
              <Layer>
                <Group scale={{ x: 0.25, y: 0.25 }}>{renderedTemplate3}</Group>
              </Layer>
            </Stage>
          </div>
          <div
            onClick={() => setActiveTemplate(4)}
            className="template-card"
            style={{
              border:
                activeTemplate === 4 ? "2px solid blue" : "1px solid #ccc",
            }}
          >
            <Stage
              width={stageSize.width / 4}
              height={stageSize.height / 4}
              style={{ pointerEvents: "none" }}
            >
              <Layer>
                <Group scale={{ x: 0.25, y: 0.25 }}>{renderedTemplate4}</Group>
              </Layer>
            </Stage>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="stage-container">
        <div className="button-container">
          <button onClick={() => addProp("tent")} className="add-button">
            Dodaj šotor
          </button>
          <button onClick={() => addProp("campfire")} className="add-button">
            Dodaj ognjišče
          </button>
          <button onClick={() => addProp("volleyball")} className="add-button">
            Dodaj odbojkarsko igrišče
          </button>
          <button onClick={() => addProp("kitchen")} className="add-button">
            Dodaj kuhinjo
          </button>

          <button onClick={exportImage} className="export-button">
            Izvozi sliko
          </button>
        </div>
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          className="stage-style"
          style={{ border: "1px solid #ccc", touchAction: "manipulation" }}
          ref={stageRef}
        >
          <Layer>
            {activeTemplate === 1 && renderedTemplate1}
            {activeTemplate === 2 && renderedTemplate2}
            {activeTemplate === 3 && renderedTemplate3}
            {activeTemplate === 4 && renderedTemplate4}

            {propsList.map((prop, index) => (
              <CampPropImage
                key={prop.id}
                type={prop.type}
                x={prop.x}
                y={prop.y}
                rotation={prop.rotation || 0}
                placingAerea={placingAerea}
                onSelect={() => setSelectedPropId(prop.id)}
                isSelected={selectedPropId === prop.id}
                onPositionChange={(newX, newY) => {
                  setPropsList((prev) =>
                    prev.map((p, i) =>
                      i === index ? { ...p, x: newX, y: newY } : p
                    )
                  );
                }}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CampBuilder;
