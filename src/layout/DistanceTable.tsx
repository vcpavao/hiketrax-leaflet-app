import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface DistanceRow {
  name: string;
  total_distance_meters: number;
}

interface DistanceTableProps {
  rows: DistanceRow[];
}

export default function DistanceTable({ rows }: DistanceTableProps) {
    
    const rowsWithIds = rows.map((row, index) => ({
        id: index + 1, // required by DataGrid
        name: row.name,
        total_distance_meters: row.total_distance_meters/1000,
      }));
    
  const columns: GridColDef[] = [
    { field: "id", headerName: "Rank", flex: 1, width: 30 },
    { field: "name", headerName: "Town", flex: 1 },
    {
      field: "total_distance_meters",
      headerName: "Total (km)",
      type: "number",
      flex: 1,
      //@ts-ignore
      //valueFormatter: (params) => `${params.value.toFixed(1)} km`,
    },
  ];

  console.log(rowsWithIds);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowsWithIds}
        columns={columns}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
