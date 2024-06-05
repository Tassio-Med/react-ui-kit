import { useState } from "react";
import "./App.css";

interface Item {
  id: number;
  group: string;
  value: string;
}

interface DragData {
  id?: number;
  initialGroup?: string;
}

export default function App() {
  const groups: string[] = ["group1", "group2", "group3", "noDrop"];

  const initialItems: Item[] = [
    { id: 1, group: "group1", value: "drag 1" },
    { id: 2, group: "group1", value: "drag 2" },
    { id: 3, group: "group1", value: "drag 3" }
  ];
  
  const [items, setItems] = useState<Item[]>(initialItems);
  const [dragData, setDragData] = useState<DragData>({});
  const [noDrop, setNoDrop] = useState<string>("");

  const handleDragStart = (_e: React.DragEvent<HTMLDivElement>, id: number, group: string) => {
    setDragData({ id: id, initialGroup: group });
  };

  const handleDragEnter = (_e: React.DragEvent<HTMLDivElement>, group: string) => {
    if (group === "noDrop") {
      setNoDrop("noDrop");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (_e: React.DragEvent<HTMLDivElement>) => {
    setNoDrop("");
  };

  const changeCategory = (itemId: number, group: string) => {
    const newItems = [...items];
    newItems[itemId - 1].group = group;
    setItems([...newItems]);
  };

  const handleDrop = (_e: React.DragEvent<HTMLDivElement>, group: string) => {
    setNoDrop("");
    const selected = dragData.id;
    if (group === "noDrop") {
      console.log("nuh uh");
    } else if (selected !== undefined) {
      changeCategory(selected, group);
    }
  };

  return (
    <>
      <div className="groups">
        {groups.map((group) => (
          <div
            className={`${group === "noDrop"
              && noDrop === "noDrop" ? noDrop : "group"
            }`}
            onDragEnter={(e) => handleDragEnter(e, group)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, group)}
            key={group}
          >
            <h1 className="title">{group}</h1>
            <div>
              {items
                .filter((item) => item.group === group)
                .map((item) => (
                  <div
                    key={item.id}
                    id={item.id.toString()}
                    className={`${
                      group === "noDrop" && noDrop === "noDrop"
                        ? "notAllowed"
                        : "item"
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id, group)}
                  >
                    {item.value}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
