import { useState, useEffect } from "react";
import Grid from "./Grid";
import ItemList from "./ItemList";
import "./BagPacker.css";

const GRID_WIDTH = 10;
const GRID_HEIGHT = 30;
const CELL_SIZE = 20;

type Item = {
  id: string;
  name: string;
  icon: string;
  rows: number;
  columns: number;
  color: string;
  amount: number;
};

type PlacedItem = {
  id: string;
  itemId: string;
  row: number;
  column: number;
  rows: number;
  columns: number;
  color: string;
};

export default function BagPacker() {
  const initialItems: Item[] = [
    {
      id: "sleeping_bag",
      name: "Spalna vreča",
      icon: "🛏️",
      rows: 5,
      columns: 10,
      color: "gray",
      amount: 1,
    },
    {
      id: "t_shirt",
      name: "Kratka majica",
      icon: "👕",
      rows: 3,
      columns: 1,
      color: "green",
      amount: 8,
    },
    {
      id: "shirt",
      name: "Dolga majica",
      icon: "👕",
      rows: 3,
      columns: 2,
      color: "#4cff4c",
      amount: 2,
    },
    {
      id: "bowl",
      name: "Menaška",
      icon: "👕",
      rows: 5,
      columns: 7,
      color: "#1c1c1c",
      amount: 1,
    },
    {
      id: "short-pants",
      name: "Kratke hlače",
      icon: "👕",
      rows: 1,
      columns: 3,
      color: "#92faff",
      amount: 3,
    },
    {
      id: "pants",
      name: "Hlače",
      icon: "👕",
      rows: 2,
      columns: 4,
      color: "#4d8a8d",
      amount: 1,
    },
    {
      id: "rain",
      name: "Palerina",
      icon: "👕",
      rows: 2,
      columns: 4,
      color: "#0013e9",
      amount: 1,
    },
    {
      id: "knife",
      name: "Nož",
      icon: "👕",
      rows: 1,
      columns: 2,
      color: "#e95800",
      amount: 1,
    },
    {
      id: "light",
      name: "Čelka",
      icon: "👕",
      rows: 1,
      columns: 2,
      color: "#ffc29d",
      amount: 1,
    },
    {
      id: "bottle",
      name: "Flaša",
      icon: "👕",
      rows: 10,
      columns: 5,
      color: "#ff3972",
      amount: 1,
    },
    {
      id: "kroj",
      name: "Kroj",
      icon: "👕",
      rows: 5,
      columns: 4,
      color: "#ff5400",
      amount: 1,
    },
    {
      id: "nogavice",
      name: "Nogavice",
      icon: "👕",
      rows: 2,
      columns: 10,
      color: "#fffe00",
      amount: 1,
    },
    {
      id: "higene",
      name: "Osebna higiena",
      icon: "👕",
      rows: 4,
      columns: 4,
      color: "#757400",
      amount: 1,
    },
    {
      id: "towel",
      name: "Brisača",
      icon: "👕",
      rows: 3,
      columns: 7,
      color: "#82ffa5",
      amount: 1,
    },
    {
      id: "swimming",
      name: "Kopalke",
      icon: "👕",
      rows: 4,
      columns: 1,
      color: "#ff0c0c",
      amount: 1,
    },
    {
      id: "underwear",
      name: "Spodnje perilo",
      icon: "👕",
      rows: 3,
      columns: 5,
      color: "#fe0cff",
      amount: 1,
    },
  ];
  const [items, setItems] = useState<Item[]>(initialItems);
  const [packedItems, setPackedItems] = useState<PlacedItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleItemDrop = (itemId: string, row: number, column: number) => {
    const item = items.find((i) => i.id === itemId);
    if (!item || item.amount <= 0) return;

    if (row + item.rows > GRID_HEIGHT || column + item.columns > GRID_WIDTH) {
      console.warn("Item out of bounds");
      return;
    }

    const overlaps = packedItems.some((placed) => {
      const rowsOverlap =
        row < placed.row + placed.rows && row + item.rows > placed.row;
      const colsOverlap =
        column < placed.column + placed.columns &&
        column + item.columns > placed.column;
      return rowsOverlap && colsOverlap;
    });

    if (overlaps) {
      console.warn("Item overlaps");
      return;
    }

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

    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, amount: i.amount - 1 } : i))
    );
  };

  const handleGridClick = (itemId: string) => {
    setSelectedId(itemId);
  };

  const handleDelete = () => {
    if (!selectedId) return;

    const removed = packedItems.find((i) => i.id === selectedId);
    if (!removed) return;

    setPackedItems((prev) => prev.filter((i) => i.id !== selectedId));

    // restore 1 item to inventory
    setItems((prev) =>
      prev.map((i) =>
        i.id === removed.itemId ? { ...i, amount: i.amount + 1 } : i
      )
    );

    setSelectedId(null);
  };

  const handleMove = (row: number, col: number) => {
    if (!draggingId) return;
    const movingItem = packedItems.find((i) => i.id === draggingId);
    if (!movingItem) return;

    if (
      row + movingItem.rows > GRID_HEIGHT ||
      col + movingItem.columns > GRID_WIDTH
    ) {
      return;
    }

    const overlaps = packedItems.some(
      (i) =>
        i.id !== draggingId &&
        row < i.row + i.rows &&
        row + movingItem.rows > i.row &&
        col < i.column + i.columns &&
        col + movingItem.columns > i.column
    );

    if (overlaps) return;

    setPackedItems((prev) =>
      prev.map((i) => (i.id === draggingId ? { ...i, row, column: col } : i))
    );
    setDraggingId(null);
    setSelectedId(null);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        handleDelete();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId, packedItems]);
  const reset = () => {
    setPackedItems([]);
    setItems(initialItems);
    setSelectedId(null);
    setDraggingId(null);
  };
  return (
    <div className="main-packer-container">
      <h3 className="packer-title">Napolni nahrbtnik s predmeti</h3>
      <div className="packer-container">
        <Grid
          rows={GRID_HEIGHT}
          columns={GRID_WIDTH}
          cellSize={CELL_SIZE}
          packedItems={packedItems}
          onItemDrop={handleItemDrop}
          onItemClick={handleGridClick}
          selectedId={selectedId}
          onItemDragStart={setDraggingId}
          onItemDropPosition={handleMove}
        />
        <ItemList items={items} />
      </div>
      <button className="packer-reset" onClick={reset}>
        Ponastavi
      </button>
    </div>
  );
}
