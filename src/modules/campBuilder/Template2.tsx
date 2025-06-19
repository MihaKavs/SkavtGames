import { useEffect, useState } from "react";
import { Group, Rect, Image as KonvaImage, Line } from "react-konva";

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
      [width * 0.4, 0, width * 0.3, height * 0.6],
      [width * 0.15, height * 0.2, width * 0.4, height * 0.3],
      [width * 0.7, height * 0.3, width * 0.15, height * 0.3],
      [width * 0.4, height * 0.55, width * 0.7, height * 0.5],
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
      <Rect width={width} height={height} fill="#d1f7c4" />

      {/* River - a blue winding shape */}
      <Line
        points={[
          width * 0,
          height * 0,
          25,
          width * 0.12,
          height * 0.2,
          width * 0.4,
          height * 0.5,
          width * 0.5,
          height * 0.6,
          width * 0.7,
          height * 0.5,
          width,
          height * 0.4, // bottom
        ]}
        stroke="#4da6ff"
        strokeWidth={width / 10}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
        opacity={0.6}
        closed={false}
      />

      {/* Some trees */}
      {treeImg &&
        (() => {
          const trees = [];
          const startX = width * 0.1;
          const startY = 0;
          const rectWidth = width * 0.3; // width of your tree zone
          const rectHeight = height * 0.2; // height of your tree zone
          const treeWidth = treeWidthState[0];
          const treeHeight = treeWidthState[1];
          // Calculate how many trees fit horizontally and vertically
          const cols = Math.floor(rectWidth / (treeWidth + 5));
          const rows = Math.floor(rectHeight / (treeHeight + 5));

          for (let row = 0; row < rows; row++) {
            let nowx = startX + 0;
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
      {treeImg &&
        (() => {
          const trees = [];
          const startX = 0;
          const startY = (2 * height) / 3;
          const rectWidth = (1.3 * width) / 3; // width of your tree zone
          const rectHeight = height / 2; // height of your tree zone
          const treeWidth = treeWidthState[0];
          const treeHeight = treeWidthState[1];
          // Calculate how many trees fit horizontally and vertically
          const cols = Math.floor(rectWidth / (treeWidth + 5));
          const rows = Math.floor(rectHeight / (treeHeight + 5));

          for (let row = 0; row < rows; row++) {
            let nowx = startX + 0;
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
      {treeImg &&
        (() => {
          const trees = [];
          const startX = width * 0.7;
          const startY = 0;
          const rectWidth = width / 2; // width of your tree zone
          const rectHeight = height / 4; // height of your tree zone
          const treeWidth = treeWidthState[0];
          const treeHeight = treeWidthState[1];
          // Calculate how many trees fit horizontally and vertically
          const cols = Math.floor(rectWidth / (treeWidth + 5));
          const rows = Math.floor(rectHeight / (treeHeight + 5));

          for (let row = 0; row < rows; row++) {
            let nowx = startX + 0;
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
