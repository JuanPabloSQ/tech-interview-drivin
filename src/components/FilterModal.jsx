import { useState } from 'react';
import { Box, Modal, Typography, Button, TextField, Slider, MenuItem, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  '@media (min-width: 801px)': {
    width: '80%',
  },
  '@media (min-width: 1281px)': {
    maxWidth: 600,
  },
};

const typeTranslations = {
  'biplaza': 'two seater',
  'subcompacto': 'subcompact car',
  'furgoneta': 'van',
  'compacto': 'compact car',
  'mediano': 'midsize car',
  'grande': 'large car',
  'camioneta estándar': 'standard pickup truck',
  'vehículo de propósito especial': 'special purpose vehicle',
  'station wagon mediano': 'midsize station wagon',
  'vehículo utilitario deportivo': 'sport utility vehicle',
  'minivan': 'minivan',
  'camioneta pequeña': 'small pickup truck',
  'minicompacto': 'minicompact car',
  'station wagon pequeño': 'small station wagon',
  'vehículo utilitario deportivo pequeño': 'small sport utility vehicle',
};

const translateType = (type) => {
  return typeTranslations[type.toLowerCase()] || type.toLowerCase();
};

const FilterModal = ({ open, handleClose, filters, setFilters, applyFilters, resetFilters }) => {
  const [inputType, setInputType] = useState(filters.type);
  const [inputMake, setInputMake] = useState(filters.make);
  const [inputModel, setInputModel] = useState(filters.model);
  const [inputYear, setInputYear] = useState(filters.year);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const handleTypeChange = (e) => {
    const inputValue = e.target.value;
    setInputType(inputValue);
    setFilters((prev) => ({ ...prev, type: translateType(inputValue) }));
  };

  const handleMakeChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setInputMake(inputValue);
    setFilters((prev) => ({ ...prev, make: inputValue, model: '' }));
  };

  const handleModelChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setInputModel(inputValue);
    setFilters((prev) => ({ ...prev, model: inputValue }));
  };

  const handleYearChange = (e) => {
    const inputValue = e.target.value;
    setInputYear(inputValue);
    setFilters((prev) => ({ ...prev, year: inputValue }));
  };

  const handleCityMpgChange = (e, newValue) => {
    setFilters((prev) => ({ ...prev, city_mpg: newValue }));
  };

  const handleHighwayMpgChange = (e, newValue) => {
    setFilters((prev) => ({ ...prev, highway_mpg: newValue }));
  };

  const handleCombinationMpgChange = (e, newValue) => {
    setFilters((prev) => ({ ...prev, combination_mpg: newValue }));
  };

  const handleResetFilters = () => {
    setInputType('');
    setInputMake('');
    setInputModel('');
    setInputYear('');
    resetFilters();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Filtrar Resultados
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}  pr={2}>
              <TextField
                label="Tipo de Auto"
                value={inputType}
                onChange={handleTypeChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Marca"
                value={inputMake}
                onChange={handleMakeChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Modelo"
                value={inputModel}
                onChange={handleModelChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Año"
                value={inputYear}
                onChange={handleYearChange}
                fullWidth
                margin="dense"
              />
              <TextField
                select
                label="Tipo de Transmisión"
                value={filters.transmission}
                onChange={(e) => setFilters((prev) => ({ ...prev, transmission: e.target.value }))}
                fullWidth
                margin="dense"
              >
                <MenuItem value="">Ambos</MenuItem>
                <MenuItem value="m">Mecánico</MenuItem>
                <MenuItem value="a">Automático</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography id="city-mpg-slider" gutterBottom>
                Consumo en Ciudad (mpg)
              </Typography>
              <Slider
                value={filters.city_mpg}
                onChange={handleCityMpgChange}
                valueLabelDisplay="auto"
                min={0}
                max={50}
                step={1}
                marks={[
                  { value: 0, label: '0' },
                  { value: 50, label: '50' },
                ]}
              />
              <Typography id="highway-mpg-slider" gutterBottom>
                Consumo en Carretera (mpg)
              </Typography>
              <Slider
                value={filters.highway_mpg}
                onChange={handleHighwayMpgChange}
                valueLabelDisplay="auto"
                min={0}
                max={50}
                step={1}
                marks={[
                  { value: 0, label: '0' },
                  { value: 50, label: '50' },
                ]}
              />
              <Typography id="combination-mpg-slider" gutterBottom>
                Consumo Mixto (mpg)
              </Typography>
              <Slider
                value={filters.combination_mpg}
                onChange={handleCombinationMpgChange}
                valueLabelDisplay="auto"
                min={0}
                max={50}
                step={1}
                marks={[
                  { value: 0, label: '0' },
                  { value: 50, label: '50' },
                ]}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={handleResetFilters} sx={{ mr: 1 }}>
              Reiniciar
            </Button>
            <Box>
              <Button onClick={handleClose} sx={{ mr: 1 }}>
                Cancelar
              </Button>
              <Button variant="contained" onClick={applyFilters}>
                Aplicar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterModal;
