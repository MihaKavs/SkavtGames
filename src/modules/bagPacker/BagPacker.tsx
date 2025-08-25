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
  const [cellSize, setCellSize] = useState(() => {
    const maxWidth = Math.min(window.innerWidth * 0.9, 400);
    return Math.floor(maxWidth / GRID_WIDTH);
  });

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
      icon: "🥣",
      rows: 5,
      columns: 7,
      color: "#1c1c1c",
      amount: 1,
    },
    {
      id: "short-pants",
      name: "Kratke hlače",
      icon: "🩳",
      rows: 1,
      columns: 3,
      color: "#92faff",
      amount: 1,
    },
    {
      id: "pants",
      name: "Hlače",
      icon: "👖",
      rows: 2,
      columns: 4,
      color: "#4d8a8d",
      amount: 1,
    },
    {
      id: "rain",
      name: "Palerina",
      icon: "🧥",
      rows: 2,
      columns: 4,
      color: "#0013e9",
      amount: 1,
    },
    {
      id: "knife",
      name: "Nož",
      icon: "🔪",
      rows: 1,
      columns: 2,
      color: "#e95800",
      amount: 1,
    },
    {
      id: "light",
      name: "Čelka",
      icon: "🔦",
      rows: 1,
      columns: 2,
      color: "#ffc29d",
      amount: 1,
    },
    {
      id: "bottle",
      name: "Flaša",
      icon: "🍶",
      rows: 10,
      columns: 5,
      color: "#ff3972",
      amount: 1,
    },
    {
      id: "kroj",
      name: "Kroj",
      icon: "🍽️",
      rows: 5,
      columns: 4,
      color: "#ff5400",
      amount: 1,
    },
    {
      id: "nogavice",
      name: "Nogavice",
      icon: "🧦",
      rows: 2,
      columns: 10,
      color: "#fffe00",
      amount: 1,
    },
    {
      id: "higene",
      name: "Osebna higiena",
      icon: "🧼",
      rows: 4,
      columns: 4,
      color: "#757400",
      amount: 1,
    },
    {
      id: "towel",
      name: "Brisača",
      icon: "🧻",
      rows: 3,
      columns: 7,
      color: "#82ffa5",
      amount: 1,
    },
    {
      id: "swimming",
      name: "Kopalke",
      icon: "🏊",
      rows: 4,
      columns: 1,
      color: "#ff0c0c",
      amount: 1,
    },
    {
      id: "underwear",
      name: "Spodnje perilo",
      icon: "🩲",
      rows: 3,
      columns: 5,
      color: "#fe0cff",
      amount: 1,
    },
  ];

  const [items, setItems] = useState<Item[]>(initialItems);
  const [packedItems, setPackedItems] = useState<PlacedItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedPlacedId, setSelectedPlacedId] = useState<string | null>(null);
  const [overlappError, setOverlappError] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const maxWidth = Math.min(window.innerWidth * 0.9, 400);
      setCellSize(Math.floor(maxWidth / GRID_WIDTH));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (overlappError) {
      const timer = setTimeout(() => setOverlappError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [overlappError]);

  const handleItemDrop = (itemId: string, row: number, column: number) => {
    const item = items.find((i) => i.id === itemId);
    if (!item || item.amount <= 0) {
      console.warn("Invalid item or no amount left");
      return;
    }

    if (row + item.rows > GRID_HEIGHT || column + item.columns > GRID_WIDTH) {
      setOverlappError(true);
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
      setOverlappError(true);
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
    setSelectedItemId(null);
  };

  const handleGridClick = (id: string) => {
    setSelectedPlacedId(id);
    setSelectedItemId(null);
  };

  const handleItemSelect = (id: string) => {
    setSelectedItemId(id);
    setSelectedPlacedId(null);
  };

  const handleMove = (row: number, col: number) => {
    if (selectedItemId) {
      handleItemDrop(selectedItemId, row, col);
    } else if (selectedPlacedId) {
      const movingItem = packedItems.find((i) => i.id === selectedPlacedId);
      if (!movingItem) {
        console.warn("No item found to move");
        return;
      }

      if (
        row + movingItem.rows > GRID_HEIGHT ||
        col + movingItem.columns > GRID_WIDTH
      ) {
        console.warn("Move out of bounds");
        return;
      }

      const overlaps = packedItems.some(
        (i) =>
          i.id !== selectedPlacedId &&
          row < i.row + i.rows &&
          row + movingItem.rows > i.row &&
          col < i.column + i.columns &&
          col + movingItem.columns > i.column
      );

      if (overlaps) {
        console.warn("Move overlaps");
        return;
      }

      setPackedItems((prev) =>
        prev.map((i) =>
          i.id === selectedPlacedId ? { ...i, row, column: col } : i
        )
      );
      setSelectedPlacedId(null);
    }
  };

  const handleDelete = () => {
    if (!selectedPlacedId) {
      console.warn("No item selected to delete");
      return;
    }

    const removed = packedItems.find((i) => i.id === selectedPlacedId);
    if (!removed) {
      console.warn("Item to delete not found");
      return;
    }

    setPackedItems((prev) => prev.filter((i) => i.id !== selectedPlacedId));
    setItems((prev) =>
      prev.map((i) =>
        i.id === removed.itemId ? { ...i, amount: i.amount + 1 } : i
      )
    );
    setSelectedPlacedId(null);
  };

  const reset = () => {
    setPackedItems([]);
    setItems(initialItems);
    setSelectedItemId(null);
    setSelectedPlacedId(null);
  };

  return (
    <div className="main-packer-container">
      <h3 className="packer-title">Napolni nahrbtnik s predmeti</h3>
      <p className="packer-instructions">
        Klikni na predmet nato na mesto v nahrbtniku. Kjer klikneš bo postavljen
        zgornji kot predmeta.
      </p>
      <p className="packer-instructions">
        Če se ne postavi ni zanj dovolj prostora
      </p>
      {!overlappError && <p className="error-place"></p>}
      {overlappError && (
        <p className="error-message error-place">
          Predmet se prekriva z drugim predmetom, ali pa presega meje nahrbtnika
        </p>
      )}
      <div className="packer-container">
        <Grid
          rows={GRID_HEIGHT}
          columns={GRID_WIDTH}
          cellSize={CELL_SIZE}
          packedItems={packedItems}
          onItemDrop={handleItemDrop}
          onItemClick={handleGridClick}
          selectedId={selectedPlacedId}
          onItemDragStart={setSelectedPlacedId}
          onItemDropPosition={handleMove}
        />
        <ItemList
          items={items}
          cellSize={CELL_SIZE}
          onItemSelect={handleItemSelect}
          selectedItemId={selectedItemId}
        />
      </div>
      <div className="packer-controls">
        <button className="packer-reset" onClick={reset}>
          Ponastavi
        </button>
        <button
          className="packer-delete"
          onClick={handleDelete}
          disabled={!selectedPlacedId}
        >
          Izbriši
        </button>
      </div>
    </div>
  );
}
