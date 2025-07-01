import React from "react";

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

  // New props for move/delete support
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
  const gridStyle: React.CSSProperties = {
    position: "relative",
    width: columns * cellSize,
    height: rows * cellSize,
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
  };

  const handleCellClick = (row: number, col: number) => {
    if (onItemDropPosition && draggingItemId.current) {
      onItemDropPosition(row, col);
    }
  };

  const draggingItemId = React.useRef<string | null>(null);

  return (
    <div style={gridStyle}>
      {/* Grid background (empty cells for click handling) */}
      {Array.from({ length: rows * columns }).map((_, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;

        return (
          <div
            key={`cell-${row}-${col}`}
            onClick={() => handleCellClick(row, col)}
            style={{
              width: cellSize,
              height: cellSize,
              boxSizing: "border-box",
              border: "1px solid #ddd",
            }}
          />
        );
      })}

      {/* Placed items */}
      {packedItems.map((item) => {
        const isSelected = selectedId === item.id;

        return (
          <div
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              onItemClick?.(item.id);
            }}
            draggable
            onDragStart={(e) => {
              draggingItemId.current = item.id;
              onItemDragStart?.(item.id);
            }}
            onDragEnd={() => {
              draggingItemId.current = null;
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
              cursor: "move",
              zIndex: isSelected ? 2 : 1,
            }}
          />
        );
      })}

      {/* Drop area for moving dragged item */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const col = Math.floor(x / cellSize);
          const row = Math.floor(y / cellSize);

          const itemId = e.dataTransfer.getData("text/plain");

          if (itemId && onItemDrop) {
            onItemDrop(itemId, row, col);
          }

          // Also support move inside grid
          if (onItemDropPosition && draggingItemId.current) {
            onItemDropPosition(row, col);
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: columns * cellSize,
          height: rows * cellSize,
        }}
      />
    </div>
  );
}
