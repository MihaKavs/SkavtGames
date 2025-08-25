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
    lat: 46.2233779842592,
    lng: 13.607934959424963,
    when: "9.10.2022",
    who: "Steg Bovec 1",
    what: "Začetek skavtskega leta",
    photoUrl: "/images/iv/zcetk_2022.jpg",
  },
  {
    id: "2",
    lat: 45.957055163102616,
    lng: 14.09263856308063,
    when: "11.3.2023",
    who: "IV",
    what: "Zimovanje v Godoviču",
    photoUrl: "/images/iv/zimovanje_2023.jpg",
  },
  {
    id: "6",
    lat: 46.31080853539791,
    lng: 13.466908360523826,
    when: "4-5.5.2024",
    who: "IV",
    what: "Pomladovanje na Žagi",
    photoUrl: "/images/iv/pomladovanje_2024.jpg",
  },
  {
    id: "3",
    lat: 45.86051449045939,
    lng: 15.272936183757423,
    when: "6.7-17.7.2024",
    who: "IV",
    what: "Poletni tabor v Pristavici",
    photoUrl: "/images/iv/tabor_2024.jpg",
  },
  {
    id: "4",
    lat: 46.38441682867388,
    lng: 13.567638699521837,
    when: "16-17.11.2024",
    who: "IV",
    what: "Zimovanje v Možnici",
    photoUrl: "/images/iv/jesenovanje_2024.jpg",
  },
  {
    id: "5",
    lat: 46.20594465862206,
    lng: 13.656840487497032,
    when: "10-11.5.2025",
    who: "IV",
    what: "Pomladovanje na Kamnem",
    photoUrl: "/images/iv/pomladovanje_2025.jpg",
  },
  {
    id: "7",
    lat: 46.15927514687887,
    lng: 14.359310519572201,
    when: "19-27.7.2025",
    who: "IV",
    what: "Poletni tabor v Retečah z Idrijo",
    photoUrl: "/images/iv/tabor2025.jpg",
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
            <div>Udeleženci: ${place.who}</div>
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
