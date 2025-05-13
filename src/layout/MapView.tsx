import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { FeatureCollection } from "geojson";
import DistanceTable from "./DistanceTable";

interface Props {
  geoJsonData: FeatureCollection;
  townDistances: FeatureCollection;
  onEachFeature: (feature: Feature<Geometry, { [name: string]: any; }>, layer: Layer) => void;
}

export default function MapView({ geoJsonData, townDistances, onEachFeature }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 450,
          bgcolor: "background.paper",
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          orientation="horizontal"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Town Info" />
        </Tabs>

        <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
          {tabIndex === 0 && (
            <Typography variant="body1">
              <DistanceTable rows={townDistances} />
            </Typography>
          )}
          {tabIndex === 1 && (
            <Typography variant="body1">
              This is where your data table or controls would go.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Map */}
      <Box sx={{ flexGrow: 1 }}>
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
          {geoJsonData && (
            <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} />
          )}
        </MapContainer>
      </Box>
    </Box>
  );
}
