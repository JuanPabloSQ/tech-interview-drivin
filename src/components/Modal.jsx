import React from 'react';
import { Box, Modal as MUIModal, Typography, Button, TextField, MenuItem, Slider } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Modal = ({ open, handleClose, filterOptions, filters, setFilters, applyFilters, resetFilters }) => {
  return (
    <MUIModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Filtrar Resultados
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            select
            label="Tipo de Auto"
            value={filters.type}
            onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Ninguna</MenuItem>
            {filterOptions.types.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Marca"
            value={filters.make}
            onChange={(e) => setFilters((prev) => ({ ...prev, make: e.target.value }))}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Ninguna</MenuItem>
            {filterOptions.makes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Modelo"
            value={filters.model}
            onChange={(e) => setFilters((prev) => ({ ...prev, model: e.target.value }))}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Ninguna</MenuItem>
            {filterOptions.models.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Año"
            value={filters.year}
            onChange={(e) => setFilters((prev) => ({ ...prev, year: e.target.value }))}
            fullWidth
            margin="normal"
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
            margin="normal"
          >
            <MenuItem value="">Ninguna</MenuItem>
            {filterOptions.transmissions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
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
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={resetFilters} sx={{ mr: 1 }}>
              Reiniciar
            </Button>
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={applyFilters}>
              Aplicar 
            </Button>
          </Box>
        </Box>
      </Box>
    </MUIModal>
  );
};

export default Modal;
