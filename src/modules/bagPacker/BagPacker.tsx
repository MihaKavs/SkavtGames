import { useState } from "react";
import BackpackCanvas from "./BackpackCanvas";
import DraggableItem from "./DraggableItem";

const ITEMS = [
  { id: "sleeping_bag", label: "Sleeping Bag", weight: 3 },
  { id: "clothes", label: "Clothes", weight: 2 },
  { id: "toothbrush", label: "Toothbrush", weight: 0.5 },
  { id: "snacks", label: "Snacks", weight: 1 },
  // Add more...
];

export default function BagPacker() {
  const [packedItems, setPackedItems] = useState<string[]>([]);

  const handleDrop = (itemId: string) => {
    if (!packedItems.includes(itemId)) {
      setPackedItems((prev) => [...prev, itemId]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="flex flex-col gap-2 w-1/3">
        <h2 className="text-xl font-bold">Available Items</h2>
        {ITEMS.map((item) => (
          <DraggableItem key={item.id} item={item} />
        ))}
      </div>

      <div className="w-2/3">
        <BackpackCanvas onDrop={handleDrop} packedItemIds={packedItems} />
      </div>
    </div>
  );
}
