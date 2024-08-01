import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import TablePagination from '@mui/material/TablePagination';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';
import FilterModal from './FilterModal';
import LocationModal from './LocationModal';
import { useSnackbar } from '../context/SnackbarContext';

const mpgToKml = (mpg) => (mpg * 0.425144).toFixed(2);

const typeTranslations = {
  'two seater': 'Biplaza',
  'subcompact car': 'Subcompacto',
  'van': 'Furgoneta',
  'compact car': 'Compacto',
  'midsize car': 'Mediano',
  'large car': 'Grande',
  'standard pickup truck': 'Camioneta estándar',
  'special purpose vehicle': 'Vehículo de propósito especial',
  'midsize station wagon': 'Station wagon mediano',
  'sport utility vehicle': 'Vehículo utilitario deportivo',
  'minivan': 'Minivan',
  'small pickup truck': 'Camioneta pequeña',
  'minicompact car': 'Minicompacto',
  'small station wagon': 'Station wagon pequeño',
  'small sport utility vehicle': 'Vehículo utilitario deportivo pequeño',
};

const fuelTypeTranslations = {
  'gas': 'Gasolina',
  'diesel': 'Diesel',
  'electricity': 'Electricidad',
};

const inicialFilters = { 
  type: '',
  make: '',
  model: '',
  year: '',
  transmission: '',
  fuel_type: '',
  city_mpg: [0, 50],
  highway_mpg: [0, 50],
  combination_mpg: [0, 50]
};

const rowsPerPage = 20;

const apiUrl = import.meta.env.VITE_CARS_API_URL;
const apiKey = import.meta.env.VITE_CARS_API_KEY;

