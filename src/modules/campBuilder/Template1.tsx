import { useEffect, useState } from "react";
import { Group, Rect, Image as KonvaImage } from "react-konva";

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
    setPlacingAerea([[width * 0.4, height * 0.25, width * 0.6, height * 0.75]]);
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
      <Rect
        x={width / 4}
        y={0}
        width={width / 6}
        height={height}
        fill="#4da6ff"
        opacity={0.6}
      />

      {/* Some trees */}
      {treeImg &&
        (() => {
          const trees = [];
          const startX = 0;
          const startY = 0;
          const rectWidth = width / 4; // width of your tree zone
          const rectHeight = height / 3; // height of your tree zone
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
          const startY = height / 2;
          const rectWidth = width / 4; // width of your tree zone
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
          const startX = width / 2;
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
      <Rect
        key="tree-zone-bg"
        x={width / 4 - 10}
        y={height / 3 + 10}
        width={width / 5}
        height={height / 7}
        fill="#bf6101"
        opacity={1}
      />
    </Group>
  );
};

export default Template;
