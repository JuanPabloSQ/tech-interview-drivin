import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box } from '@mui/material';

const columns = [
  { field: 'class', headerName: 'Tipo de Auto', width: 150 },
  { field: 'fuel_type', headerName: 'Tipo de Combustible', width: 150 },
  { field: 'make', headerName: 'Marca', width: 130 },
  { field: 'model', headerName: 'Modelo', width: 130 },
  { field: 'year', headerName: 'Año', width: 90, type: 'number' },
  { field: 'transmission', headerName: 'Tipo de Transmisión', width: 180 },
  { field: 'city_mpg', headerName: 'Consumo en Ciudad (mpg)', width: 180, type: 'number' },
  { field: 'highway_mpg', headerName: 'Consumo en Carretera (mpg)', width: 180, type: 'number' },
  { field: 'combination_mpg', headerName: 'Consumo Mixto (mpg)', width: 180, type: 'number' },
];

const fetchCarData = async (setRows) => {
  const apiUrl = `https://api.api-ninjas.com/v1/cars`;
  const apiKey = import.meta.env.VITE_SOME_KEY;
  
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Api-Key': apiKey,
      },
      params: {
        limit: 50,
        fuel_type: 'gas',
      },
    });
    setRows(response.data.map((item, index) => ({ ...item, id: index })));
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
  }
};

const Table = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchCarData(setRows);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton aria-label="filter">
          <FilterListIcon />
        </IconButton>
      </Box>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[20]}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}

export default Table;
