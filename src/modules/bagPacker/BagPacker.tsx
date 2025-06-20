import { useState } from "react";
import Grid from "./Grid"; // adjust the path as needed
import ItemList from "./ItemList"; // same here

const GRID_WIDTH = 10;
const GRID_HEIGHT = 30;
const CELL_SIZE = 20;

type PlacedItem = {
  id: string;
  itemId: string;
  row: number;
  column: number;
  rows: number;
  columns: number;
  color: string;
};

// Optional: Map from itemId to item data (so we can look up rows/columns/colors)
const itemData = {
  sleeping_bag: { rows: 5, columns: 10, color: "gray" },
  t_shirt: { rows: 3, columns: 1, color: "green" },
};

export default function BagPacker() {
  const [packedItems, setPackedItems] = useState<PlacedItem[]>([]);

  const handleItemDrop = (itemId: string, row: number, column: number) => {
    const item = itemData[itemId as keyof typeof itemData];
    if (!item) return;

    // 1. Check if item goes out of bounds
    if (
      row < 0 ||
      column < 0 ||
      row + item.rows > GRID_HEIGHT ||
      column + item.columns > GRID_WIDTH
    ) {
      console.warn("Item would go out of bounds");
      return;
    }

    // 2. Check for overlap
    const overlaps = packedItems.some((placed) => {
      const placedBottom = placed.row + placed.rows;
      const placedRight = placed.column + placed.columns;
      const itemBottom = row + item.rows;
      const itemRight = column + item.columns;

      const rowsOverlap = row < placedBottom && itemBottom > placed.row;
      const columnsOverlap = column < placedRight && itemRight > placed.column;

      return rowsOverlap && columnsOverlap;
    });

    if (overlaps) {
      console.warn("Item overlaps with existing item");
      return;
    }

    // 3. If valid, place the item
    const newItem: PlacedItem = {
      id: `${itemId}_${Date.now()}`,
      itemId,
      row,
      column,
      rows: item.rows,
      columns: item.columns,
      color: item.color,
    };

    setPackedItems((prev) => [...prev, newItem]);
  };

  return (
    <div style={{ display: "flex", gap: "32px" }}>
      <Grid
        rows={GRID_HEIGHT}
        columns={GRID_WIDTH}
        cellSize={CELL_SIZE}
        packedItems={packedItems}
        onItemDrop={handleItemDrop}
      />
      <ItemList />
    </div>
  );
}
