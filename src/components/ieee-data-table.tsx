import React from 'react';
import { DataGrid, type GridColDef, type GridPaginationModel } from '@mui/x-data-grid';
import { TextField, Box } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'sl', headerName: 'SL', width: 70 },
  { field: 'ieeeId', headerName: 'IEEE ID', width: 100 },
  { field: 'nsuId', headerName: 'NSU ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'ieeeMail', headerName: 'IEEE Mail', width: 220 },
  { field: 'nsuMail', headerName: 'NSU Mail', width: 220 },
  { field: 'bloodGroup', headerName: 'Blood Group', width: 120 },
];

const initialRows = [
  {
    id: 1,
    sl: 1,
    ieeeId: '123456',
    nsuId: '2019000001',
    name: 'Rafiq Rahman',
    ieeeMail: 'rafiq@ieee.org',
    nsuMail: 'rafiq@northsouth.edu',
    bloodGroup: 'A+',
  },
  {
    id: 2,
    sl: 2,
    ieeeId: '654321',
    nsuId: '2019000002',
    name: 'Sarah Khan',
    ieeeMail: 'sarah@ieee.org',
    nsuMail: 'sarah@northsouth.edu',
    bloodGroup: 'B+',
  },
  // Add more rows here...
];

export default function IEEEDataTable() {
  const [searchText, setSearchText] = React.useState('');
  const [rows, setRows] = React.useState(initialRows);
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filtered = initialRows.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(value)
      )
    );

    setRows(filtered);
  };

  return (
    <Box sx={{ height: 'auto', width: '100%', p: 2}}>
      <TextField
        label="Search"
        variant="outlined"
        size='small'
        margin="normal"
        value={searchText}
        onChange={handleSearch}
      />

      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        sx={{
            border: '2px solid #1976d2', // outer border
            borderRadius: '8px',
            '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#00629B', // header row background
            color: '#333', // header text color
            fontWeight: 'bold',
            borderBottom: '1px solid #ccc',
            },
            '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e0e0e0', // row border
            },
        }}
      />
    </Box>
  );
}
