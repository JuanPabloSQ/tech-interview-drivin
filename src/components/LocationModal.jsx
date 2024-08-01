import { useEffect, useState } from 'react';
import { Box, Modal, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

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
  height: '70vh',
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
    height: 560,
  },
};

const LocationModal = ({ open, handleClose, lat, lng }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
          params: {
            lat,
            lon: lng,
            format: 'json'
          }
        });
        const addressData = response.data;
        const addressString = addressData.display_name;
        setAddress(addressString);
      } catch (error) {
        console.error('Error fetching address:', error);
        setAddress('Dirección no disponible');
      }
    };

    fetchAddress();
  }, [lat, lng]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Card sx={{ width: '100%', height: '100%' }}>
          <CardMedia>
            <MapContainer
              center={[lat, lng]}
              zoom={13}
              style={{ height: 300, borderRadius: '4px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[lat, lng]} />
            </MapContainer>
          </CardMedia>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Ubicación del Auto
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Dirección:</strong> {address}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Latitud:</strong> {lat}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Longitud:</strong> {lng}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleClose}>
              Volver
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export default LocationModal;

