import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Feature, FeatureCollection, GeoJsonObject, Geometry } from 'geojson';
import type { Layer, Popup, PopupEvent, LeafletMouseEvent } from 'leaflet';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [hikingTracks, setHikingTracks] = useState<FeatureCollection<Geometry>[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [res1, res2] = await Promise.all([
          fetch("http://localhost:3000/api/tracks"),
          fetch("http://localhost:3000/api/town-distances"),
        ]);
        if (!res1.ok || !res2.ok) throw new Error('API error');

        const [data1, data2] = await Promise.all([
          res1.json(),
          res2.json(),
        ]);
        setHikingTracks(data1);
        console.log(data2)
      } catch (err) {
        //setError(err.message);
        console.log(err.message)
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
    const name = feature.properties?.name ?? 'Unnamed Track';
    const description = feature.properties?.description ?? 'No description';

    layer.bindPopup(`<strong>${name}</strong><br>${description}`);

    layer.on('click', (e: LeafletMouseEvent) => {
      console.log(`Clicked on ${name}`);
    });
  };

  if (loading) return <div>Loading...</div>;
  return (
    <MapContainer
      center={[42.37717, -71.91915]}
      zoom={8}
      scrollWheelZoom={false}
      style={{ height: "600px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hikingTracks && <GeoJSON data={hikingTracks} onEachFeature={onEachFeature} />}
    </MapContainer>
  );
}
