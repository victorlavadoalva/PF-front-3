import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

export default function MapDetail({restaurant}){
    const [coordenadas, setCoordenadas] = useState({lat:null,lng:null});

    useEffect(() => {
        async function buscarDireccion() {
          try {
            const address = `${restaurant.address},${restaurant.city}, ${restaurant.country}`;
    
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyAR96I2GcOFCVlWMer5l_WtCRrSnAJK8DM`
            );
    
            if (response.ok) {
              const data = await response.json();
    
              if (data.status === 'OK') {
                const { lat, lng } = data.results[0].geometry.location;
                console.log('Dirección encontrada:', { lat, lng });
                setCoordenadas({lat:lat,lng:lng})
              } else {
                console.error('Error al buscar dirección:', data.status);
              }
            } else {
              console.error('Error al buscar dirección:', response.status);
            }
          } catch (error) {
            console.error('Error al buscar dirección:', error);
          }
        }
    
        buscarDireccion();
      }, [restaurant]);

      const containerStyle = {
        width: '80%',
        height: '20rem'
      };
    
    let center = coordenadas;
    let zoom = 11

    return(
        <LoadScript googleMapsApiKey="AIzaSyAR96I2GcOFCVlWMer5l_WtCRrSnAJK8DM">
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            >
                <Marker
                    position={center}
                />
            </GoogleMap>
        </LoadScript>
    )
}

