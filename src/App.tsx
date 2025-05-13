import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import type {
  Feature,
  FeatureCollection,
  Geometry,
} from "geojson";
import type { Layer, Popup, PopupEvent, LeafletMouseEvent } from "leaflet";
import MapView from "./layout/MapView";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [hikingTracks, setHikingTracks] = useState<
    FeatureCollection<Geometry>[]
  >([]);
  const [townDistances, setTownDistances] = useState<
    FeatureCollection<Geometry>[]
  >([]);

  const serverEndpoint = "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [res1, res2 /* res3 */] = await Promise.all([
          fetch(`${serverEndpoint}/api/tracks`),
          fetch(`${serverEndpoint}/api/town-distances`),
          //fetch(`${serverEndpoint}/api/county-distances`)
        ]);
        if (!res1.ok || !res2.ok /* || !res3.ok */)
          throw new Error("API error");

        const [data1, data2 /*, data3*/] = await Promise.all([
          res1.json(),
          res2.json(),
          //res3.json()
        ]);
        setHikingTracks(data1);
        setTownDistances(data2);
        //console.log(data3)
      } catch (err) {
        //setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onEachFeature = (
    feature: Feature<Geometry, { [name: string]: any }>,
    layer: Layer
  ) => {
    const name = feature.properties?.name ?? "Unnamed Track";
    const description = feature.properties?.description ?? "No description";

    layer.bindPopup(`<strong>${name}</strong><br>${description}`);

    layer.on("click", (e: LeafletMouseEvent) => {
      console.log(`Clicked on ${name}`);
    });
  };

  if (loading) return <div>Loading...</div>;
  return <MapView geoJsonData={hikingTracks} townDistances={townDistances} onEachFeature={onEachFeature} />;
}
