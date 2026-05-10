import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Text, Heading, Badge, VStack, HStack, Icon } from '@chakra-ui/react';
import { FiMapPin } from 'react-icons/fi';

// Fix Leaflet default markers in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map flyTo animation
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
};

const CityMap = ({ city, height = "400px" }) => {
  const mapRef = useRef();

  if (!city || !city.lat || !city.lng) {
    return (
      <Box
        height={height}
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.200"
        bg="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        <VStack spacing={4}>
          <Icon as={FiMapPin} boxSize={12} color="gray.400" />
          <Text color="gray.500" fontSize="lg">Select a city to view on map</Text>
        </VStack>
      </Box>
    );
  }

  const position = [city.lat, city.lng];

  return (
    <Box
      height={height}
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      boxShadow="sm"
    >
      <MapContainer
        center={position}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapController center={position} zoom={10} />
        <Marker position={position}>
          <Popup>
            <VStack align="start" spacing={2}>
              <Heading size="md">{city.name}</Heading>
              <Text color="gray.600">{city.country}</Text>
              <Badge colorScheme="blue" variant="subtle">
                {city.cost}
              </Badge>
              <Text fontSize="sm">{city.details}</Text>
            </VStack>
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default CityMap;