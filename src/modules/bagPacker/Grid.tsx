import React, { useRef } from "react";

type PlacedItem = {
  id: string;
  itemId: string;
  row: number;
  column: number;
  rows: number;
  columns: number;
  color: string;
};

type GridProps = {
  rows: number;
  columns: number;
  cellSize: number;
  packedItems: PlacedItem[];
  onItemDrop: (itemId: string, row: number, column: number) => void;
  onItemClick?: (id: string) => void;
  selectedId?: string | null;
  onItemDragStart?: (id: string) => void;
  onItemDropPosition?: (row: number, column: number) => void;
};

export default function Grid({
  rows,
  columns,
  cellSize,
  packedItems,
  onItemDrop,
  onItemClick,
  selectedId,
  onItemDragStart,
  onItemDropPosition,
}: GridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const gridStyle: React.CSSProperties = {
    position: "relative",
    width: columns * cellSize,
    height: rows * cellSize,
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    touchAction: "none",
  };

  const handleCellTouch = (e: React.TouchEvent, row: number, col: number) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    onItemDropPosition?.(row, col);
  };

  const handleItemTouchStart = (e: React.TouchEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    onItemClick?.(id);
    onItemDragStart?.(id);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const rect = gridRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    const itemId = e.dataTransfer.getData("text/plain");
    if (itemId && onItemDrop) {
      onItemDrop(itemId, row, col);
    }
  };

  return (
    <div
      ref={gridRef}
      style={gridStyle}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {Array.from({ length: rows * columns }).map((_, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;

        return (
          <div
            key={`cell-${row}-${col}`}
            onClick={() => {
              onItemDropPosition?.(row, col);
            }}
            onTouchEnd={(e) => handleCellTouch(e, row, col)}
            style={{
              width: cellSize,
              height: cellSize,
              boxSizing: "border-box",
              border: "1px solid #ddd",
            }}
          />
        );
      })}

      {packedItems.map((item) => {
        const isSelected = selectedId === item.id;

        return (
          <div
            key={item.id}
            onClick={() => {
              onItemClick?.(item.id);
            }}
            onTouchStart={(e) => handleItemTouchStart(e, item.id)}
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", item.id);
              onItemDragStart?.(item.id);
            }}
            style={{
              position: "absolute",
              top: item.row * cellSize,
              left: item.column * cellSize,
              width: item.columns * cellSize,
              height: item.rows * cellSize,
              backgroundColor: item.color,
              opacity: 0.9,
              border: isSelected ? "3px solid red" : "1px solid #333",
              boxSizing: "border-box",
              cursor: "pointer",
              zIndex: isSelected ? 2 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: `${cellSize * 0.8}px`,
            }}
          ></div>
        );
      })}
    </div>
  );
}
