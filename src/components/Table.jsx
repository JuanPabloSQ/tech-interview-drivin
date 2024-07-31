import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box } from '@mui/material';
import Modal from './Modal'; 

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

const fetchCarData = async (setRows, setOriginalRows, setFilterOptions) => {
  const apiUrl = `https://api.api-ninjas.com/v1/cars`;
  const apiKey = import.meta.env.VITE_API_KEY;
  
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
    const data = response.data.map((item, index) => ({ ...item, id: index }));

    const types = [...new Set(data.map(item => item.class))];
    const makes = [...new Set(data.map(item => item.make))];
    const models = [...new Set(data.map(item => item.model))];
    const years = [...new Set(data.map(item => item.year))];
    const transmissions = [...new Set(data.map(item => item.transmission))];

    setFilterOptions({ types, makes, models, years, transmissions });
    setRows(data);
    setOriginalRows(data);
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
  }
};

const Table = () => {
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({ type: '', make: '', model: '', year: '', transmission: '', city_mpg: [0, 50], highway_mpg: [0, 50], combination_mpg: [0, 50] });
  const [filterOptions, setFilterOptions] = useState({ types: [], makes: [], models: [], years: [], transmissions: [] });

  useEffect(() => {
    fetchCarData(setRows, setOriginalRows, setFilterOptions);
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const applyFilters = () => {
    const filteredRows = originalRows.filter(row =>
      (!filters.type || row.class === filters.type) &&
      (!filters.make || row.make === filters.make) &&
      (!filters.model || row.model === filters.model) &&
      (!filters.year || row.year === filters.year) &&
      (!filters.transmission || row.transmission === filters.transmission) &&
      (row.city_mpg >= filters.city_mpg[0] && row.city_mpg <= filters.city_mpg[1]) &&
      (row.highway_mpg >= filters.highway_mpg[0] && row.highway_mpg <= filters.highway_mpg[1]) &&
      (row.combination_mpg >= filters.combination_mpg[0] && row.combination_mpg <= filters.combination_mpg[1])
    );
    setRows(filteredRows);
    handleCloseModal();
  };

  const resetFilters = () => {
    setFilters({ type: '', make: '', model: '', year: '', transmission: '', city_mpg: [0, 50], highway_mpg: [0, 50], combination_mpg: [0, 50] });
    setRows(originalRows);
  };

  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton aria-label="filter" onClick={handleOpenModal}>
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
      <Modal
        open={modalOpen}
        handleClose={handleCloseModal}
        filterOptions={filterOptions}
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
    </div>
  );
};

export default Table;
