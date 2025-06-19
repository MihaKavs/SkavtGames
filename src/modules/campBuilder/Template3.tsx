import { useEffect, useState } from "react";
import { Group, Rect, Circle, Image as KonvaImage } from "react-konva";

interface TemplateProps {
  width: number;
  height: number;
  setPlacingAerea: (positions: number[][]) => void;
}

const Template = ({ width, height, setPlacingAerea }: TemplateProps) => {
  // Example: load tree image
  const [treeImg, setImage] = useState<HTMLImageElement | null>(null);
  const [treeWidthState, setTreeWidth] = useState([30, 45]);
  useEffect(() => {
    const treeImg = new Image();
    treeImg.src = "/images/tree.png";
    treeImg.onload = () => setImage(treeImg);
    setPlacingAerea([
      [width * 0.3, 0, width * 0.7, height * 0.25],
      [width * 0.3, height * 0.25, width * 0.2, height * 0.7],
      [width * 0.7, height * 0.25, width * 0.3, height * 0.7],
      [width * 0.3, height * 0.55, width * 0.7, height * 0.5],
    ]);
    if (width < 500) {
      setTreeWidth([15, 25]);
    } else {
      setTreeWidth([30, 45]);
    }
  }, [width]);

  return (
    <Group>
      {/* Background grass */}
      <Rect width={width} height={height} fill="#ccf7d4" />

      {/* Lake */}
      <Circle
        x={width * 0.6}
        y={height * 0.4}
        radius={Math.min(width, height) * 0.15}
        fill="#4da6ff"
        opacity={0.5}
      />

      {/* Sparse trees */}
      {treeImg &&
        (() => {
          const trees = [];
          const startX = 0;
          const startY = 0;
          const rectWidth = width * 0.3; // width of your tree zone
          const rectHeight = height; // height of your tree zone
          const treeWidth = treeWidthState[0];
          const treeHeight = treeWidthState[1];
          // Calculate how many trees fit horizontally and vertically
          const cols = Math.floor(rectWidth / (treeWidth + 5));
          const rows = Math.floor(rectHeight / (treeHeight + 5));

          for (let row = 0; row < rows; row++) {
            let nowx = startX - 10;
            let nowy = startY + row * treeHeight;
            for (let col = 0; col < cols; col++) {
              const randomX = Math.random() * 40;
              const randomY = Math.random() * 50;
              const x = nowx + randomX;
              nowx += treeWidth;
              const y = nowy + randomY;
              trees.push(
                <KonvaImage
                  key={`tree-${row}-${col}`}
                  image={treeImg}
                  x={x}
                  y={y}
                  width={treeWidth}
                  height={treeHeight}
                />
              );
            }
          }

          return [...trees];
        })()}
    </Group>
  );
};

export default Template;