const Table = () => {
  const [originalRows, setOriginalRows] = useState([]);
  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ lat: 0, lng: 0 });
  const [filters, setFilters] = useState(inicialFilters);
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortModel, setSortModel] = useState([]);
  const [tempFilters, setTempFilters] = useState(filters);
  const [loading, setLoading] = useState(false);
  const { errorSnackbar } = useSnackbar();

  const columns = [
    {
      field: 'class',
      headerName: 'Tipo de Auto',
      width: 150,
      renderCell: (params) => (
        <span>{typeTranslations[params.value] || params.value}</span>
      ),
      disableColumnMenu: true,
    },
    {
      field: 'fuel_type',
      headerName: 'Tipo de Combustible',
      width: 150,
      renderCell: (params) => (
        <span>{fuelTypeTranslations[params.value] || params.value}</span>
      ),
      disableColumnMenu: true,
    },
    {
      field: 'make',
      headerName: 'Marca',
      width: 130,
      renderCell: (params) => (
        <span>{params.value.charAt(0).toUpperCase() + params.value.slice(1)}</span>
      ),
      disableColumnMenu: true,
    },
    {
      field: 'model',
      headerName: 'Modelo',
      width: 130,
      renderCell: (params) => (
        <span>{params.value.charAt(0).toUpperCase() + params.value.slice(1)}</span>
      ),
      disableColumnMenu: true,
    },
    { field: 'year', headerName: 'Año', width: 90, type: 'number', disableColumnMenu: true },
    {
      field: 'transmission',
      headerName: 'Transmisión',
      width: 180,
      renderCell: (params) => {
        return params.value === 'm' ? 'Mecánico' : params.value === 'a' ? 'Automático' : params.value;
      },
      disableColumnMenu: true,
    },
    {
      field: 'city_mpg',
      headerName: 'Consumo en Ciudad',
      width: 180,
      type: 'number',
      renderCell: (params) => (
        <span>{params.value} mpg ({mpgToKml(params.value)} km/l)</span>
      ),
      disableColumnMenu: true,
    },
    {
      field: 'highway_mpg',
      headerName: 'Consumo en Carretera',
      width: 180,
      type: 'number',
      renderCell: (params) => (
        <span>{params.value} mpg ({mpgToKml(params.value)} km/l)</span>
      ),
      disableColumnMenu: true,
    },
    {
      field: 'combination_mpg',
      headerName: 'Consumo Mixto',
      width: 180,
      type: 'number',
      renderCell: (params) => (
        <span>{params.value} mpg ({mpgToKml(params.value)} km/l)</span>
      ),
      disableColumnMenu: true,
    },
  ];

  const fetchCarData = async () => {
    setLoading(true);
    
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'X-Api-Key': apiKey,
        },
        params: {
          limit: 50,
          transmission: filters.transmission,
          make: filters.make,
          model: filters.model,
          year: filters.year,
          min_city_mpg: filters.city_mpg[0],
          max_city_mpg: filters.city_mpg[1],
          min_hwy_mpg: filters.highway_mpg[0],
          max_hwy_mpg: filters.highway_mpg[1],
          min_comb_mpg: filters.combination_mpg[0],
          max_comb_mpg: filters.combination_mpg[1],
        },
      });
      const data = response.data.map((item, index) => ({
        ...item,
        id: index,
        lat: Math.random() * (50 - (-50)) + (-50), 
        lng: Math.random() * (50 - (-50)) + (-50), 
      }));

      setOriginalRows(data);
      setLoading(false);
    } catch (error) {
      errorSnackbar('Error con la conexion')
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const applyTypeFilter = (data, type) => {
    if (!type) return data;
    return data.filter(row => row.class === type);
  };

  useEffect(() => {
    fetchCarData(filters);
  }, [filters]);

  const handleOpenModal = () => {
    setTempFilters(filters);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenLocationModal = (row) => {
    setSelectedLocation({ lat: row.lat, lng: row.lng });
    setLocationModalOpen(true);
  };

  const handleCloseLocationModal = () => {
    setLocationModalOpen(false);
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    handleCloseModal();
  };

  const resetFilters = () => {
    setTempFilters(inicialFilters);
    setFilters(inicialFilters);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row.id);
    handleOpenLocationModal(params.row);
  };

  const handleOutsideClick = () => {
    setSelectedRow(null);
  };

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

  const visibleRows = useMemo(
    () => {
      const filterRows = applyTypeFilter(originalRows, filters.type)
      const { field, sort } = sortModel[0] ?? {};
      return [...filterRows].sort((a, b) => {
        if (a[field] < b[field]) {
          return sort === 'asc' ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return sort === 'asc' ? 1 : -1;
        }
        return 0;
      })
      .slice(
        page * rowsPerPage,
        (page * rowsPerPage) + rowsPerPage,
      )
    },
    [originalRows, sortModel, page],
  );

  const totalPages = Math.ceil(originalRows.length / rowsPerPage);
  const validPage = Math.max(0, Math.min(page, totalPages - 1));

  return (
    <div style={{ width: '100%' }} onClick={handleOutsideClick}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mx={2}>
        <Typography variant="h4" component="h2" gutterBottom>
          Tabla de autos
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton 
            aria-label="filter" 
            onClick={handleOpenModal}
            sx={{ fontSize: 32, marginRight: 2 }}
          >
            <FilterListIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ height: 400, width: 'calc(100% - 32px)', margin: '0 16px 16px 16px' }}>
        <Paper onClick={(e) => e.stopPropagation()}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="4px">
              <LinearProgress style={{ width: '100%' }} />
            </Box>
          ) : (
            <>
              <DataGrid
                autoHeight
                rows={visibleRows}
                columns={columns}
                getRowId={(row) => row.id}
                hideFooter
                onRowClick={handleRowClick}
                disableColumnFilter
                sortingMode="server"
                sortModel={sortModel}
                onSortModelChange={handleSortModelChange}
                sx={{
                  '& .MuiDataGrid-row:hover': {
                    cursor: 'pointer',
                  },
                  '& .Mui-selected': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08) !important',
                  },
                  "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                    outline: "none !important",
                },
                }}
                isRowSelectable={(params) => selectedRow === params.id}
              />
              <TablePagination
                component='div'
                count={originalRows.length}
                rowsPerPage={rowsPerPage}
                page={validPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]} 
                showFirstButton={false} 
                showLastButton={false} 
                labelRowsPerPage='' 
              />
            </>
          )}
        </Paper>
      </Box>
      <FilterModal
        open={modalOpen}
        handleClose={handleCloseModal}
        filters={tempFilters}
        setFilters={setTempFilters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
      <LocationModal
        open={locationModalOpen}
        handleClose={handleCloseLocationModal}
        lat={selectedLocation.lat}
        lng={selectedLocation.lng}
      />
    </div>
  );
};

export default Table;
