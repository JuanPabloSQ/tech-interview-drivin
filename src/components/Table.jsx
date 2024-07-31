import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

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
        limit: 20, 
        fuel_type: 'gas', 
      },
    });
    setRows(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
  }
};

const Table = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchCarData(setRows);
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id || `${row.make}-${row.model}-${row.year}`}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[20]}
        checkboxSelection
      />
    </div>
  );
}

export default Table;
