import { Box, Modal as MUIModal, Typography, Button, TextField, MenuItem, Slider } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  '@media (min-width: 600px)': {
    width: '80%',
  },
  '@media (min-width: 960px)': {
    width: 400,
  },
};

const Modal = ({ open, handleClose, filterOptions, filters, setFilters, applyFilters, resetFilters }) => {
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

  return (
    <MUIModal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Filtrar Resultados
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            select
            label="Tipo de Auto"
            value={filters.type}
            onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
            fullWidth
            margin="dense"
          >
            <MenuItem value="">Ninguna</MenuItem>
            {filterOptions.types.map((option) => (
              option && (
                <MenuItem key={option} value={option}>
                  {typeTranslations[option] || option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              )
            ))}
          </TextField>
          <TextField
            select
            label="Marca"
            value={filters.make}
            onChange={(e) => setFilters((prev) => ({ ...prev, make: e.target.value, model: '' }))}
            fullWidth
            margin="dense"
          >
            <MenuItem value="">Ninguna</MenuItem>
            {filterOptions.makes.map((option) => (
              option && (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              )
            ))}
          </TextField>
          <TextField
            select
            label="Modelo"
            value={filters.model}
            onChange={(e) => setFilters((prev) => ({ ...prev, model: e.target.value }))}
            fullWidth
            margin="dense"
          >
            <MenuItem value="">Ninguna</MenuItem>
            {filterOptions.models.map((option) => (
              option && (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              )
            ))}
          </TextField>
          <TextField
            select
            label="Año"
            value={filters.year}
            onChange={(e) => setFilters((prev) => ({ ...prev, year: e.target.value }))}
            fullWidth
            margin="dense"
          >
            <MenuItem value="">Ninguna</MenuItem>
            {filterOptions.years.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Tipo de Transmisión"
            value={filters.transmission}
            onChange={(e) => setFilters((prev) => ({ ...prev, transmission: e.target.value }))}
            fullWidth
            margin="dense"
          >
            <MenuItem value="">Ninguna</MenuItem>
            <MenuItem value="m">Mecánico</MenuItem>
            <MenuItem value="a">Automático</MenuItem>
          </TextField>
          <Typography id="city-mpg-slider" gutterBottom>
            Consumo en Ciudad (mpg)
          </Typography>
          <Slider
            value={filters.city_mpg}
            onChange={(e, newValue) => setFilters((prev) => ({ ...prev, city_mpg: newValue }))}
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
            onChange={(e, newValue) => setFilters((prev) => ({ ...prev, highway_mpg: newValue }))}
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
            onChange={(e, newValue) => setFilters((prev) => ({ ...prev, combination_mpg: newValue }))}
            valueLabelDisplay="auto"
            min={0}
            max={50}
            step={1}
            marks={[
              { value: 0, label: '0' },
              { value: 50, label: '50' },
            ]}
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={resetFilters} sx={{ mr: 1 }}>
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
    </MUIModal>
  );
};

export default Modal;
