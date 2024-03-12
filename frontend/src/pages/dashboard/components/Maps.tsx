import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { Environment } from '../../../shared/environment';
import { useEffect, useState } from 'react';
import { ClientsService } from '../../../shared/services/api/clients/ClientsService';
import { useDebounce } from '../../../shared/hooks';
const latFromStorage = localStorage.getItem('lat');
const longFromStorage = localStorage.getItem('long');
let originDestination: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

if (latFromStorage !== null && longFromStorage !== null) {
  originDestination = {
    lat:
      parseFloat(latFromStorage) >= 0
        ? parseFloat(latFromStorage)
        : -23.51557439322296,
    lng:
      parseFloat(latFromStorage) > 0
        ? parseFloat(longFromStorage)
        : -46.72030918302983,
  };
}

export const MapsDashboard: React.FC = () => {
  // const position = { lat: -23.512056, lng: -46.70957 };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <APIProvider apiKey={Environment.API_KEY}>
        <Map
          defaultCenter={originDestination}
          defaultZoom={9}
          mapId={Environment.ID_MAP}
          fullscreenControl={false}
        >
          <Directions />
        </Map>
      </APIProvider>
    </div>
  );
};

function Directions() {
  const { debounce } = useDebounce();
  //const [rows, setRows] = useState<IListClient[]>([]);
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    debounce(() => {
      ClientsService.getAll().then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          const locations = result.data;

          const LatLng: google.maps.LatLngLiteral[] = locations.map(
            (location) => ({
              lat: parseFloat(location.latitude),
              lng: parseFloat(location.longitude),
            })
          );

          const waypoints: google.maps.DirectionsWaypoint[] = LatLng.map(
            (location) => ({
              location: location,
            })
          );

          const arrayWayPoints: google.maps.DirectionsWaypoint[] = [
            ...waypoints,
          ];

          if (!originDestination) return;
          directionsService
            .route({
              origin: originDestination,
              waypoints: arrayWayPoints,
              destination: originDestination,
              travelMode: google.maps.TravelMode.DRIVING,
              provideRouteAlternatives: true,
              optimizeWaypoints: true,
            })
            .then((response) => {
              directionsRenderer.setDirections(response);
              setRoutes(response.routes);
            });
        }
      });
    });
  }, [directionsService, directionsRenderer]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  console.log('vbbb', leg);

  return (
    <div
      style={{
        boxShadow: '0 0 4px rgba(0,0,0,.15)',
        backgroundColor: 'black',
        color: 'white',
        cursor: 'auto',
        fontSize: '14px',
        lineHeight: '18px',
        outline: '0',
        padding: '12px 24px',
        position: 'absolute',
        right: '0',
        top: '0',
        width: '284px',
      }}
    >
      <div>
        {routes.map((route, routeIndex) => (
          <div key={routeIndex}>
            <h2
              style={{
                fontWeight: 'bold',
              }}
            >
              {route.summary}
            </h2>
            {route.legs.map((leg, legIndex) => (
              <div key={legIndex}>
                <p
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {leg.start_address.split(',')[0]} para{' '}
                  {leg.end_address.split(',')[0]}
                </p>
                <p>Distância: {leg.distance?.text}</p>
                <p>Duração: {leg.duration?.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
