import { Box, Modal as MUIModal, Typography, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '80vh',
  maxWidth: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width: 600px)': {
    width: '80%',
  },
  '@media (min-width: 960px)': {
    width: 800,
    height: 600,
  },
};

const LocationModal = ({ open, handleClose, lat, lng }) => {
  return (
    <MUIModal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Ubicación del Auto
        </Typography>
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          style={{ flexGrow: 1, borderRadius: '4px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[lat, lng]} />
        </MapContainer>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" onClick={handleClose}>
            Volver
          </Button>
        </Box>
      </Box>
    </MUIModal>
  );
};

export default LocationModal;

