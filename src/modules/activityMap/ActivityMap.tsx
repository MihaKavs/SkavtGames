// src/components/activityMap/ActivityMap.tsx
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./ActivityMap.css";
interface Place {
  id: string;
  lat: number;
  lng: number;
  when: string;
  who: string;
  what: string;
  photoUrl?: string;
}

const mockData: Place[] = [
  {
    id: "1",
    lat: 46.0569,
    lng: 14.5058,
    when: "2024-11-05 14:30",
    who: "John & Ana",
    what: "Went hiking to Rožnik",
    photoUrl: "/images/Arhitektura.png",
  },
  {
    id: "2",
    lat: 46.05,
    lng: 14.46,
    when: "2024-11-12 11:00",
    who: "Team Alpha",
    what: "Brainstorming in Tivoli Park",
  },
];

function ActivityMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=WdmKesoALlxC0tx6LbdU", // Replace key
      center: [14.5058, 46.0569],
      zoom: 12,
    });

    // Add markers
    mockData.forEach((place) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = "#FF5733";
      el.style.cursor = "pointer";

      const marker = new maplibregl.Marker(el)
        .setLngLat([place.lng, place.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(`
            <strong className="title-of-activity">${place.what}</strong><br/>
            <em>${place.when}</em><br/>
            <div>By: ${place.who}</div>
            ${
              place.photoUrl
                ? `<img src="${place.photoUrl}" width="100%" />`
                : ""
            }
          `)
        )
        .addTo(mapRef.current!);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return <div ref={mapContainer} style={{ height: "100%", width: "100%" }} />;
}

export default ActivityMap;
